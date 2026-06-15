from rest_framework import serializers
from .models import Requisition, RequisitionItem, RequisitionDocument, RequisitionAction



class RequisitionItemSerializer(serializers.ModelSerializer):
    sl_no = serializers.IntegerField(required=False)

    class Meta:
        model = RequisitionItem
        fields = [
            'id',
            'sl_no',
            'item_name',
            'specification',
            'required_quantity',
            'estimated_cost'
        ]



class RequisitionDocumentSerializer(serializers.ModelSerializer):
    uploaded_by_name = serializers.CharField(source='uploaded_by.name', read_only=True)

    class Meta:
        model = RequisitionDocument
        fields = [
            'id',
            'file',
            'original_filename',
            'uploaded_by',
            'uploaded_by_name',
            'uploaded_at'
        ]
        read_only_fields = ['uploaded_by', 'uploaded_at']




class RequisitionActionSerializer(serializers.ModelSerializer):
    acted_by_name = serializers.CharField(source='acted_by.name', read_only=True)
    acted_by_role = serializers.CharField(source='acted_by.role', read_only=True)

    class Meta:
        model = RequisitionAction
        fields = [
            'id',
            'action',
            'acted_by',
            'acted_by_name',
            'acted_by_role',
            'comment',
            'acted_at'
        ]
        read_only_fields = ['acted_by', 'acted_at']




class RequisitionListSerializer(serializers.ModelSerializer):
    created_by_name = serializers.CharField(source='created_by.name', read_only=True)
    created_by_email = serializers.CharField(source='created_by.email', read_only=True)
    department_name = serializers.CharField(source='department.name', read_only=True)
    club_name = serializers.CharField(source='club.name', read_only=True)
    item_count = serializers.IntegerField(source='items.count', read_only=True)
    total_estimated_cost = serializers.SerializerMethodField()

    class Meta:
        model = Requisition
        fields = [
            'id',
            'programme_name',
            'requisition_type',
            'status',
            'priority',
            'created_by',
            'created_by_name',
            'created_by_email',
            'department',
            'department_name',
            'club',
            'club_name',
            'requisition_date',
            'item_count',
            'total_estimated_cost',
            'created_at',
            'updated_at'
        ]

    def get_total_estimated_cost(self, obj):
        return sum((item.estimated_cost or 0) * (item.required_quantity or 0) for item in obj.items.all())



    
class RequisitionDetailSerializer(serializers.ModelSerializer):
    created_by_name = serializers.CharField(source='created_by.name', read_only=True)
    department_name = serializers.CharField(source='department.name', read_only=True)
    club_name = serializers.CharField(source='club.name', read_only=True)
    items = RequisitionItemSerializer(many=True, read_only=True)
    documents = RequisitionDocumentSerializer(many=True, read_only=True)
    actions = RequisitionActionSerializer(many=True, read_only=True)

    class Meta:
        model = Requisition
        fields = [
            'id',
            'requisition_type',
            'status',
            'priority',
            'programme_name',
            'requisition_date',
            'programme_datetime',
            'venue',
            'target_audience',
            'resource_person_details',
            'created_by',
            'created_by_name',
            'department',
            'department_name',
            'club',
            'club_name',
            'submitted_at',
            'created_at',
            'updated_at',
            'items',
            'documents',
            'actions',
        ]




class RequisitionWriteSerializer(serializers.ModelSerializer):
    items = RequisitionItemSerializer(many=True)

    class Meta:
        model = Requisition
        fields = [
            'requisition_type',
            'priority',
            'programme_name',
            'requisition_date',
            'programme_datetime',
            'venue',
            'target_audience',
            'resource_person_details',
            'department',
            'club',
            'items',
        ]

    def validate(self, data):
        req_type = data.get('requisition_type')

        if req_type == 'department' and not data.get('department'):
            raise serializers.ValidationError(
                {'department': 'Department is required for a department requisition.'}
            )
        
        items = data.get('items', [])
        if not items:
            raise serializers.ValidationError(
                {'items': 'At least one item is required.'}
            )
 
        for idx, item in enumerate(items, start=1):
            item.setdefault('sl_no', idx)
 
        return data
    

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        requisition = Requisition.objects.create(**validated_data)
        for item_data in items_data:
            RequisitionItem.objects.create(requisition=requisition, **item_data)
        return requisition
    

    def update(self, instance, validated_data):
        items_data = validated_data.pop('items', None)
 
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
 
        if items_data is not None:
            instance.items.all().delete()
            for item_data in items_data:
                RequisitionItem.objects.create(requisition=instance, **item_data)
 
        return instance
    



class RequisitionActionWriteSerializer(serializers.Serializer):
    ACTION_CHOICES = [
        ('approved_by_hod', 'Approved by HOD'),
        ('rejected_by_hod', 'Rejected by HOD'),
        ('returned_by_hod', 'Returned by HOD'),
        ('approved_by_ed', 'Approved by ED'),
        ('rejected_by_ed', 'Rejected by ED'),
        ('returned_by_ed', 'Returned by ED'),
    ]
    action = serializers.ChoiceField(choices=ACTION_CHOICES)
    comment = serializers.CharField(required=False, allow_blank=True, default='')
 
    def validate(self, data):
        action = data.get('action')
        comment = data.get('comment', '')
        
        if 'returned' in action and not comment.strip():
            raise serializers.ValidationError(
                {'comment': 'A comment is required when returning a requisition.'}
            )
        return data