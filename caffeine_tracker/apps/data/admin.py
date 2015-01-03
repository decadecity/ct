from django.contrib import admin

from .models import Event, Record, Item, UsersRecentItem

admin.site.register(Event)
admin.site.register(Record)
admin.site.register(Item)
admin.site.register(UsersRecentItem)
