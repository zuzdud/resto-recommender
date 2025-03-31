from django.http import JsonResponse
import requests
import time

from backend import settings
from .serializers import RestaurantSerializer


def get_restaurants(request):
    google_places_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    place_details_url = "https://maps.googleapis.com/maps/api/place/details/json"
    location = request.GET.get("location", "51.1079,17.0385")  # Default: WRO
    radius = request.GET.get("radius", "7000")  # 7km search radius

    api_key = settings.GOOGLE_MAPS_API_KEY
    only_restaurants = []
    exclude_types = {"hotel", "spa", "gym", "lodging",
                     "supermarket", "gas_station"}  # Types to exclude
    place_types = {"restaurant", "food", "meal_takeway", "cafe"}
    all_places = []

    for place_type in place_types:
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

                only_restaurants.extend(filtered_restaurants)
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
