from rest_framework import serializers
from .models import User, Project
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role']

class ProjectSerializer(serializers.ModelSerializer):
    assigned_users = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), many=True, write_only=True  # Allow updating with user IDs
    )
    assigned_users_data = UserSerializer(source="assigned_users", many=True, read_only=True)

    class Meta:
        model = Project
        fields = '__all__'

    def validate_assigned_users(self, users):
        """Ensure assigned users exist in the database"""
        for user in users:
            if not User.objects.filter(id=user.id).exists():
                raise serializers.ValidationError(f"User with ID {user.id} does not exist.")
        return users

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['role'] = user.role  # ✅ Include the role in the token
        return token
    def validate(self, attrs):
        # Override default validation to authenticate with email
        email = attrs.get("email")
        password = attrs.get("password")

        if email and password:
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                raise serializers.ValidationError("Invalid credentials")

            if not user.check_password(password):
                raise serializers.ValidationError("Invalid credentials")

            attrs["username"] = user.email  # JWT still expects 'username'
        
        return super().validate(attrs)