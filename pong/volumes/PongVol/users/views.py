from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from django.db import IntegrityError
from .models import User, verification_code, TokensCustom
import jwt, json
from django.middleware.csrf import get_token
from django.http import JsonResponse, HttpResponseRedirect
from .functions import gen_token, gen_token_otp, create_totp_device, generate_qr_code, verify_token_otp
from django.conf import settings
from .decorators import auth_only
from .emailing import Emailing
from .mixins import AuthRequired
from django.shortcuts import render
from django_otp.plugins.otp_totp.models import TOTPDevice
import os


class RegisterView(APIView):
    def post(self, request):
        try:
            serializer = UserSerializer(data = request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
        except IntegrityError as e:
            return Response({"detail": str(e)}, 401)    

        return Response({"detail": "Sucessfully signed up"})

class LoginView(APIView):
    def post(self, request):
        if request.user.is_authenticated:
            return HttpResponseRedirect("/dashboard")
        email = request.data['email']
        password =request.data['password']
        user = User.objects.filter(email=email).first()
        if user is None:
            raise AuthenticationFailed('user not found')
        if not user.check_password(password):
            raise AuthenticationFailed('incorrect password')
        if user.twoFA:
            token = gen_token_otp(user)
            response = HttpResponseRedirect('/otp')
            response.data = {
                'detail':'otp verification required',
            }
            response.set_cookie('otp', value=token, httponly=True)
            return response
        token = gen_token(user) #this custom function is generating new token for the user using user.id
        
        # response = Response()
        response = HttpResponseRedirect('/dashboard')
        response.set_cookie(key='jwt',value=token, httponly=True)
        return response

class UserView(AuthRequired,  APIView):
    #//TODO: THIS IS NOT NECESSARY REMOVE IT
    def get(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed("unauthenticated")
        try:
            payload =jwt.decode(token, settings.JWT_SECRET, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            AuthenticationFailed('unauthenticated')

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)


class LogoutView(AuthRequired, APIView):
    def post(self, request):
        tok = TokensCustom.objects.filter(token = request.COOKIES.get('jwt')).first()
        if tok:
            tok.delete()
        response = HttpResponseRedirect('/login')
        response.delete_cookie('jwt')
        response.data = {
            'message':'success',
        }
        return response


def csrf_token_view(request):
    token = get_token(request)
    response = JsonResponse({})
    response.set_cookie("csrf-token", token)
    return response





def enable_otp(request):
    totp_device = create_totp_device(request.user)
    qr_code_buffer = generate_qr_code(totp_device)
    return HttpResponse(qr_code_buffer, content_type="image/png")

from rest_framework.decorators import api_view


@auth_only
@api_view(['POST'])
def enable_otp_confirmation(request):
    # data = json.loads(request.body)
    otp = request.data.get('confirmation')
    if otp:
        totp_device = TOTPDevice.objects.get(user = request.user)
        if totp_device.verify_token(otp):
            totp_device.confirmed = True
            totp_device.save()
            request.user.twoFA = True
            request.user.save()
            return Response({"message":"success"})
    return Response({"messge":"please try again"}, status=status.HTTP_400_BAD_REQUEST)


from rest_framework import status
@api_view(["POST"])
def confirm_otp(request):
    if request.method == 'POST':
        otp = request.POST['otp']
        try:
            token = request.COOKIES.get('otp')
            user = verify_token_otp(token)
            if not user:
                raise Exception('not supposed to do that')
            totp_device = TOTPDevice.objects.get(user = user)
        
            if totp_device.verify_token(otp):
                token = gen_token(user)
                response = HttpResponse()
                response.set_cookie('jwt', value=token, httponly=True)
                return response
            else:
                raise Exception()
        except Exception as e:
            return Response({"message":"Please try again"}, status=status.HTTP_400_BAD_REQUEST)



from django.http import HttpResponse

def send_mail(request):
    if request.method == 'POST':

        data = json.loads(request.body)
        mail = data.get('email')
        exist = User.objects.filter(email = mail).first()
        if not exist:
            return JsonResponse({"message":"email not found"})
        else:
            email = Emailing(mail)            
            if (email.send_mail()):
                return JsonResponse({"message":"sucess"})
            else:
                return JsonResponse({"message":"error at sending"})






def change_pass(request):
    data = json.loads(request.body)
    if not data:
        return JsonResponse({"message":"Invalid data"})
    # return JsonResponse({"message":data})
    ver_code = verification_code.objects.get(code = data.get('code'))
    if not ver_code.is_valid():
        return JsonResponse({"message":"Invalid code"})
    
    
    userUpdate = User.objects.get(email = ver_code.email)
    userUpdate.set_password(data.get('new_password'))
    userUpdate.save()
    ver_code.delete()
    return JsonResponse({"message":"sucess"} )

@auth_only
def profile_img(request):
    image_data = open('./'+request.user.avatar.url, "rb").read()
    return HttpResponse(image_data, content_type="image/jpeg")
