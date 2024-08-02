from django.contrib.auth.decorators import login_required
from django.utils.safestring import mark_safe
from django.shortcuts import render
import json

def index(request):
    return render(request, 'chat/index.html')