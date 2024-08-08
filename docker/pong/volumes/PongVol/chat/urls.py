from django.urls import path
from .views import MessageViewSet, UserView
from .consumers import ChatConsumer

urlpatterns = [
    # path('ws/chat/<room_name>/', ChatConsumer.as_asgi(), name='caht-app'),
    path('users/', UserView.as_view({'get': 'list'}), name='user-app'),
    path('chat/', MessageViewSet.as_view({'post': 'create'}), name='chat-app'),
]