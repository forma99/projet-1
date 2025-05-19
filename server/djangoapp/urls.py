# Uncomment the imports before you add the code
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from . import views

app_name = 'djangoapp'
urlpatterns = [
  # Liste de tous les dealers, ou filtrée par état
    path('get_dealers/', views.get_dealerships, name='get_dealers'),
    path('get_dealers/<str:state>/', views.get_dealerships, name='get_dealers_by_state'),

    # Détail d’un dealer
    path('dealer/<int:dealer_id>/', views.get_dealer_details, name='dealer_details'),

    # Reviews d’un dealer
    path('reviews/dealer/<int:dealer_id>/', views.get_dealer_reviews, name='dealer_reviews'),

    # Poster un review
    path('postreview/<int:dealer_id>/', views.add_review, name='add_review'),

    # Autres endpoints
    path('get_cars/', views.get_cars, name='get_cars'),
    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_request, name='logout'),
    path('registration/', views.registration, name='registration'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
