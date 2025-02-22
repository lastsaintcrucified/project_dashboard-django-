from rest_framework import serializers
from .models import User, Project
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role']

class ProjectSerializer(serializers.ModelSerializer):
    assigned_users = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = '__all__'

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