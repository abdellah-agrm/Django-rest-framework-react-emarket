from rest_framework import serializers
from .models import Product, Review

class ProductSerializer(serializers.ModelSerializer):
  reviews = serializers.SerializerMethodField(method_name='get_reviews', read_only=True)

  class Meta:
    model = Product
    fields = "__all__" # To Send all fields
    # fields = ('name', 'price', 'brand', 'stock') # To send specific fields

  def get_reviews(self, obj):
    reviews = obj.reviews.all()
    serializer = ReviewSerializer(reviews, many=True)
    return serializer.data


class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Review
        fields = "__all__"  # To send all fields, including user_name


