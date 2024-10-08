# Generated by Django 3.2.5 on 2024-10-03 09:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('room_id', models.CharField(max_length=255, unique=True)),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='GameResult',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField()),
                ('winner_score', models.IntegerField()),
                ('loser_score', models.IntegerField()),
                ('loser_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='loser_user', to=settings.AUTH_USER_MODEL)),
                ('winner_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='winner_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
