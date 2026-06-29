from django.shortcuts import render

# Create your views here.
from django.utils import timezone
from django.core.files.base import ContentFile
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema

from .models import Requisition, RequisitionDocument, RequisitionAction
from .serializers import (
    RequisitionListSerializer,
    RequisitionDetailSerializer,
    RequisitionWriteSerializer,
    RequisitionDocumentSerializer,
    RequisitionActionWriteSerializer,
    RequisitionActionSerializer,
)


# ─────────────────────────────────────────────────────────────────────────────
#  Helpers
# ─────────────────────────────────────────────────────────────────────────────

# Maps each action string → the new Requisition.status it produces
ACTION_STATUS_MAP = {
    'approved_by_hod':  'pending_ed',
    'rejected_by_hod':  'rejected',
    'returned_by_hod':  'returned_to_staff',
    'approved_by_ed':   'approved',
    'rejected_by_ed':   'rejected',
    'returned_by_ed':   'returned_to_hod',
}

# Which roles may perform which actions
ACTION_ROLE_MAP = {
    'approved_by_hod': 'hod',
    'rejected_by_hod': 'hod',
    'returned_by_hod': 'hod',
    'approved_by_ed':  'ed',
    'rejected_by_ed':  'ed',
    'returned_by_ed':  'ed',
}

# Statuses in which a requisition is editable by staff
EDITABLE_STATUSES = {'draft', 'returned_to_staff'}


def _error(message, status_code=status.HTTP_400_BAD_REQUEST):
    return Response({'success': False, 'message': message}, status=status_code)


def _success(message, data=None, status_code=status.HTTP_200_OK):
    payload = {'success': True, 'message': message}
    if data is not None:
        payload['data'] = data
    return Response(payload, status=status_code)


def resolve_pk(pk):
    if isinstance(pk, str) and pk.startswith('REQ-'):
        try:
            return int(pk.split('-')[1])
        except (ValueError, IndexError):
            pass
    try:
        return int(pk)
    except ValueError:
        return pk


def send_requisition_notification(requisition, comment=""):
    from admin_panel.models import SystemSetting, User
    from django.core.mail import send_mail
    import logging
    logger = logging.getLogger(__name__)

    # 1. Check if email notifications are enabled
    try:
        enabled_setting = SystemSetting.objects.filter(key='emailAlerts').first()
        if enabled_setting and enabled_setting.value.lower() != 'true':
            print("Email alerts are disabled in system settings.")
            return
    except Exception as e:
        logger.error(f"Error checking email alerts setting: {e}")
        return

    # 2. Get templates
    try:
        subj_setting, _ = SystemSetting.objects.get_or_create(
            key='email_subject_template',
            defaults={'value': "Requisition #{requisition_id} Update: {status}"}
        )
        body_setting, _ = SystemSetting.objects.get_or_create(
            key='email_body_template',
            defaults={'value': "Dear {recipient_name},\n\nRequisition #{requisition_id} for '{programme_name}' has been updated to: {status}.\n\nComment: {comment}\n\nBest regards,\nAdministration"}
        )
        subj_tmpl = subj_setting.value
        body_tmpl = body_setting.value
    except Exception as e:
        logger.error(f"Error retrieving settings templates: {e}")
        subj_tmpl = "Requisition #{requisition_id} Update: {status}"
        body_tmpl = "Dear {recipient_name},\n\nRequisition #{requisition_id} for '{programme_name}' has been updated to: {status}.\n\nComment: {comment}\n\nBest regards,\nAdministration"

    # 3. Determine recipients based on current status
    recipients = []
    status_display = requisition.get_status_display()
    
    if requisition.status in ['pending_hod', 'returned_to_hod']:
        # Notify HOD(s) of this department
        if requisition.department:
            hods = User.objects.filter(role='hod', department=requisition.department, is_active=True)
            for hod in hods:
                recipients.append((hod.name, hod.email))
    elif requisition.status == 'pending_ed':
        # Notify ED(s)
        eds = User.objects.filter(role='ed', is_active=True)
        for ed in eds:
            recipients.append((ed.name, ed.email))
    else:
        # Notify the staff member who created it
        recipients.append((requisition.created_by.name, requisition.created_by.email))

    # 4. Format and send to each recipient
    for name, email in recipients:
        try:
            kwargs = {
                'requisition_id': f"REQ-{requisition.id}",
                'programme_name': str(requisition.programme_name),
                'status': str(status_display),
                'comment': str(comment),
                'recipient_name': str(name)
            }
            
            subject = subj_tmpl
            body = body_tmpl
            for k, v in kwargs.items():
                subject = subject.replace('{' + k + '}', v)
                body = body.replace('{' + k + '}', v)
            
            send_mail(
                subject=subject,
                message=body,
                from_email=None,
                recipient_list=[email],
                fail_silently=False
            )
            print(f"Sent email to {email} successfully.")
        except Exception as e:
            print(f"Failed to send email to {email}: {e}")
            logger.error(f"Failed to send email to {email}: {e}")


