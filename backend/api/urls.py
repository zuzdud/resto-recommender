from django.urls import path
from django.views.generic import TemplateView

from .views import get_restaurants, ClientsListView, FavoritesListView, LoginAttemptsListView, PreferencesListView, \
    RatingsListView, RestaurantsListView, api_root, RecentRestaurantsView, \
    TopRatedRestaurantsDBView, RestaurantByCuisineDBView, TopRatedRestaurantsAPIView, \
    RestaurantByCuisineAPIView

urlpatterns = [
    path('',api_root),
    # path('', TemplateView.as_view(template_name="index.html")),
    path('allrestaurants/', get_restaurants),
    path('clients', ClientsListView.as_view()),
    path('favorites', FavoritesListView.as_view()),
    path('loginattempts', LoginAttemptsListView.as_view()),
    path('preferences', PreferencesListView.as_view()),
    path('ratings', RatingsListView.as_view()),
    path('restaurants/', RestaurantsListView.as_view(), name='restaurant-list'),

    # Restauracje z lokalnej bazy danych
    path('restaurants/', RestaurantsListView.as_view(), name='restaurant-list'),
    path('restaurants/db/top-rated/', TopRatedRestaurantsDBView.as_view(), name='top-rated-db'),
    path('restaurants/db/recent/', RecentRestaurantsView.as_view(), name='recent-db'),
    path('restaurants/db/cuisine/<str:cuisine>/', RestaurantByCuisineDBView.as_view(), name='by-cuisine-db'),

    # Restauracje z Google Places API
    path('restaurants/api/top-rated/', TopRatedRestaurantsAPIView.as_view(), name='top-rated-api'),
    path('restaurants/api/cuisine/<str:cuisine>/', RestaurantByCuisineAPIView.as_view(), name='by-cuisine-api'),
]
