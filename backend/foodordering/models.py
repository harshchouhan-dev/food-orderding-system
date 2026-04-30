from django.db import models

# Create your models here.

class User(models.Model):
    first_name = models.CharField(max_length=150, unique=True)
    last_name = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    mobile = models.CharField(max_length=50)
    password = models.CharField(max_length=128)
    reg_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    

class Category(models.Model):
    category_name = models.CharField(max_length=100, unique=True)
    creation_date = models.DateField(auto_now_add=True)


    def __str__(self):
        return self.category_name


class Food(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    item_name = models.CharField(max_length=100, unique=True)
    item_price = models.DecimalField(max_digits=10, decimal_places=2)
    item_description = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to='food_images/')
    item_quantity = models.CharField(max_length=50)
    is_available = models.BooleanField(default=True)

    

    def __str__(self):
        return f"{self.item_name} - {self.item_quantity}"


class AdminLoginLog(models.Model):
    username = models.CharField(max_length=150)
    login_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.username} - {self.login_time}"


ORDER_STATUS_CHOICES = [
    ('not_confirmed', 'Not Confirmed'),
    ('confirmed', 'Confirmed'),
    ('preparing', 'Being Prepared'),
    ('pickup', 'Ready for Pickup'),
    ('delivered', 'Delivered'),
    ('cancelled', 'Cancelled'),
]

class Order(models.Model):
    customer_name = models.CharField(max_length=200)
    customer_phone = models.CharField(max_length=20)
    customer_email = models.EmailField(blank=True, null=True)
    delivery_address = models.TextField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=ORDER_STATUS_CHOICES, default='not_confirmed')
    order_date = models.DateTimeField(auto_now_add=True)
    special_instructions = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Order #{self.id} - {self.customer_name} - {self.status}"

    class Meta:
        ordering = ['-order_date']


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.food.item_name} x {self.quantity}"