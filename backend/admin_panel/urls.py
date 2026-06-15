from django.urls import path
from .views import *

urlpatterns = [
    path('register/', UserRegistrationView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('csrf/', CSRFTokenView.as_view()),
    path('me/', CurrentUserView.as_view()),
    path('dashboard/stats/', DashboardStatsView.as_view()),
    path('settings/', SystemSettingsView.as_view()),

    # USERS
    path('users/', UserListView.as_view()),
    path('users/<int:id>/update', UpdateUserView.as_view()),
    path('users/<int:id>/change-password/', ChangePasswordView.as_view()),
    path('users/<int:id>/delete/', DeleteUserView.as_view()),

    # DEPARTMENT
    path('departments/', DepartmentListCreateView.as_view()),
    path('departments/<int:pk>/', DepartmentDetailView.as_view()),

    # CLUB
    path('clubs/', ClubListCreateView.as_view()),
    path('clubs/<int:pk>/', ClubDetailView.as_view()),

    # STAFF
    # path('staffs/', )
]