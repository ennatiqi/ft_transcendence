# Generated by Django 3.2.5 on 2024-09-20 09:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0016_verification_code'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='avatar',
            field=models.ImageField(default='default_avatar.png', upload_to='avatars/'),
        ),
    ]