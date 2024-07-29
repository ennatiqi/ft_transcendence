from django.contrib.auth.models import Group, User
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class MessageSerializer(serializers.HyperlinkedModelSerializer):
    def  (self, validated_data):
        message = get_massage_model().objects.reate_message(
            author = validated_data['author'],
            content = validated_data['content'],
            time = validated_data['time'],
        )
    class Meta:
        model = Group
        fields = ['url', 'name']