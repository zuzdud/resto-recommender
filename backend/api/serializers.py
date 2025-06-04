from rest_framework import serializers

from .models import Restaurants, Clients, Favorites, LoginAttempts, Preferences, Ratings


class RestaurantSerializer(serializers.Serializer):
    id = serializers.CharField(source="place_id")
    name = serializers.CharField()
    rating = serializers.FloatField()
    address = serializers.CharField(source="vicinity")
    latitude = serializers.FloatField(source="geometry.location.lat")
    longitude = serializers.FloatField(source="geometry.location.lng")
    type = serializers.ListField(
        child=serializers.CharField(), required=False)  # For cuisine types
    reviews = serializers.ListField(
        child=serializers.DictField(), required=False)  # Reviews
    opening_hours = serializers.ListField(
        child=serializers.CharField(), required=False)  # Opening hours

    # Dodaj pola dla kompatybilności z frontendem
    average_rating = serializers.SerializerMethodField()
    review_count = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()
    cuisine = serializers.SerializerMethodField()

    def get_average_rating(self, obj):
        """Mapuj rating na average_rating"""
        return obj.get('rating', 0)

    def get_review_count(self, obj):
        """Policz liczbę recenzji z array reviews"""
        reviews = obj.get('reviews', [])
        return len(reviews) if reviews else 0

    def get_image_url(self, obj):
        """Zwróć placeholder image (Google Places nie zwraca bezpośrednio zdjęć)"""
        return None

    def get_cuisine(self, obj):
        """Wyciągnij typ kuchni z types"""
        types = obj.get('type', [])
        if not types:
            return 'restaurant'

        # Mapowanie typów Google Places na czytelne nazwy
        cuisine_mapping = {
            'restaurant': 'restauracja',
            'food': 'jedzenie',
            'meal_takeaway': 'na wynos',
            'cafe': 'kawiarnia',
            'bakery': 'piekarnia',
            'bar': 'bar',
            'night_club': 'klub nocny'
        }

        for type_name in types:
            if type_name in cuisine_mapping:
                return cuisine_mapping[type_name]

        return types[0] if types else 'restauracja'


class ClientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clients
        fields = '__all__'


class FavoritesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorites
        fields = '__all__'


class LoginAttemptsSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoginAttempts
        fields = '__all__'


class PreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preferences
        fields = '__all__'


class RatingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ratings
        fields = '__all__'


class RestaurantsSerializer(serializers.ModelSerializer):
    # Mapowanie pól z modelu na to czego oczekuje frontend
    image_url = serializers.CharField(source='image', allow_null=True, required=False)
    average_rating = serializers.FloatField(source='rest_ratings', default=0.0)  # Zmieniono na 'rest_ratings'
    review_count = serializers.IntegerField(source='num_ratings', default=0)

    class Meta:
        model = Restaurants
        fields = [
            'id', 'name', 'address', 'cuisine', 'latitude', 'longitude',
            'image_url', 'average_rating', 'review_count', 'external_url'
        ]

    def get_review_count(self, obj):
        """Liczy ilość recenzji dla tej restauracji"""
        try:
            # Używamy related_name 'restaurant_ratings'
            return obj.restaurant_ratings.count()
        except:
            # Jeśli nie ma połączenia, zwróć 0
            return 0
