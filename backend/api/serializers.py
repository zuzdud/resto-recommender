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
    class Meta:
        model = Restaurants
        fields = '__all__'
