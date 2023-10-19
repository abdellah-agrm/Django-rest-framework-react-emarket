from rest_framework import serializers
from django.contrib.auth.models import User

class SignUpSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ("username", "email", "password")

    extra_kwargs = {
      "username" : {"required":True, "allow_blank":False},
      "email" : {"required":True, "allow_blank":False},
      "password" : {"required":True, "allow_blank":False, "min_length":4},
    }

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ("id", "username", "email") 

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')