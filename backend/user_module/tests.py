from django.test import TestCase
from django.contrib.auth import get_user_model
from admin_panel.models import Department
from user_module.models import Requisition
from user_module.serializers import RequisitionWriteSerializer

User = get_user_model()

class RequisitionModelTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='teststaff',
            email='teststaff@gmail.com',
            password='password123',
            role='staff'
        )
        self.department = Department.objects.create(name='Computer Science')

    def test_venue_is_required_in_serializer(self):
        # Data without venue
        data = {
            'requisition_type': 'department',
            'priority': 'medium',
            'programme_name': 'Test Event',
            'requisition_date': '2026-06-28',
            'programme_datetime': '2026-06-28T10:00:00Z',
            'department': self.department.id,
            'items': [
                {
                    'item_name': 'HDMI Cable',
                    'required_quantity': 1
                }
            ]
        }
        serializer = RequisitionWriteSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('venue', serializer.errors)

    def test_optional_fields_are_accepted_as_null_or_blank(self):
        # Data with venue but with optional fields missing/null/blank
        data = {
            'requisition_type': 'department',
            'priority': 'medium',
            'programme_name': 'Test Event',
            'requisition_date': '2026-06-28',
            'programme_datetime': '2026-06-28T10:00:00Z',
            'venue': 'Seminar Hall I',
            'department': self.department.id,
            'resource_person_details': '', # Blank
            'items': [
                {
                    'item_name': 'HDMI Cable',
                    'specification': '', # Blank
                    'required_quantity': 1,
                    'estimated_cost': None # Null
                }
            ]
        }
        serializer = RequisitionWriteSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        
        # Save requisition using serializer
        requisition = serializer.save(created_by=self.user, status='draft')
        
        # Check database object values
        self.assertEqual(requisition.venue, 'Seminar Hall I')
        self.assertEqual(requisition.resource_person_details, '')
        
        item = requisition.items.first()
        self.assertEqual(item.item_name, 'HDMI Cable')
        self.assertEqual(item.specification, '')
        self.assertIsNone(item.estimated_cost)
