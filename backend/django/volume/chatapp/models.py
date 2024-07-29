from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.
# class User(models.Model):
#     username = models.CharField(max_length=100)

class Message(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='author_messages')
    content = models.TextField()
    time = models.DateTimeField(auto_now_add=True)
    # sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    # receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    # is_read = models.BooleanField(default=False)
    
    # class Meta:
    #     ordering = ['time']
    #     verbose_name_plural = "Messages"

    def __str__(self):
        return  self.author.username 
    def last_22_messages(self ):
        return Message.objects.order_by('-time').all()[:22 ]