def send_requisition_notification_async(requisition, comment=""):
    import threading
    def thread_target(requisition_id, comment_str):
        try:
            req_obj = Requisition.objects.get(id=requisition_id)
            send_requisition_notification(req_obj, comment_str)
        except Exception as err:
            import logging
            logger = logging.getLogger(__name__)
            logger.error(f"Async email notification thread failed: {err}")

    thread = threading.Thread(target=thread_target, args=(requisition.id, comment))
    thread.daemon = True
    thread.start()


# ─────────────────────────────────────────────────────────────────────────────
#  Staff: list own requisitions / create new
# ─────────────────────────────────────────────────────────────────────────────

class RequisitionListCreateView(APIView):
    """
    GET  /requisitions/          → Staff sees their own; HOD/ED sees relevant ones.
    POST /requisitions/          → Staff creates a new requisition (saved as draft).
    """

    def get(self, request):
        user = request.user
        role = getattr(user, 'role', None)

        if role == 'staff':
            qs = Requisition.objects.filter(created_by=user)

        elif role == 'hod':
            # HOD sees department requisitions that are pending their review
            # or any status (so they can track history)
            qs = Requisition.objects.filter(
                requisition_type='department',
                department=user.department
            )

        elif role == 'ed':
            # ED sees all club requests (except draft) + department requests that have been HOD-approved
            from django.db.models import Q
            qs = Requisition.objects.filter(
                (Q(requisition_type='club') & ~Q(status='draft')) |
                Q(requisition_type='department', actions__action='approved_by_hod')
            ).distinct()

        elif role == 'admin':
            qs = Requisition.objects.all()

        else:
            return _error('Unauthorized.', status.HTTP_403_FORBIDDEN)

        # Optional query-param filters
        status_filter = request.query_params.get('status')
        if status_filter:
            qs = qs.filter(status=status_filter)

        req_type = request.query_params.get('type')
        if req_type:
            qs = qs.filter(requisition_type=req_type)

        qs = qs.order_by('-created_at')
        serializer = RequisitionListSerializer(qs, many=True)
        return Response({'success': True, 'data': serializer.data})

    @extend_schema(request=RequisitionWriteSerializer)
    def post(self, request):
        user = request.user

        if getattr(user, 'role', None) != 'staff':
            return _error('Only staff can create requisitions.', status.HTTP_403_FORBIDDEN)

        serializer = RequisitionWriteSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {'success': False, 'errors': serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )

        requisition = serializer.save(
            created_by=user,
            status='draft'
        )

        return _success(
            'Requisition created as draft.',
            {'id': f"REQ-{requisition.id}"},
            status.HTTP_201_CREATED
        )


# ─────────────────────────────────────────────────────────────────────────────
#  Staff: retrieve / update / delete a single requisition
# ─────────────────────────────────────────────────────────────────────────────

