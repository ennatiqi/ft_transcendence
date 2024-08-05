from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from django.db import IntegrityError
from .models import User
import jwt, datetime
from django.middleware.csrf import get_token
from django.http import JsonResponse

class RegisterView(APIView):
    def post(self, request):
        try:
            serializer = UserSerializer(data = request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
        except IntegrityError as e:
            return (Response({"detail": str(e)}))
        except:
            return Response({"detail": "Error at sign up!"})
        return Response({"detail": "Sucessfully signed up"})

class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password =request.data['password']
        user = User.objects.filter(email=email).first()
        if user is None:
            raise AuthenticationFailed('user not found')
        if not user.check_password(password):
            raise AuthenticationFailed('incorrect password')
        
        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=2),
            'iat': datetime.datetime.utcnow()
        }
        token  = jwt.encode(payload, 'secret', algorithm='HS256')
        response = Response()
        response.data = {
            'detail':'connected'
        }
        # response = HttpResponseRedirect('/')
        response.set_cookie(key='jwt',value=token, httponly=True)
        return response

class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed("unauthenticated")
        try:
            payload =jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            AuthenticationFailed('unauthenticated')

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)

class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message':'success',
        }
        return response


def csrf_token_view(request):
    token = get_token(request)
    return JsonResponse({'csrfToken': token})



from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def data_to_only_logged_users(request):
    # if request.user:
    return JsonResponse({'message':"message for only logged on users that have the permition"})
    # return JsonResponse({'message':"failed in the login check"})