from rest_framework import serializers

# class RestaurantSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Restaurant
#         fields = '__all__'

class RestaurantSerializer(serializers.Serializer):
    id = serializers.CharField(source="place_id")
    name = serializers.CharField()
    rating = serializers.FloatField()
    address = serializers.CharField(source="vicinity")
    latitude = serializers.FloatField(source="geometry.location.lat")
    longitude = serializers.FloatField(source="geometry.location.lng")
    type = serializers.ListField(child=serializers.CharField(), required=False)  # For cuisine types
    reviews = serializers.ListField(child=serializers.DictField(), required=False)  # Reviews
    opening_hours = serializers.ListField(child=serializers.CharField(), required=False)  # Opening hours