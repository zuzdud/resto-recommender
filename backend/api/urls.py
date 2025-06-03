from django.urls import path
from django.views.generic import TemplateView

from .views import get_restaurants, ClientsListView, FavoritesListView, LoginAttemptsListView, PreferencesListView, \
    RatingsListView, RestaurantsListView, api_root

urlpatterns = [
    path('',api_root),
    # path('', TemplateView.as_view(template_name="index.html")),
    path('allrestaurants/', get_restaurants),
    path('clients', ClientsListView.as_view()),
    path('favorites', FavoritesListView.as_view()),
    path('loginattempts', LoginAttemptsListView.as_view()),
    path('preferences', PreferencesListView.as_view()),
    path('ratings', RatingsListView.as_view()),
    path('restaurants', RestaurantsListView.as_view()),
    path('restaurants/top-rated/', RestaurantsListView.as_view()),
    path('restaurants/recent/', RestaurantsListView.as_view()),
    path('restaurants/cuisine/<str:cuisine>/', RestaurantsListView.as_view())
]
