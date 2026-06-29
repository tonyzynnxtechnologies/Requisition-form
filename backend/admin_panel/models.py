from django.db import models
from django.contrib.auth.models import AbstractUser



class Department(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name
    

class Club(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name
    

class User(AbstractUser):
    ROLE_CHOICES = [
        ('staff', 'Staff'),
        ('hod', 'HOD'),
        ('ed', 'ED'),
        ('admin', 'Admin'),
    ]
    username = models.CharField(max_length=150, unique=True)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=30, choices=ROLE_CHOICES)
    profile_pic = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    signature = models.ImageField(upload_to='signatures/', blank=True, null=True)
    club = models.ForeignKey(Club, on_delete=models.SET_NULL, null=True, blank=True)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = [
        'email',
        'name',
        'role',
    ]

    def __str__(self):
        return self.name


class SystemSetting(models.Model):
    key = models.CharField(max_length=255, unique=True)
    value = models.TextField()

    def __str__(self):
        return f"{self.key}: {self.value}"