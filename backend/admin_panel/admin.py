from django.contrib import admin
from .models import Department, Club, User


admin.site.register(User)
admin.site.register(Department)
admin.site.register(Club)