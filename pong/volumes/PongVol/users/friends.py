from dataclasses import field, fields
from operator import truediv
from pyexpat import model
from typing_extensions import ReadOnly
from django.db import models
from django.dispatch import receiver

from users.decorators import auth_only
from .models import User
from rest_framework import serializers
from .serializers import UserSerializer

class friends(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sender_user')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='receiver_user')
    accepted = models.BooleanField(default=False)
    blocked = models.BooleanField(default=False)
    class Meta:
        unique_together = ('sender', 'receiver')

    def __str__(self):
        return f"{self.sender} -> {self.receiver} (Accepted: {self.accepted}) (Blocked: {self.blocked})"


class friendsSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    receiver = UserSerializer(read_only=True)
    class Meta:
        model = friends
        fields = ['id', 'sender', 'receiver', 'accepted', 'blocked']

    


from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@auth_only
@api_view(["GET"])
def send_friendship_request(request, target_id):
    try:
        receiver = User.objects.get(Q(id=target_id))
        if request.user == receiver:
            return Response({"error":"you can't send the request to yourself!"}, status=status.HTTP_400_BAD_REQUEST)
        a = Q(sender=request.user)
        b = Q(receiver=receiver)
        c = Q(receiver=request.user)
        d = Q(sender=receiver)
        friendship_blocked = friends.objects.filter((a & b & Q(blocked=True)) | (c & d & Q(blocked=True))).filter()
        if friendship_blocked:
            return Response({"error":"blocked"}, status=status.HTTP_400_BAD_REQUEST)
        
            # return Response({"error":"you can't send the request to yourself!"}, status=status.HTTP_400_BAD_REQUEST)
        ff = friends.objects.filter(Q(sender = receiver) & Q(receiver = request.user)).first()
        if ff and not ff.blocked and not ff.accepted:
            ff.accepted = True
            ff.save()
            return Response({"error":"frendship accepted"}, status=status.HTTP_202_ACCEPTED)
            
        friendship , created = friends.objects.get_or_create(sender = request.user, receiver=receiver)
        if created:
            serializer = friendsSerializer(friendship)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        if friendship.blocked == True:
            return Response({"error":"frendship blocked"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"error":"friendship request already sent!"}, status=status.HTTP_400_BAD_REQUEST)

    except User.DoesNotExist:
        return Response({"error":"you're not supposed to do that!"}, status=status.HTTP_400_BAD_REQUEST)

@auth_only
@api_view(['GET'])
def accept_friendship_request(request, target_id):
    try:
        friendship = friends.objects.get(sender__id=target_id, receiver=request.user, accepted=False, blocked=False)
        friendship.accepted = True
        friendship.save()
        serializer = friendsSerializer(friendship)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except (User.DoesNotExist, Exception):
        return Response({"error":"you're not supposed to do that!"}, status=status.HTTP_400_BAD_REQUEST)


def block_user (self, request):
    pass



from .mixins import AuthRequired
from rest_framework import generics
from django.db.models import Q 
class SearchForUser(AuthRequired, generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        search_string = self.kwargs['search_string']
        return User.objects.filter(Q(username__icontains=search_string) & ~Q(id = self.request.user.id))[:6]

from users.friends import friendsSerializer
class RequestsOnWait(AuthRequired, generics.ListAPIView):
    serializer_class = friendsSerializer
    def get_queryset(self):
        return friends.objects.filter(Q(receiver = self.request.user)& Q(blocked=False) & Q(accepted=False))

class MyFriends(AuthRequired, generics.ListAPIView):
    serializer_class = UserSerializer
    def get_queryset(self):
        user = self.request.user
        sender_friends   = friends.objects.filter(receiver = user, accepted=True).values_list('sender'  , flat=True)
        receiver_friends = friends.objects.filter(sender   = user, accepted=True).values_list('receiver', flat=True)
        friends_ids = set(sender_friends).union(set(receiver_friends))
        return User.objects.filter(id__in=friends_ids)


@api_view(['GET'])
@auth_only
def block_friendship(request, target_id):
    try:

        user = User.objects.get(Q(id = target_id) & ~Q(id=request.user.id))
        a = Q(sender=request.user)
        b = Q(receiver=user)
        c = Q(receiver=request.user)
        d = Q(sender=user)
        friendship = friends.objects.filter((a&b)|(c&d)).first()
        if friendship:
            if friendship.blocked == True:
                raise Exception()
            else:
                friendship.blocked = True
                friendship.accepted = False
                friendship.save()
        else:
            friendship = friends.objects.create(sender = request.user, accepted=False, receiver = user, blocked=True)
    except:
        return Response({"error":"You're not supposed to do that."}, status=status.HTTP_400_BAD_REQUEST)
    return Response({"message":friendsSerializer(friendship).data}, status=status.HTTP_200_OK)

@api_view(['GET'])
@auth_only
def reject_friendship(request, target_id):
    try:
        friendship = friends.objects.get(Q(sender__id = target_id) & Q(receiver=request.user) & Q(blocked=False))
        if friendship.accepted:
            return Response({"message":"already accepted"}, status=status.HTTP_208_ALREADY_REPORTED)
        friendship.delete()
        return Response({"message":"rejected successfully"}, status=status.HTTP_202_ACCEPTED)
    except:
        return Response({"error":'you\'re not supposed to do that'}, status=status.HTTP_400_BAD_REQUEST)