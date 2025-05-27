from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView  # Import TemplateView
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
    path(
        'dealer/<int:dealer_id>/',
        TemplateView.as_view(template_name="index.html"),
        name='dealer_detail',
    ),
    path(
        'postreview/<int:dealer_id>/',
        TemplateView.as_view(template_name="index.html"),
        name='post_review',
    ),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)