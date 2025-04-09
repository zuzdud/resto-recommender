from django.urls import path

from .views import get_restaurants, ClientsListView, FavoritesListView, LoginAttemptsListView, PreferencesListView, RatingsListView, RestaurantsListView

urlpatterns = [
    path('allrestaurants', get_restaurants),
    path('clients', ClientsListView.as_view()),
    path('favorites', FavoritesListView.as_view()),
    path('loginattempts', LoginAttemptsListView.as_view()),
    path('preferences', PreferencesListView.as_view()),
    path('ratings', RatingsListView.as_view()),
    path('restaurants', RestaurantsListView.as_view())
]
