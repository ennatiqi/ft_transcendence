import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.models import User
from channels.db import database_sync_to_async
from .models import Message
from django.utils import timezone
from users.models import User


from django.db.models import Q

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.sender = self.scope["url_route"]["kwargs"]["sender"]
        self.receiver = self.scope["url_route"]["kwargs"]["receiver"]
        self.room_group_name = f"chat_{self.sender}_{self.receiver}"
        
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        
        
        messages = await self.get_message()
        for message in messages:
            await self.send(text_data=json.dumps(message))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        content = text_data_json["content"]

        await self.save_message(self.sender, self.receiver, content)

    @database_sync_to_async
    def save_message(self, sender_id, receiver_id, content):
        sender = User.objects.get(id=sender_id)
        receiver = User.objects.get(id=receiver_id)
        Message.objects.create(sender=sender, receiver=receiver, content=content, time=timezone.now())
    
    async def chat_message(self, event):
        content = event["content"]
        sender = event["sender"]
        receiver = event["receiver"]
        time = event["time"]

        # await self.send(text_data=json.dumps({
        #     "content": content,
        #     "sender": sender,
        #     "receiver": receiver,
        #     "time": time
        # }))




    @database_sync_to_async
    def get_message(self):
        messages = Message.objects.filter(
            Q(sender=self.sender, receiver=self.receiver) | 
            Q(sender=self.receiver, receiver=self.sender)
        ).order_by('time')

        return [{
            "content": message.content, 
            "sender": message.sender.id, 
            "receiver": message.receiver.id, 
            "time": str(message.time), 
        } for message in messages]