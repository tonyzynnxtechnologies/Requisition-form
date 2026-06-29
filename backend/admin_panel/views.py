from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from django.db.models import Count, Q
from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from drf_spectacular.utils import extend_schema

from .serializers import *
from .models import *




@extend_schema(request=UserRegistrationSerializer)
class UserRegistrationView(APIView):
    def post(self, request):

        serializer = UserRegistrationSerializer(
            data=request.data
        )

        if serializer.is_valid():

            user = serializer.save()

            return Response(
                {
                    "success": True,
                    "message": "User created successfully",
                    "user_id": user.id
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            {
                "success": False,
                "errors": serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )
    

@extend_schema(request=LoginSerializer)
class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        try:
            user = User.objects.get(email=email)

        except User.DoesNotExist:
            return Response(
                {
                    "success": False,
                    "message": "Invalid email or password"
                },
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        authenticated_user = authenticate(
            username=user.username,
            password=password
        )

        if not authenticated_user:
            return Response(
                {
                    "success": False,
                    "message": "Invalid email or password"
                },
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        login(request, authenticated_user)

        return Response(
            {
                "success": True,
                "user": {
                    "id": authenticated_user.id,
                    "name": authenticated_user.name,
                    "email": authenticated_user.email,
                    "role": authenticated_user.role,
                    "department": authenticated_user.department.id if authenticated_user.department else None,
                    "department_name": authenticated_user.department.name if authenticated_user.department else None,
                    "club": authenticated_user.club.id if authenticated_user.club else None,
                    "club_name": authenticated_user.club.name if authenticated_user.club else None,
                    "profile_pic": authenticated_user.profile_pic.url if authenticated_user.profile_pic else None,
                    "signature": authenticated_user.signature.url if authenticated_user.signature else None
                }
            }
        )
    


class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({
            "success": True,
            "message": "Logged out successfully"
        })
    


class CurrentUserView(APIView):
    def get(self, request):
        if not request.user.is_authenticated:
            return Response(
                {"authenticated": False},
                status=401
            )
        user = request.user
        return Response({
            "authenticated": True,
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role,
                "department": user.department_id,
                "department_name": user.department.name if user.department else None,
                "club": user.club_id,
                "club_name": user.club.name if user.club else None,
                "profile_pic": user.profile_pic.url if user.profile_pic else None,
                "signature": user.signature.url if user.signature else None,
            }
        })


@extend_schema(request=UserUpdateSerializer)
class UpdateUserView(APIView):
    def put(self, request, id):
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return Response(
                {
                    "success": False,
                    "message": "User not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )
        
        serializer = UserUpdateSerializer(
            user,
            data = request.data,
            partial = True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "success": True,
                    "message": "User updated successfully"
                }
            )
        
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    


@extend_schema(request=ChangePasswordSerializer)
class ChangePasswordView(APIView):
    def put(self, request, id):
        try:
            user = User.objects.get(id=id)

        except User.DoesNotExist:
            return Response(
                {
                    "success": False,
                    "message": "User not found"
                },
                status=404
            )
        
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            user.set_password(serializer.validated_data["password"])
            user.save()
            return Response(
                {
                    "success": True,
                    "message": "Password changed successfully"
                }
            )
        return Response(
            serializer.errors,
            status=400
        )
    



class DeleteUserView(APIView):
    def delete(self, request, id):
        try:
            user = User.objects.get(id=id)
        
        except User.DoesNotExist:
            return Response(
                {
                    "success": False,
                    "message": "User not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )
        
        user.is_active = False
        user.save()

        return Response(
            {
                "success": True,
                "message": "User deactivated successfully"
            }
        )
    



class UserListView(ListAPIView):
    queryset = User.objects.all().order_by('-id')
    serializer_class = UserSerializer




# DEPARTMENT VIEW
@extend_schema(request=DepartmentSerializer, responses=DepartmentSerializer)
class DepartmentListCreateView(ListCreateAPIView):
    queryset = Department.objects.all().order_by('name')
    serializer_class = DepartmentSerializer


class DepartmentDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer



# CLUB VIEW
class ClubListCreateView(ListCreateAPIView):
    queryset = Club.objects.all().order_by('name')
    serializer_class = ClubSerializer


class ClubDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer


# STAFF VIEW
class StaffListView(ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(role='staff', is_active=True)


class CSRFTokenView(APIView):
    """Returns a CSRF token cookie for the frontend."""
    def get(self, request):
        token = get_token(request)
        return Response({'csrfToken': token})


class DashboardStatsView(APIView):
    """Returns requisition counts by status for the admin dashboard."""
    def get(self, request):
        from user_module.models import Requisition

        qs = Requisition.objects.all()
        total = qs.count()
        pending_hod = qs.filter(status='pending_hod').count()
        pending_ed = qs.filter(status='pending_ed').count()
        approved = qs.filter(status='approved').count()
        rejected = qs.filter(status='rejected').count()
        draft = qs.filter(status='draft').count()

        return Response({
            'total_requisitions': total,
            'pending_hod': pending_hod,
            'pending_ed': pending_ed,
            'approved': approved,
            'rejected': rejected,
            'draft': draft,
        })


class SystemSettingsView(APIView):
    def get(self, request):
        from .models import SystemSetting
        from django.conf import settings as django_settings
        settings_dict = {}
        defaults = {
            'emailAlerts': 'true',
            'statusAlerts': 'true',
            'weeklyDigests': 'false',
            'maintenanceMode': 'false',
            'sessionTimeout': '30',
            'minPasswordLength': '12',
        }
        for key, def_val in defaults.items():
            obj, _ = SystemSetting.objects.get_or_create(key=key, defaults={'value': def_val})
            settings_dict[key] = obj.value
        
        settings_dict['systemEmail'] = getattr(django_settings, 'EMAIL_HOST_USER', 'system@naipunnya.edu')
        return Response(settings_dict)

    def post(self, request):
        from .models import SystemSetting
        for key, val in request.data.items():
            SystemSetting.objects.update_or_create(key=key, defaults={'value': str(val)})
        return Response({'status': 'success'})


class ProfilePicUploadView(APIView):
    def post(self, request):
        if not request.user.is_authenticated:
            return Response({"success": False, "message": "Unauthorized"}, status=401)
        
        file_obj = request.FILES.get('file') or request.FILES.get('profile_pic')
        if not file_obj:
            return Response({"success": False, "message": "No photo provided"}, status=400)
        
        user = request.user
        user.profile_pic = file_obj
        user.save()
        
        profile_pic_url = user.profile_pic.url
        return Response({
            "success": True, 
            "message": "Profile picture updated successfully",
            "profile_pic": profile_pic_url
        })

    def delete(self, request):
        if not request.user.is_authenticated:
            return Response({"success": False, "message": "Unauthorized"}, status=401)
        
        user = request.user
        if user.profile_pic:
            user.profile_pic.delete(save=False)
            user.profile_pic = None
            user.save()
            
        return Response({
            "success": True, 
            "message": "Profile picture removed successfully"
        })


class SignatureUploadView(APIView):
    def post(self, request):
        if not request.user.is_authenticated:
            return Response({"success": False, "message": "Unauthorized"}, status=401)
        
        file_obj = request.FILES.get('file') or request.FILES.get('signature')
        if not file_obj:
            return Response({"success": False, "message": "No signature image provided"}, status=400)
        
        user = request.user
        # Delete old signature file if exists
        if user.signature:
            user.signature.delete(save=False)
        user.signature = file_obj
        user.save()
        
        signature_url = user.signature.url
        return Response({
            "success": True, 
            "message": "Signature updated successfully",
            "signature": signature_url
        })

    def delete(self, request):
        if not request.user.is_authenticated:
            return Response({"success": False, "message": "Unauthorized"}, status=401)
        
        user = request.user
        if user.signature:
            user.signature.delete(save=False)
            user.signature = None
            user.save()
            
        return Response({
            "success": True, 
            "message": "Signature removed successfully"
        })