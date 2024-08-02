from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.template.loader import render_to_string

# Create your views here.


def Mainview(request):
    if request.user is not None:
        user = request.user.name
    else:
        return redirect('login')
    return render(request, 'index.html', {'name':user})

def HomeView(request):
    string = render_to_string('sections/home.html')
    css = 'static/css/home.css'
    js = ''
    return JsonResponse({'content':string, 'css':css, 'js':js})

def LoginView(request):
    if request.user is not None:
        return redirect('main')
    return render(request, 'login.html')

def GameView(request):
    string = render_to_string('sections/game.html')
    css = 'static/css/game.css'
    js = 'static/js/game.js'
    return JsonResponse({'content':string, 'css': css, 'js': js})

def DataView(request):
    user_name = None
    if request.user is not None:
        user_name = request.user.name
    data = JsonResponse({
        'message':'message from DataView',
        'user_name': user_name
    })
    return data
