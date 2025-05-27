"""djangoproj URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from djangoapp import views  # Import custom views from djangoapp

urlpatterns = [
    path('admin/', admin.site.urls),
    path('djangoapp/', include('djangoapp.urls')),
    path('about/', views.about_view, name='about'),
    path('', views.home_view, name='home'),
    path('contact/', views.contact_view, name='contact'),
    path('login/', TemplateView.as_view(template_name="index.html"), name='login'),
    path('register/', TemplateView.as_view(template_name="index.html"), name='register'),
    path('logout/', TemplateView.as_view(template_name="index.html"), name='logout'),
    path('dealers/', TemplateView.as_view(template_name="index.html"), name='dealers'),
    path('dealer/<int:dealer_id>/', TemplateView.as_view(template_name="index.html"), name='dealer_detail'),
    path('postreview/<int:dealer_id>/', TemplateView.as_view(template_name="index.html"), name='post_review'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)  