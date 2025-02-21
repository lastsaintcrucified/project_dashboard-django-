from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (('admin', 'Admin'), ('user', 'User'))
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')

class Project(models.Model):
    STATUS_CHOICES = (('active', 'Active'), ('completed', 'Completed'))   
     
    title = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')
    due_date = models.DateField()
    assigned_users = models.ManyToManyField(User, related_name="projects")

    def __str__(self):
        return self.title