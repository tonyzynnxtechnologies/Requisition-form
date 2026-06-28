from django.db import models
from django.conf import settings

from admin_panel.models import Club, Department




class Requisition(models.Model):
    REQUISITION_TYPE = [
        ('department', 'Department'),
        ('club', 'Club')
    ]
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('pending_hod', 'Pending HOD'),
        ('pending_ed', 'Pending ED'),
        ('returned_to_staff', 'Returned To Staff'),
        ('returned_to_hod', 'Returned To HOD'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected')
    ]
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('urgent', 'Urgent')
    ]
    requisition_type = models.CharField(max_length=20, choices=REQUISITION_TYPE)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='requisitions')
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True)
    club = models.ForeignKey(Club, on_delete=models.SET_NULL, null=True, blank=True)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')

    programme_name = models.CharField(max_length=255)
    requisition_date = models.DateField()
    programme_datetime = models.DateTimeField(null=True, blank=True)
    venue = models.CharField(max_length=255)
    target_audience = models.CharField(max_length=255, blank=True)

    resource_person_details = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    submitted_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.programme_name} ({self.get_status_display()})"
    


class RequisitionItem(models.Model):
    requisition = models.ForeignKey(Requisition, on_delete=models.CASCADE, related_name='items')
    sl_no = models.PositiveIntegerField()
    item_name = models.CharField(max_length=255)
    specification = models.TextField(blank=True, null=True)
    required_quantity = models.PositiveIntegerField()
    estimated_cost = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)

    class Meta:
        ordering = ['sl_no']
        unique_together = ('requisition', 'sl_no')

    def __str__(self):
        return f"{self.sl_no}. {self.item_name} (x{self.required_quantity})"
    



class RequisitionDocument(models.Model):
    requisition = models.ForeignKey(Requisition, on_delete=models.CASCADE, related_name='documents')
    file = models.FileField(upload_to='requisition_documents/%Y/%m/')
    original_filename = models.CharField(max_length=255)
    uploaded_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.original_filename




class RequisitionAction(models.Model):
    ACTION_CHOICES = [
        ('submitted', 'Submitted'),
        ('approved_by_hod', 'Approved By HOd'),
        ('rejected_by_hod', 'Rejected By Hod'),
        ('returned_by_hod', 'Returned By HOD'),
        ('approved_by_ed', 'Approved By ED'),
        ('rejected_by_ed', 'Rejected By ED'),
        ('returned_by_ed', 'Returned By ED'),
        ('resubmitted', 'Resubmitted')
    ]
    requisition = models.ForeignKey(Requisition, on_delete=models.CASCADE, related_name='actions')
    action = models.CharField(max_length=30, choices=ACTION_CHOICES)
    acted_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    comment = models.TextField(blank=True)
    acted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['acted_at']

    def __str__(self):
        return f"{self.requisition} → {self.get_action_display()} by {self.acted_by}"