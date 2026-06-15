from rest_framework import serializers
from .models import User, Department, Club

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        min_length=6
    )

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'password',
            'name',
            'email',
            'role',
            'profile_pic',
            'club',
            'department',
            'is_active'
        ]

    def validate(self, data):

        role = data.get("role")

        if role in ["staff", "hod"] and not data.get("department"):
            raise serializers.ValidationError(
                "Department is required."
            )

        return data

    def create(self, validated_data):

        password = validated_data.pop("password")

        user = User.objects.create_user(
            password=password,
            **validated_data
        )

        return user
    


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()



class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [ 
            'name', 
            'email', 
            'role', 
            'department', 
            'club', 
            'profile_pic', 
            'is_active' 
        ]


class ChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(min_length=6, write_only=True)



class UserSerializer(serializers.ModelSerializer):
    departmant_name = serializers.CharField(source='department.name', read_only=True)
    club_name = serializers.CharField(source='club.name', read_only=True)

    class Meta:
        model = User
        fields = [ 
            'id', 
            'username', 
            'name', 
            'email', 
            'role', 
            'profile_pic', 
            'club', 
            'club_name', 
            'department', 
            'departmant_name', 
            'is_active', 
            'created_at', 
            'updated_at' 
        ]



# DEPARTMENT SERIALIZER
class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'



# CLUB SERIALIZER
class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = '__all__'