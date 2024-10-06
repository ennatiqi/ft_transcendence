
from django.urls import path
from .views import LoginView, HomeView, Mainview, GameView, DataView

urlpatterns = [
    path('login/', LoginView,name='login'),
    path('home/', HomeView, name='home'),
    path('game/', GameView),
    path('data/', DataView)
]
