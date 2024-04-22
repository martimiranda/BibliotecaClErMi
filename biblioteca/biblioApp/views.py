from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import AuthenticationFailed

from .models import Book, CD, Item, Dispositive, Log, User, Role

@csrf_exempt
def get_token_by_dni_and_password(dni, password):
    try:
        user = authenticate(username=dni, password=password)
        if user is None:
            raise AuthenticationFailed('Invalid DNI or password')

        refresh = RefreshToken.for_user(user)

        token_data = {
            'id': user.id,
            'dni': user.dni,
        }

        token_data['refresh'] = str(refresh)
        token_data['access'] = str(refresh.access_token)

        return token_data
    except Exception as error:
        print('auth.service | get_token_by_dni_and_password -> error:', error)

@csrf_exempt
def new_login(request):
    if request.method == 'POST':
        dni = request.POST.get('dni')
        password = request.POST.get('password')
        user = authenticate(request, username=dni, password=password)
        if user is not None and user.is_active:
            token = get_token_by_dni_and_password(dni, password)
            return JsonResponse({'message': 'User Authenticated successfully', 'token': token})
        else:
            return JsonResponse({'message': 'Incorrect credentials'}, status=401)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

def create_user_profile(dni, password):
    user = User.objects.create_user(username=dni, password=password)
    profile = User.objects.create(user=user, dni=dni)
    return profile

def register(password, name, surname, surname2, role_id, date_of_birth, center, cycle, dni, email, image=None):
    try:
        role = Role.objects.get(id=role_id)

        user_profile = User.objects.create(
            name=name,
            surname=surname,
            surname2=surname2,
            role=role,
            date_of_birth=date_of_birth,
            center=center,
            cycle=cycle,
            image=image,
            dni=dni,
            email=email
        )

        return user_profile
    except Exception as error:
        print('auth.service | register -> error:', error)



def get_user_by_id(user_id):
    user = get_object_or_404(User, id=user_id)
    return user

def get_user_profile_by_dni(dni):
    user_profile = get_object_or_404(User, dni=dni)
    return user_profile

# Funcion logs
# Level 1:INFO, 2:SUCCESS , 3:WARNING, 4:ERROR


def InfoLog(user, title, description, route):
    Log.objects.create(
        user=user,
        log_level=1,
        title=title,
        description=description,
        route=route,
        date=timezone.now()
    )


def SuccessLog(user, title, description, route):
    Log.objects.create(
        user=user,
        log_level=2,
        title=title,
        description=description,
        route=route,
        date=timezone.now()
    )


def WarningLog(user, title, description, route):
    Log.objects.create(
        user=user,
        log_level=3,
        title=title,
        description=description,
        route=route,
        date=timezone.now()
    )


def ErrorLog(user, title, description, route):
    Log.objects.create(
        user=user,
        log_level=4,
        title=title,
        description=description,
        route=route,
        date=timezone.now()
    )