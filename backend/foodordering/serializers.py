from rest_framework import serializers
from .models import *


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'category_name', 'creation_date']

    
class FoodSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source = 'category.category_name', read_only = True)
    image = serializers.ImageField(required = False)
    class Meta:
        model = Food
        fields = ['id', 'category','category_name', 'item_name', 'item_price', 'item_description', 'item_quantity', 'image', 'is_available']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'mobile', 'password', 'reg_date']
        extra_kwargs = {'password': {'write_only': True}}


class OrderItemSerializer(serializers.ModelSerializer):
    food_name = serializers.CharField(source='food.item_name', read_only=True)
    food_image = serializers.ImageField(source='food.image', read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'food', 'food_name', 'food_image', 'quantity', 'price']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'customer_name', 'customer_phone', 'customer_email', 
                  'delivery_address', 'total_amount', 'status', 'order_date', 
                  'special_instructions', 'items']