from django.urls import path
from .views import (RequisitionListCreateView, RequisitionDetailView, RequisitionSubmitView, RequisitionActionView, RequisitionDocumentUploadView, RequisitionHistoryView,)

urlpatterns = [
    path('', RequisitionListCreateView.as_view(), name='requisition-list-create'),

    path('<int:pk>/', RequisitionDetailView.as_view(), name='requisition-detail'),

    path('<int:pk>/submit/', RequisitionSubmitView.as_view(), name='requisition-submit'),

    path('<int:pk>/action/', RequisitionActionView.as_view(), name='requisition-action'),

    path('<int:pk>/documents/', RequisitionDocumentUploadView.as_view(), name='requisition-doc-upload'),
    path('<int:pk>/documents/<int:doc_id>/', RequisitionDocumentUploadView.as_view(), name='requisition-doc-delete'),

    path('<int:pk>/history/', RequisitionHistoryView.as_view(), name='requisition-history'),
]