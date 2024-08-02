import json

from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.models import User
from asgiref.sync import sync_to_async
from .models import Message
from django.utils import timezone

from django.contrib.sessions.models import Session
from channels.db import database_sync_to_async

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"chat_{self.room_name}"
        
        # get username
        session_key = self.scope['cookies'].get('sessionid', None)
        if session_key:
            session = await database_sync_to_async(Session.objects.get)(session_key=session_key)
            user_id = session.get_decoded().get('_auth_user_id')
            user = await database_sync_to_async(User.objects.get)(id=user_id)
            self.username = user.username
        else:
            self.username = 'Anonymous'


        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        await self.accept()

        messages = await self.get_messages()
        for message, username in messages:
            await self.send(text_data=json.dumps({"message": message,"sender": username, "name": self.username }))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]

        await self.save_message(self.username , message)
        await self.channel_layer.group_send(
            self.room_group_name, {"type": "chat.message", "message": message}
        )
    @sync_to_async
    def save_message(self, username, message):
        user = User.objects.get(username=username)
        Message.objects.create(sender=user, content=message, time=timezone.now())


    async def chat_message(self, event):
        content, username = await self.get_message()
        await self.send(text_data=json.dumps({"message": content, "sender": username, "name": self.username}))

    @sync_to_async
    def get_message(self):
        message = Message.objects.order_by('-time').first()
        if message is None:
            return "", ""
        return message.content, message.sender.username

    @sync_to_async
    def get_messages(self):
        messages = Message.objects.order_by('time')
        return [(message.content, message.sender.username) for message in messages]


