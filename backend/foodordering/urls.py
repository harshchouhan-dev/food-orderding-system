from django.urls import path
from .views import *

urlpatterns = [
    # Admin auth
    path('admin-login/', admin_login_api),
    path('admin-logout/', admin_logout_api),

    # Categories
    path('add-category/', add_category),
    path('categories/', list_catgories),
    path('categories/<int:pk>/delete/', delete_category),
    path('categories/<int:pk>/update/', update_category),

    # Food items
    path('add-food-item/', add_food_item),
    path('foods/', list_food_item),
    path('foods/<int:pk>/delete/', delete_food_item),
    path('foods/<int:pk>/update/', update_food_item),

    # User auth
    path('register/', user_register),
    path('user-login/', user_login),

    # Orders
    path('place-order/', place_order),
    path('orders/', list_orders),
    path('orders/<int:pk>/status/', update_order_status),
    path('orders/<int:pk>/delete/', delete_order),

    # Dashboard
    path('dashboard-stats/', dashboard_stats),
]
