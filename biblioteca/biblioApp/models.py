from django.db import models
from django.contrib.auth.models import User

class Role(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    date_of_birth = models.DateField()
    center = models.CharField(max_length=100)
    cycle = models.CharField(max_length=100)
    image = models.ImageField(upload_to='user_images/', blank=True, null=True)

    def __str__(self):
        return self.user.username

class GlobalOption(models.Model):
    option_name = models.CharField(max_length=100)
    option_value = models.CharField(max_length=255)

    def __str__(self):
        return self.option_name

class ItemType(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Catalog(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

class CatalogItem(models.Model):
    catalog = models.ForeignKey(Catalog, on_delete=models.CASCADE)
    item_type = models.ForeignKey(ItemType, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    publication_year = models.PositiveIntegerField()
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return self.title

class ItemCopy(models.Model):
    catalog_item = models.ForeignKey(CatalogItem, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, default='Available')

class Reservation(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    copy = models.ForeignKey(ItemCopy, on_delete=models.CASCADE)
    reservation_date = models.DateField(auto_now_add=True)

class Loan(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    copy = models.ForeignKey(ItemCopy, on_delete=models.CASCADE)
    loan_date = models.DateField(auto_now_add=True)
    return_date = models.DateField(null=True, blank=True)

class Request(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    request_date = models.DateField(auto_now_add=True)
    request_text = models.TextField()

class Log(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    action_date = models.DateTimeField(auto_now_add=True)
    action_description = models.TextField()




