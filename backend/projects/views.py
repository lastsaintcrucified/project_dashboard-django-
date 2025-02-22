from urllib import response
from rest_framework import viewsets, permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from django.db.models import Count
from .models import User
from .serializers import UserSerializer, CustomTokenObtainPairSerializer,ProjectSerializer,Project
from rest_framework.decorators import api_view, permission_classes

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def dashboard_view(request):
    total_projects = Project.objects.count()
    status_counts = Project.objects.values('status').annotate(count=Count('status'))
    
    return response({
        'total_projects': total_projects,
        'status_distribution': {item['status']: item['count'] for item in status_counts}
    })

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.prefetch_related('assigned_users').all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        """Ensure the project is created with assigned users"""
        assigned_users = self.request.data.get('assigned_users', [])
        project = serializer.save()
        project.assigned_users.set(assigned_users)  # Assign users when creating a project

    def perform_update(self, serializer):
        """Ensure users can be reassigned"""
        assigned_users = self.request.data.get('assigned_users', [])
        project = serializer.save()
        project.assigned_users.set(assigned_users)  # Update assigned users