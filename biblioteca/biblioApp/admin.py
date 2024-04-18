from django.contrib import admin
from .models import *

admin.site.register(Role)
admin.site.register(UserProfile)
admin.site.register(GlobalOption)
admin.site.register(ItemType)
admin.site.register(Catalog)
admin.site.register(CatalogItem)
admin.site.register(ItemCopy)
admin.site.register(Reservation)
admin.site.register(Loan)
admin.site.register(Request)
admin.site.register(Log)
