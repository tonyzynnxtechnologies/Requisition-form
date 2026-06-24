from django.urls import path
from .views import (RequisitionListCreateView, RequisitionDetailView, RequisitionSubmitView, RequisitionActionView, RequisitionDocumentUploadView, RequisitionHistoryView, AuditTrailView,)

urlpatterns = [
    path('', RequisitionListCreateView.as_view(), name='requisition-list-create'),

<<<<<<< HEAD
    path('<str:pk>/', RequisitionDetailView.as_view(), name='requisition-detail'),
=======
    path('audit-trail/', AuditTrailView.as_view(), name='audit-trail'),

    path('<int:pk>/', RequisitionDetailView.as_view(), name='requisition-detail'),
>>>>>>> c9b3f02c (Audit trail)

    path('<str:pk>/submit/', RequisitionSubmitView.as_view(), name='requisition-submit'),

    path('<str:pk>/action/', RequisitionActionView.as_view(), name='requisition-action'),

    path('<str:pk>/documents/', RequisitionDocumentUploadView.as_view(), name='requisition-doc-upload'),
    path('<str:pk>/documents/<int:doc_id>/', RequisitionDocumentUploadView.as_view(), name='requisition-doc-delete'),

    path('<str:pk>/history/', RequisitionHistoryView.as_view(), name='requisition-history'),
]