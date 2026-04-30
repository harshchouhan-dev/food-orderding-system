from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.db.models import Sum, Count
from .models import *
from .serializers import *

# Create your views here.


# ===================== ADMIN AUTH =====================

@api_view(['POST'])
def admin_login_api(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(request, username=username, password=password)

    if user is not None and user.is_staff:
        AdminLoginLog.objects.create(username=username)

        return Response({
            "message": "Admin login successful",
            "username": username
        }, status=200)

    return Response({
        "message": "Invalid credentials or not an admin"
    }, status=401)


@api_view(['POST'])
def admin_logout_api(request):
    logout(request)
    return Response({
        'message': 'Logged out succesfully'
    })


# ===================== CATEGORY CRUD =====================

@api_view(['POST'])
def add_category(request):
    category_name = request.data.get('category_name')

    Category.objects.create(category_name=category_name)
    return Response({
        "message": "Category has been created successfully"
    }, status=201)


@api_view(['GET'])
def list_catgories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
def delete_category(request, pk):
    try:
        category = Category.objects.get(id=pk)
        category.delete()
        return Response({"message": "Category deleted successfully"}, status=200)
    except Category.DoesNotExist:
        return Response({"message": "Category not found"}, status=404)


@api_view(['PUT'])
def update_category(request, pk):
    try:
        category = Category.objects.get(id=pk)
        category.category_name = request.data.get('category_name', category.category_name)
        category.save()
        return Response({"message": "Category updated successfully"}, status=200)
    except Category.DoesNotExist:
        return Response({"message": "Category not found"}, status=404)


# ===================== FOOD CRUD =====================

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def add_food_item(request):
    serializer = FoodSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Food Item has been added"}, status=201)

    return Response({"message": "Something went wrong", "errors": serializer.errors}, status=400)


@api_view(['GET'])
def list_food_item(request):
    food = Food.objects.all()
    serializer = FoodSerializer(food, many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
def delete_food_item(request, pk):
    try:
        food = Food.objects.get(id=pk)
        food.delete()
        return Response({"message": "Food item deleted successfully"}, status=200)
    except Food.DoesNotExist:
        return Response({"message": "Food item not found"}, status=404)


@api_view(['PUT'])
@parser_classes([MultiPartParser, FormParser])
def update_food_item(request, pk):
    try:
        food = Food.objects.get(id=pk)
        serializer = FoodSerializer(food, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Food item updated successfully"}, status=200)
        return Response({"message": "Validation failed", "errors": serializer.errors}, status=400)
    except Food.DoesNotExist:
        return Response({"message": "Food item not found"}, status=404)


# ===================== USER AUTH =====================

@api_view(['POST'])
def user_register(request):
    try:
        User.objects.create(
            first_name=request.data.get('first_name'),
            last_name=request.data.get('last_name'),
            email=request.data.get('email'),
            mobile=request.data.get('mobile'),
            password=request.data.get('password'),
        )
        return Response({"message": "Registration successful"}, status=201)
    except Exception as e:
        return Response({"message": str(e)}, status=400)


@api_view(['POST'])
def user_login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user = User.objects.get(email=email, password=password)
        serializer = UserSerializer(user)
        return Response({
            "message": "Login successful",
            "user": serializer.data
        }, status=200)
    except User.DoesNotExist:
        return Response({"message": "Invalid email or password"}, status=401)


# ===================== ORDERS =====================

@api_view(['POST'])
def place_order(request):
    try:
        order = Order.objects.create(
            customer_name=request.data.get('customer_name'),
            customer_phone=request.data.get('customer_phone'),
            customer_email=request.data.get('customer_email', ''),
            delivery_address=request.data.get('delivery_address'),
            total_amount=request.data.get('total_amount'),
            special_instructions=request.data.get('special_instructions', ''),
        )

        items = request.data.get('items', [])
        for item in items:
            OrderItem.objects.create(
                order=order,
                food_id=item['food_id'],
                quantity=item['quantity'],
                price=item['price'],
            )

        return Response({
            "message": "Order placed successfully!",
            "order_id": order.id
        }, status=201)
    except Exception as e:
        return Response({"message": str(e)}, status=400)


@api_view(['GET'])
def list_orders(request):
    status_filter = request.GET.get('status', None)
    if status_filter and status_filter != 'all':
        orders = Order.objects.filter(status=status_filter)
    else:
        orders = Order.objects.all()

    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
def update_order_status(request, pk):
    try:
        order = Order.objects.get(id=pk)
        new_status = request.data.get('status')
        order.status = new_status
        order.save()
        return Response({"message": f"Order status updated to {new_status}"}, status=200)
    except Order.DoesNotExist:
        return Response({"message": "Order not found"}, status=404)


@api_view(['DELETE'])
def delete_order(request, pk):
    try:
        order = Order.objects.get(id=pk)
        order.delete()
        return Response({"message": "Order deleted successfully"}, status=200)
    except Order.DoesNotExist:
        return Response({"message": "Order not found"}, status=404)


# ===================== DASHBOARD STATS =====================

@api_view(['GET'])
def dashboard_stats(request):
    total_categories = Category.objects.count()
    total_food_items = Food.objects.count()
    total_orders = Order.objects.count()
    total_revenue = Order.objects.filter(status='delivered').aggregate(Sum('total_amount'))['total_amount__sum'] or 0
    pending_orders = Order.objects.filter(status='not_confirmed').count()
    total_users = User.objects.count()

    recent_orders = Order.objects.all()[:5]
    recent_serializer = OrderSerializer(recent_orders, many=True)

    return Response({
        'total_categories': total_categories,
        'total_food_items': total_food_items,
        'total_orders': total_orders,
        'total_revenue': float(total_revenue),
        'pending_orders': pending_orders,
        'total_users': total_users,
        'recent_orders': recent_serializer.data,
    })
