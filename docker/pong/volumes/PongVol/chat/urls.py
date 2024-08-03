from django.urls import path
from .views import MessageViewSet

urlpatterns = [
    path('chat/', MessageViewSet.as_view({'get': 'list'}), name='caht-app'),
]