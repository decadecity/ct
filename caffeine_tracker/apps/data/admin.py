from django.contrib import admin

from .models import Record, Item, UsersRecentItem

admin.site.register(Record)
admin.site.register(Item)
admin.site.register(UsersRecentItem)
