import time

import requests
from django.http import JsonResponse
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response

from backend import settings
from .serializers import RestaurantSerializer, ClientsSerializer, FavoritesSerializer, LoginAttemptsSerializer, PreferencesSerializer, RatingsSerializer, RestaurantsSerializer
from .models import *

def api_root(request):
    return JsonResponse({
        "endpoints": [
            "/api/clients/",
            "/api/favorites/",
            "/api/ratings/",
            "/api/preferences/",
            "/api/restaurants/",
            "/api/allrestaurants/",
            "--- Google Places API ---",
            "/api/restaurants/api/top-rated/",
            "/api/restaurants/api/cuisine/<cuisine>/",
            "--- Local Database ---",
            "/api/restaurants/db/top-rated/",
            "/api/restaurants/db/recent/",
            "/api/restaurants/db/cuisine/<cuisine>/",
        ]
    })

def get_restaurants(request):
    google_places_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    place_details_url = "https://maps.googleapis.com/maps/api/place/details/json"
    location = request.GET.get("location", "51.1079,17.0385")  # Default: WRO
    radius = request.GET.get("radius", "500")  # 7km search radius

    api_key = settings.GOOGLE_MAPS_API_KEY
    only_restaurants = []
    exclude_types = {"hotel", "spa", "gym", "lodging",
                     "supermarket", "gas_station"}  # Types to exclude
    place_types = {"restaurant", "food", "meal_takeway", "cafe"}
    all_places = []
    MAX_RESULTS=5       # TO USUNĄĆ EWENTUALNIE

    for place_type in place_types:
        if len(only_restaurants) >= MAX_RESULTS:  # Stop if we have enough results
            break

        next_page_token = request.GET.get("pagetoken")
        while True:
            params = {
                "location": location,
                "radius": radius,
                "type": place_type,
                "key": api_key,
            }

            if next_page_token:
                params["pagetoken"] = next_page_token  # Request next page
                time.sleep(2)

            response = requests.get(google_places_url, params=params)
            data = response.json()  # Get full response

            if isinstance(data, dict):  # Ensure data is a dictionary
                # Extract list of restaurants
                places = data.get("results", [])
                filtered_restaurants = [
                    restaurant for restaurant in places
                    if any(type in place_types for type in restaurant.get("types", []))
                       and not any(type in exclude_types for type in restaurant.get("types", []))
                ]

                # Add restaurants but limit to max_results
                remaining_slots = MAX_RESULTS - len(only_restaurants)
                only_restaurants.extend(filtered_restaurants[:remaining_slots])

                # Stop if we have enough results
                if len(only_restaurants) >= MAX_RESULTS:
                    break

                # Get next page token safely
                next_page_token = data.get("next_page_token", None)

                if not next_page_token:  # If no more pages, stop fetching
                    break
            else:
                break

    detailed_restaurants = []
    for restaurant in only_restaurants:
        place_id = restaurant.get("place_id")
        if place_id:
            # Fetch place details
            place_details_params = {
                "place_id": place_id,
                "key": api_key,
            }
            place_details_response = requests.get(
                place_details_url, params=place_details_params)
            place_details_data = place_details_response.json()

            if place_details_data.get("status") == "OK":
                place_details = place_details_data.get("result", {})

                # You can extract the following information:
                restaurant["type"] = place_details.get("types", [])
                restaurant["reviews"] = place_details.get("reviews", [])
                restaurant["rating"] = place_details.get("rating")
                restaurant["opening_hours"] = place_details.get(
                    "opening_hours", {}).get("weekday_text", [])

                detailed_restaurants.append(restaurant)

        time.sleep(1)

    serialized_data = RestaurantSerializer(
        detailed_restaurants, many=True).data
    return JsonResponse(serialized_data, safe=False)

# ============ BASIC VIEWS ============

class ClientsListView(generics.ListAPIView):
    queryset = Clients.objects.all()
    serializer_class = ClientsSerializer

class FavoritesListView(generics.ListAPIView):
    queryset = Favorites.objects.all()
    serializer_class = FavoritesSerializer

class LoginAttemptsListView(generics.ListAPIView):
    queryset = LoginAttempts.objects.all()
    serializer_class = LoginAttemptsSerializer

class PreferencesListView(generics.ListAPIView):
    queryset = Preferences.objects.all()
    serializer_class = PreferencesSerializer

class RatingsListView(generics.ListAPIView):
    queryset = Ratings.objects.all()
    serializer_class = RatingsSerializer

class RestaurantsListView(generics.ListAPIView):
    queryset = Restaurants.objects.all()
    serializer_class = RestaurantsSerializer

# ============ BAZA DANYCH VIEWS ============

class TopRatedRestaurantsDBView(generics.ListAPIView):
    """Pobiera najlepiej oceniane restauracje z lokalnej bazy danych"""
    serializer_class = RestaurantsSerializer

    def get_queryset(self):
        # Inteligentne sortowanie: wysoka ocena + wystarczająca liczba recenzji
        return Restaurants.objects.filter(
            rest_ratings__gte=3.5,  # Minimalna ocena 3.5
            num_ratings__gte=1      # Minimum 1 recenzja
        ).extra(
            # Sortowanie według "ważonej oceny" - lepiej ocenione + więcej recenzji
            select={
                'weighted_score': 'rest_ratings * LOG(num_ratings + 1)'
            }
        ).order_by('-weighted_score')[:10]

