from django.contrib.auth.decorators import login_required
from django.utils.safestring import mark_safe
from .serializers import MessageSerializer
from rest_framework.response import Response

from users.serializers import UserSerializer
from users.models import User

from .models import Message



from rest_framework import viewsets

import json


from django.db.models import Q
class MessageViewSet(viewsets.ViewSet):
    def list(self, request, sender=None, receiver=None):
        if sender and receiver:
            messages = Message.objects.filter(
                Q(sender=sender, receiver=receiver) | 
                Q(sender=receiver, receiver=sender)
            )
            serializer = MessageSerializer(messages, many=True)
            return Response(serializer.data)
        else:
            return Response({"error": "Missing sender or receiver"}, status=400)

    def create(self, request, sender=None, receiver=None):
        data = request.data
        data['sender'] = sender
        data['receiver'] = receiver
        serializer = MessageSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
