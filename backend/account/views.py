from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from .serializers import SignUpSerializer, UserSerializer, UserUpdateSerializer
from rest_framework.permissions import IsAuthenticated


@api_view(['POST'])
def register(request):
  data = request.data
  user = SignUpSerializer(data=data)

  if user.is_valid():
    if not User.objects.filter(email=data['email']).exists():
      User.objects.create(
        username = data['username'],
        email = data['email'],
        password = make_password(data['password']),
      )
      return Response(
        {'details':'Your account has been created!'}
        , status=status.HTTP_201_CREATED
      )
    else :
      return Response(
        {'error':'This email is already taken!'}
        , status=status.HTTP_400_BAD_REQUEST
      )
  else :
    return Response(user.errors)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
  user = UserSerializer(request.user)
  return Response(user.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user(request):
    user = request.user
    data = request.data

    # Check if the 'password' field is provided
    if 'password' in data and data['password']:
        # If 'password' is provided and not empty, hash and set the new password
        user.password = make_password(data['password'])

    # Check if 'username' or 'email' fields are provided
    if 'username' in data:
        user.username = data['username']
    if 'email' in data:
        user.email = data['email']

    user.save()
    serializer = UserUpdateSerializer(user, many=False)

    return Response({"✅": "The user data has been updated successfully!"}, status=status.HTTP_200_OK)