class RestaurantByCuisineDBView(generics.ListAPIView):
    """Pobiera restauracje określonej kuchni z lokalnej bazy danych"""
    serializer_class = RestaurantsSerializer

    def get_queryset(self):
        cuisine = self.kwargs['cuisine']
        return Restaurants.objects.filter(
            cuisine__icontains=cuisine
        ).order_by('-rest_ratings', '-num_ratings')[:15]

class RecentRestaurantsView(generics.ListAPIView):
    """Pobiera najnowsze restauracje z lokalnej bazy danych"""
    serializer_class = RestaurantsSerializer

    def get_queryset(self):
        return Restaurants.objects.all().order_by('-id')[:10]

# ============ GOOGLE PLACES API VIEWS ============

# Pomocnicza funkcja do pobierania restauracji z Google Places
def fetch_restaurants_from_google_api(location="51.1079,17.0385", radius="5000", min_rating=None, cuisine_type=None, max_results=10):
    google_places_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    place_details_url = "https://maps.googleapis.com/maps/api/place/details/json"

    api_key = settings.GOOGLE_MAPS_API_KEY
    only_restaurants = []
    exclude_types = {"hotel", "spa", "gym", "lodging", "supermarket", "gas_station"}
    place_types = {"restaurant", "food", "meal_takeaway", "cafe"}

    for place_type in place_types:
        if len(only_restaurants) >= max_results:
            break

        params = {
            "location": location,
            "radius": radius,
            "type": place_type,
            "key": api_key,
        }

        # Jeśli szukamy określonej kuchni, dodaj keyword
        if cuisine_type:
            params["keyword"] = cuisine_type

        response = requests.get(google_places_url, params=params)
        data = response.json()

        if isinstance(data, dict):
            places = data.get("results", [])

            # Filtruj restauracje
            filtered_restaurants = []
            for restaurant in places:
                # Sprawdź typ miejsca
                if not any(type in place_types for type in restaurant.get("types", [])):
                    continue
                if any(type in exclude_types for type in restaurant.get("types", [])):
                    continue

                # Jeśli szukamy top-rated, sprawdź rating
                if min_rating and restaurant.get("rating", 0) < min_rating:
                    continue

                filtered_restaurants.append(restaurant)

            remaining_slots = max_results - len(only_restaurants)
            only_restaurants.extend(filtered_restaurants[:remaining_slots])

    # Pobierz szczegóły dla każdej restauracji
    detailed_restaurants = []
    for restaurant in only_restaurants:
        place_id = restaurant.get("place_id")
        if place_id:
            place_details_params = {
                "place_id": place_id,
                "key": api_key,
            }
            place_details_response = requests.get(place_details_url, params=place_details_params)
            place_details_data = place_details_response.json()

            if place_details_data.get("status") == "OK":
                place_details = place_details_data.get("result", {})
                restaurant["type"] = place_details.get("types", [])
                restaurant["reviews"] = place_details.get("reviews", [])
                restaurant["rating"] = place_details.get("rating")
                restaurant["opening_hours"] = place_details.get("opening_hours", {}).get("weekday_text", [])
                detailed_restaurants.append(restaurant)

            time.sleep(0.5)  # Żeby nie przekroczyć limitów API

    return detailed_restaurants

class TopRatedRestaurantsAPIView(APIView):
    """Pobiera najlepiej oceniane restauracje z Google Places API"""

    def get(self, request):
        location = request.GET.get("location", "51.1079,17.0385")  # Default: Wrocław
        radius = request.GET.get("radius", "5000")

        try:
            # Pobierz restauracje z oceną minimum 4.0
            restaurants = fetch_restaurants_from_google_api(
                location=location,
                radius=radius,
                min_rating=4.0,
                max_results=10
            )

            # Posortuj po ratingu malejąco
            restaurants.sort(key=lambda x: x.get('rating', 0), reverse=True)

            serialized_data = RestaurantSerializer(restaurants, many=True).data
            return Response(serialized_data)

        except Exception as e:
            return Response({"error": str(e)}, status=500)

class RestaurantByCuisineAPIView(APIView):
    """Pobiera restauracje określonej kuchni z Google Places API"""

    def get(self, request, cuisine):
        location = request.GET.get("location", "51.1079,17.0385")  # Default: Wrocław
        radius = request.GET.get("radius", "5000")

        # Mapowanie nazw kuchni z polskiego na angielski dla API
        cuisine_mapping = {
            'azjatycka': 'asian',
            'włoska': 'italian',
            'francuska': 'french',
            'indyjska': 'indian',
            'chińska': 'chinese',
            'japońska': 'japanese',
            'thai': 'thai',
            'meksykańska': 'mexican',
            'amerykańska': 'american',
            'polska': 'polish'
        }

        # Użyj mapowania lub przekaż oryginalną nazwę
        cuisine_keyword = cuisine_mapping.get(cuisine.lower(), cuisine)

        try:
            restaurants = fetch_restaurants_from_google_api(
                location=location,
                radius=radius,
                cuisine_type=cuisine_keyword,
                max_results=15
            )

            serialized_data = RestaurantSerializer(restaurants, many=True).data
            return Response(serialized_data)

        except Exception as e:
            return Response({"error": str(e)}, status=500)