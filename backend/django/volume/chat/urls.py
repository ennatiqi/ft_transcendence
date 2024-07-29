
from django.contrib import admin
from django.urls import path, include 


from django.contrib.auth.models import User
# from rest_framework import routers, serializers, viewsets

urlpatterns = [
    path('admin/', admin.site.urls),
    path("chat/", include("chatapp.urls")),
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]

