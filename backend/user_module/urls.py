from django.urls import path
from .views import (RequisitionListCreateView, RequisitionDetailView, RequisitionSubmitView, RequisitionActionView, RequisitionDocumentUploadView, RequisitionHistoryView, AuditTrailView, AnnualReportDataView,)

urlpatterns = [
    path('audit-trail/', AuditTrailView.as_view(), name='audit-trail'),
    path('annual-report/', AnnualReportDataView.as_view(), name='annual-report'),
    path('', RequisitionListCreateView.as_view(), name='requisition-list-create'),
    path('<str:pk>/', RequisitionDetailView.as_view(), name='requisition-detail'),
    

    path('<int:pk>/', RequisitionDetailView.as_view(), name='requisition-detail'),

    path('<str:pk>/submit/', RequisitionSubmitView.as_view(), name='requisition-submit'),

    path('<str:pk>/action/', RequisitionActionView.as_view(), name='requisition-action'),

    path('<str:pk>/documents/', RequisitionDocumentUploadView.as_view(), name='requisition-doc-upload'),
    path('<str:pk>/documents/<int:doc_id>/', RequisitionDocumentUploadView.as_view(), name='requisition-doc-delete'),

    path('<str:pk>/history/', RequisitionHistoryView.as_view(), name='requisition-history'),
]