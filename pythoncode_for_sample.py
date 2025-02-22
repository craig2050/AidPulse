# project structure
emergency_project/
├── manage.py
├── emergency_project/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
└── emergency_app/
    ├── __init__.py
    ├── admin.py
    ├── apps.py
    ├── models.py
    ├── urls.py
    ├── views.py
    ├── forms.py
    └── templates/
        └── emergency_app/
            ├── base.html
            ├── landing.html
            └── chat.html

# emergency_app/models.py
from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    USER_TYPES = (
        ('citizen', 'Citizen'),
        ('responder', 'Emergency Responder'),
        ('helper', 'Community Helper'),
    )
    
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_type = models.CharField(max_length=10, choices=USER_TYPES)
    phone_number = models.CharField(max_length=15, blank=True)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.user.username} - {self.user_type}"

class Message(models.Model):
    sender = models.ForeignKey(User, related_name='sent_messages', on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name='received_messages', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['timestamp']

class QuickQuestion(models.Model):
    user_type = models.CharField(max_length=10)
    question = models.CharField(max_length=255)
    response = models.TextField()

    def __str__(self):
        return f"{self.user_type}: {self.question}"

# emergency_app/forms.py
from django import forms
from .models import Message, UserProfile

class MessageForm(forms.ModelForm):
    class Meta:
        model = Message
        fields = ['content']
        widgets = {
            'content': forms.TextInput(attrs={
                'class': 'flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500',
                'placeholder': 'Type your message...'
            })
        }

class UserProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ['user_type', 'phone_number']

# emergency_app/views.py
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .models import Message, QuickQuestion, UserProfile
from .forms import MessageForm
from django.views.decorators.csrf import csrf_exempt
import json

def landing_page(request):
    return render(request, 'emergency_app/landing.html')

@login_required
def chat_view(request):
    user_profile = UserProfile.objects.get(user=request.user)
    messages = Message.objects.filter(receiver=request.user) | Message.objects.filter(sender=request.user)
    quick_questions = QuickQuestion.objects.filter(user_type=user_profile.user_type)
    
    context = {
        'messages': messages,
        'quick_questions': quick_questions,
        'form': MessageForm(),
        'user_type': user_profile.user_type
    }
    return render(request, 'emergency_app/chat.html', context)

@csrf_exempt
@login_required
def send_message(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        message = Message.objects.create(
            sender=request.user,
            receiver=request.user,  # For demo, messages go to self
            content=data.get('content')
        )
        return JsonResponse({
            'status': 'success',
            'message': {
                'content': message.content,
                'timestamp': message.timestamp.strftime('%Y-%m-%d %H:%M:%S')
            }
        })
    return JsonResponse({'status': 'error'}, status=400)

# emergency_app/urls.py
from django.urls import path
from . import views

app_name = 'emergency_app'

urlpatterns = [
    path('', views.landing_page, name='landing'),
    path('chat/', views.chat_view, name='chat'),
    path('send-message/', views.send_message, name='send_message'),
]

# emergency_app/templates/emergency_app/base.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Emergency Response Hub</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen bg-gray-50">
    {% block content %}{% endblock %}
    
    <script>
        // Add your JavaScript here
    </script>
</body>
</html>

# emergency_app/templates/emergency_app/landing.html
{% extends 'emergency_app/base.html' %}

{% block content %}
<div class="min-h-screen bg-gray-50 p-4">
    <div class="max-w-md mx-auto space-y-6">
        <!-- Logo and Header -->
        <div class="text-center space-y-4">
            <div class="w-24 h-24 bg-blue-600 rounded-full mx-auto flex items-center justify-center">
                <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                </svg>
            </div>
            <h1 class="text-2xl font-bold text-gray-900">Emergency Response Hub</h1>
            <p class="text-gray-600">
                Connect with emergency services, first responders, and community helpers
                in real-time for immediate assistance and support.
            </p>
        </div>

        <!-- User Type Selection -->
        <div class="space-y-4">
            <a href="{% url 'emergency_app:chat' %}?type=citizen" 
               class="block w-full h-16 text-lg bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center">
                I Need Help (Citizen)
            </a>
            <a href="{% url 'emergency_app:chat' %}?type=responder"
               class="block w-full h-16 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center">
                Emergency Responder
            </a>
            <a href="{% url 'emergency_app:chat' %}?type=helper"
               class="block w-full h-16 text-lg bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center">
                Community Helper
            </a>
        </div>
    </div>
</div>
{% endblock %}

# emergency_app/templates/emergency_app/chat.html
{% extends 'emergency_app/base.html' %}

{% block content %}
<div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Chat Header -->
    <div class="bg-blue-600 text-white p-4 flex items-center justify-between">
        <a href="{% url 'emergency_app:landing' %}" 
           class="text-white hover:text-blue-200">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
        </a>
        <h2 class="text-lg font-semibold">
            {{ user_type|title }} Support
        </h2>
        <button class="text-white hover:text-blue-200">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
        </button>
    </div>

    <!-- Chat Messages -->
    <div id="messages-container" class="flex-1 overflow-y-auto p-4 space-y-4">
        {% for message in messages %}
        <div class="flex {% if message.sender == request.user %}justify-end{% else %}justify-start{% endif %}">
            <div class="rounded-lg p-3 {% if message.sender == request.user %}bg-blue-600 text-white{% else %}bg-white border{% endif %} max-w-[80%]">
                {{ message.content }}
            </div>
        </div>
        {% endfor %}
    </div>

    <!-- Quick Questions -->
    <div class="p-4 bg-gray-100 overflow-x-auto">
        <div class="flex space-x-2">
            {% for question in quick_questions %}
            <button class="px-4 py-2 bg-white rounded-lg border hover:bg-gray-50 whitespace-nowrap"
                    onclick="sendQuickQuestion('{{ question.question }}')">
                {{ question.question }}
            </button>
            {% endfor %}
        </div>
    </div>

    <!-- Chat Input -->
    <div class="p-4 bg-white border-t">
        <form id="message-form" class="flex space-x-2">
            {% csrf_token %}
            <button type="button" class="p-2 border rounded-lg hover:bg-gray-50">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
                </svg>
            </button>
            {{ form.content }}
            <button type="submit" class="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
            </button>
        </form>
    </div>
</div>

<script>
document.getElementById('message-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const content = document.querySelector('[name="content"]').value;
    if (!content.trim()) return;

    try {
        const response = await fetch('{% url "emergency_app:send_message" %}', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content })
        });

        if (response.ok) {
            const data = await response.json();
            appendMessage(data.message);
            document.querySelector('[name="content"]').value = '';
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
});

function appendMessage(message) {
    const container = document.getElementById('messages-container');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'flex justify-end';
    messageDiv.innerHTML = `
        <div class="rounded-lg p-3 bg-blue-600 text-white max-w-[80%]">
            ${message.content}
        </div>
    `;
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

function sendQuickQuestion(question) {
    document.querySelector('[name="content"]').value = question;
    document.getElementById('message-form').dispatchEvent(new Event('submit'));
}
</script>
{% endblock %}
