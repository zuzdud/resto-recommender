from django.urls import path
from .views import get_restaurants


urlpatterns = [
    path('allrestaurants', get_restaurants)
]