class RequisitionDetailView(APIView):
    """
    GET    /requisitions/<id>/   → Any authorized user sees full detail.
    PUT    /requisitions/<id>/   → Staff edits a draft or returned requisition.
    DELETE /requisitions/<id>/   → Staff deletes a draft requisition.
    """

    def _get_requisition(self, pk):
        try:
            return Requisition.objects.get(pk=resolve_pk(pk))
        except (Requisition.DoesNotExist, ValueError):
            return None

    def get(self, request, pk):
        requisition = self._get_requisition(pk)
        if not requisition:
            return _error('Requisition not found.', status.HTTP_404_NOT_FOUND)

        user = request.user
        role = getattr(user, 'role', None)
        if role == 'ed':
            is_club = (requisition.requisition_type == 'club' and requisition.status != 'draft')
            is_hod_approved_dept = (
                requisition.requisition_type == 'department' and 
                requisition.actions.filter(action='approved_by_hod').exists()
            )
            if not (is_club or is_hod_approved_dept):
                return _error('You do not have permission to view this requisition.', status.HTTP_403_FORBIDDEN)

        serializer = RequisitionDetailSerializer(requisition)
        return Response({'success': True, 'data': serializer.data})

    @extend_schema(request=RequisitionWriteSerializer)
    def put(self, request, pk):
        user = request.user
        requisition = self._get_requisition(pk)

        if not requisition:
            return _error('Requisition not found.', status.HTTP_404_NOT_FOUND)

        if requisition.created_by != user:
            return _error('You can only edit your own requisitions.', status.HTTP_403_FORBIDDEN)

        if requisition.status not in EDITABLE_STATUSES:
            return _error(
                f'Requisition cannot be edited in "{requisition.get_status_display()}" status.'
            )

        serializer = RequisitionWriteSerializer(
            requisition, data=request.data, partial=True
        )
        if not serializer.is_valid():
            return Response(
                {'success': False, 'errors': serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer.save()
        return _success('Requisition updated successfully.')

    def delete(self, request, pk):
        user = request.user
        requisition = self._get_requisition(pk)

        if not requisition:
            return _error('Requisition not found.', status.HTTP_404_NOT_FOUND)

        if requisition.created_by != user:
            return _error('You can only delete your own requisitions.', status.HTTP_403_FORBIDDEN)

        if requisition.status != 'draft':
            return _error('Only draft requisitions can be deleted.')

        requisition.delete()
        return _success('Requisition deleted successfully.')


# ─────────────────────────────────────────────────────────────────────────────
#  Staff: submit a draft requisition
# ─────────────────────────────────────────────────────────────────────────────

class RequisitionSubmitView(APIView):
    """
    POST /requisitions/<id>/submit/

    Moves a draft (or returned-to-staff) requisition into the approval queue.
    - Department requisitions go to pending_hod.
    - Club requisitions go directly to pending_ed.
    """

    def post(self, request, pk):
        user = request.user

        try:
            requisition = Requisition.objects.get(pk=resolve_pk(pk), created_by=user)
        except (Requisition.DoesNotExist, ValueError):
            return _error('Requisition not found.', status.HTTP_404_NOT_FOUND)

        if requisition.status not in EDITABLE_STATUSES:
            return _error(
                f'Cannot submit a requisition with status "{requisition.get_status_display()}".'
            )

        if requisition.requisition_type == 'department':
            new_status = 'pending_hod'
            action_label = 'submitted'
        else:
            new_status = 'pending_ed'
            action_label = 'submitted'

        requisition.status = new_status
        requisition.submitted_at = requisition.submitted_at or timezone.now()

        # Capture staff signature snapshot
        if user.signature:
            # Make a copy of the signature file so it's independent of the user's current signature
            sig_content = user.signature.read()
            user.signature.seek(0)  # Reset file pointer
            sig_name = f'staff_sig_req{requisition.id}_{user.id}.{user.signature.name.split(".")[-1]}'
            requisition.staff_signature.save(sig_name, ContentFile(sig_content), save=False)
        requisition.staff_sign_name = user.name
        requisition.staff_signed_at = timezone.now()

        requisition.save()

        RequisitionAction.objects.create(
            requisition=requisition,
            action=action_label,
            acted_by=user,
            comment=''
        )

        try:
            send_requisition_notification_async(requisition)
        except Exception as e:
            print(f"Error sending submission email: {e}")

        return _success(f'Requisition submitted. Status: {requisition.get_status_display()}.')


# ─────────────────────────────────────────────────────────────────────────────
#  HOD / ED: approve, reject, or return
# ─────────────────────────────────────────────────────────────────────────────

class RequisitionActionView(APIView):
    """
    POST /requisitions/<id>/action/

    Body: { "action": "approved_by_hod", "comment": "Looks good." }

    Enforces:
    - Role must match the action (HOD actions for HOD, ED actions for ED).
    - Requisition must be in the correct pending status for that role.
    """

    # Which status is required before each action can be performed
    REQUIRED_STATUS_MAP = {
        'approved_by_hod': ['pending_hod'],
        'rejected_by_hod': ['pending_hod'],
        'returned_by_hod': ['pending_hod', 'returned_to_hod'],
        'approved_by_ed':  ['pending_ed'],
        'rejected_by_ed':  ['pending_ed'],
        'returned_by_ed':  ['pending_ed'],
    }

    @extend_schema(request=RequisitionActionWriteSerializer)
    def post(self, request, pk):
        user = request.user
        role = getattr(user, 'role', None)

        try:
            requisition = Requisition.objects.get(pk=resolve_pk(pk))
        except (Requisition.DoesNotExist, ValueError):
            return _error('Requisition not found.', status.HTTP_404_NOT_FOUND)

        serializer = RequisitionActionWriteSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {'success': False, 'errors': serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )

        action = serializer.validated_data['action']
        comment = serializer.validated_data.get('comment', '')

        # 1. Role check
        required_role = ACTION_ROLE_MAP.get(action)
        if role != required_role:
            return _error(
                f'Action "{action}" can only be performed by a {required_role.upper()}.',
                status.HTTP_403_FORBIDDEN
            )

        # 2. HOD scope check — HOD can only act on their own department
        if role == 'hod':
            if (requisition.requisition_type != 'department'
                    or requisition.department != user.department):
                return _error(
                    'You can only act on requisitions from your department.',
                    status.HTTP_403_FORBIDDEN
                )

        # 3. Status check
        allowed_statuses = self.REQUIRED_STATUS_MAP[action]
        if requisition.status not in allowed_statuses:
            return _error(
                f'This action requires status to be in {allowed_statuses}, '
                f'but current status is "{requisition.status}".'
            )

        # 4. Comment requirement checks
        if action == 'returned_by_ed' and not comment.strip():
            return _error('A comment is required when ED returns a requisition.')
        if action == 'returned_by_hod' and requisition.status == 'pending_hod' and not comment.strip():
            return _error('A comment is required when returning a requisition to staff.')

        # 5. Apply
        new_status = ACTION_STATUS_MAP[action]
        if action == 'returned_by_ed' and requisition.requisition_type == 'club':
            new_status = 'returned_to_staff'
        requisition.status = new_status
        if action == 'approved_by_hod':
            requisition.priority = serializer.validated_data.get('priority')

        # Capture approver signature snapshot
        if action == 'approved_by_hod' and user.signature:
            sig_content = user.signature.read()
            user.signature.seek(0)
            sig_name = f'hod_sig_req{requisition.id}_{user.id}.{user.signature.name.split(".")[-1]}'
            requisition.hod_signature.save(sig_name, ContentFile(sig_content), save=False)
            requisition.hod_sign_name = user.name
            requisition.hod_signed_at = timezone.now()
        elif action == 'approved_by_hod':
            requisition.hod_sign_name = user.name
            requisition.hod_signed_at = timezone.now()

        if action == 'approved_by_ed' and user.signature:
            sig_content = user.signature.read()
            user.signature.seek(0)
            sig_name = f'ed_sig_req{requisition.id}_{user.id}.{user.signature.name.split(".")[-1]}'
            requisition.ed_signature.save(sig_name, ContentFile(sig_content), save=False)
            requisition.ed_sign_name = user.name
            requisition.ed_signed_at = timezone.now()
        elif action == 'approved_by_ed':
            requisition.ed_sign_name = user.name
            requisition.ed_signed_at = timezone.now()

        requisition.save()

        RequisitionAction.objects.create(
            requisition=requisition,
            action=action,
            acted_by=user,
            comment=comment
        )

        try:
            send_requisition_notification_async(requisition, comment=comment)
        except Exception as e:
            print(f"Error sending action email: {e}")

        return _success(
            f'Requisition {action.replace("_", " ")}. '
            f'New status: {requisition.get_status_display()}.'
        )


# ─────────────────────────────────────────────────────────────────────────────
#  Supporting documents
# ─────────────────────────────────────────────────────────────────────────────

class RequisitionDocumentUploadView(APIView):
    """
    POST   /requisitions/<id>/documents/         → Upload a document.
    DELETE /requisitions/<id>/documents/<doc_id>/ → Delete a document.
    """

    def post(self, request, pk):
        user = request.user

        try:
            requisition = Requisition.objects.get(pk=resolve_pk(pk))
        except (Requisition.DoesNotExist, ValueError):
            return _error('Requisition not found.', status.HTTP_404_NOT_FOUND)

        if requisition.created_by != user:
            return _error('You can only upload documents to your own requisitions.',
                          status.HTTP_403_FORBIDDEN)

        if requisition.status not in EDITABLE_STATUSES:
            return _error('Documents can only be added while the requisition is editable.')

        file = request.FILES.get('file')
        if not file:
            return _error('No file provided.')

        doc = RequisitionDocument.objects.create(
            requisition=requisition,
            file=file,
            original_filename=file.name,
            uploaded_by=user,
        )

        serializer = RequisitionDocumentSerializer(doc, context={'request': request})
        return Response(
            {'success': True, 'message': 'Document uploaded.', 'data': serializer.data},
            status=status.HTTP_201_CREATED
        )

    def delete(self, request, pk, doc_id):
        user = request.user

        try:
            doc = RequisitionDocument.objects.get(pk=doc_id, requisition__id=resolve_pk(pk))
        except (RequisitionDocument.DoesNotExist, ValueError):
            return _error('Document not found.', status.HTTP_404_NOT_FOUND)

        if doc.requisition.created_by != user:
            return _error('You can only delete your own documents.', status.HTTP_403_FORBIDDEN)

        doc.file.delete(save=False)  # remove the actual file from storage
        doc.delete()
        return _success('Document deleted.')


# ─────────────────────────────────────────────────────────────────────────────
#  Action history (read-only, for any authorised viewer)
# ─────────────────────────────────────────────────────────────────────────────

class RequisitionHistoryView(APIView):
    """
    GET /requisitions/<id>/history/  → Returns the full action/comment history.
    """

    def get(self, request, pk):
        try:
            requisition = Requisition.objects.get(pk=resolve_pk(pk))
        except (Requisition.DoesNotExist, ValueError):
            return _error('Requisition not found.', status.HTTP_404_NOT_FOUND)

        actions = requisition.actions.select_related('acted_by').order_by('acted_at')
        serializer = RequisitionActionSerializer(actions, many=True)
        return Response({'success': True, 'data': serializer.data})


# ─────────────────────────────────────────────────────────────────────────────
#  Institutional Audit Trail (ED / Admin only)
# ─────────────────────────────────────────────────────────────────────────────

class AuditTrailView(APIView):
    """
    GET /requisitions/audit-trail/  → Returns all recent actions across the institution.
    Only accessible by ED and Admin users.
    """

    def get(self, request):
        print(">>>>>>>> AUDIT TRAIL VIEW HIT <<<<<<<<")
        user = request.user
        role = getattr(user, 'role', None)

        if role not in ('ed', 'admin'):
            return _error('Only ED and Admin can access the audit trail.', status.HTTP_403_FORBIDDEN)

        # Get recent actions across all requisitions
        limit = int(request.query_params.get('limit', 50))
        limit = min(limit, 200)  # Cap at 200

        actions = RequisitionAction.objects.select_related(
            'acted_by', 'requisition', 'requisition__department', 'requisition__club'
        ).order_by('-acted_at')[:limit]

        data = []
        for act in actions:
            req = act.requisition
            entity_name = ''
            if req.requisition_type == 'department' and req.department:
                entity_name = req.department.name
            elif req.requisition_type == 'club' and req.club:
                entity_name = req.club.name

            data.append({
                'id': act.id,
                'action': act.action,
                'action_display': act.get_action_display(),
                'acted_by_name': act.acted_by.name if act.acted_by else 'System',
                'acted_by_role': act.acted_by.role if act.acted_by else '',
                'comment': act.comment,
                'acted_at': act.acted_at.isoformat(),
                'requisition_id': req.id,
                'programme_name': req.programme_name,
                'requisition_type': req.requisition_type,
                'entity_name': entity_name,
                'requisition_status': req.status,
            })

        return Response({'success': True, 'data': data})


class AnnualReportDataView(APIView):
    """
    GET /requisitions/annual-report/?year=2025
    Returns all requisitions for the academic year (June {year} – May {year+1})
    with items and actions, for generating the annual report.
    Only accessible by ED and Admin users.
    """

    def get(self, request):
        user = request.user
        role = getattr(user, 'role', None)

        if role not in ('ed', 'admin'):
            return _error('Only ED and Admin can access the annual report.', status.HTTP_403_FORBIDDEN)

        # Parse academic year from query params (default: current AY)
        now = timezone.now()
        current_start_year = now.year if now.month >= 6 else now.year - 1
        try:
            start_year = int(request.query_params.get('year', current_start_year))
        except (ValueError, TypeError):
            start_year = current_start_year

        from datetime import datetime
        ay_start = datetime(start_year, 6, 1, tzinfo=timezone.get_current_timezone())
        ay_end = datetime(start_year + 1, 5, 31, 23, 59, 59, tzinfo=timezone.get_current_timezone())

        # Query all requisitions in this academic year
        requisitions = Requisition.objects.filter(
            created_at__gte=ay_start,
            created_at__lte=ay_end
        ).select_related('created_by', 'department', 'club').prefetch_related('items', 'actions', 'actions__acted_by', 'documents')

        data = []
        for req in requisitions:
            items = []
            for item in req.items.all():
                items.append({
                    'item_name': item.item_name,
                    'specification': item.specification,
                    'required_quantity': item.required_quantity,
                    'estimated_cost': float(item.estimated_cost or 0),
                })

            actions = []
            for act in req.actions.all().order_by('acted_at'):
                actions.append({
                    'id': act.id,
                    'action': act.action,
                    'acted_by_name': act.acted_by.name if act.acted_by else 'System',
                    'acted_by_role': act.acted_by.role if act.acted_by else '',
                    'acted_at': act.acted_at.isoformat(),
                    'comment': act.comment,
                })

            total_cost = sum((item.estimated_cost or 0) * (item.required_quantity or 0) for item in req.items.all())

            data.append({
                'id': req.id,
                'requisition_id': f'REQ-{req.id}',
                'programme_name': req.programme_name,
                'requisition_type': req.requisition_type,
                'status': req.status,
                'priority': req.priority,
                'requisition_date': str(req.requisition_date) if req.requisition_date else '',
                'programme_datetime': req.programme_datetime.isoformat() if req.programme_datetime else '',
                'created_by_name': req.created_by.name if req.created_by else 'Unknown',
                'department_name': req.department.name if req.department else '',
                'club_name': req.club.name if req.club else '',
                'total_estimated_cost': float(total_cost),
                'created_at': req.created_at.isoformat(),
                'submitted_at': req.submitted_at.isoformat() if req.submitted_at else None,
                'items': items,
                'actions': actions,
                'document_count': req.documents.count(),
                # Signature data
                'staff_sign_name': req.staff_sign_name,
                'hod_sign_name': req.hod_sign_name,
                'ed_sign_name': req.ed_sign_name,
            })

        return Response({
            'success': True,
            'academic_year': f'{start_year}–{str(start_year + 1)[-2:]}',
            'start_year': start_year,
            'data': data,
        })