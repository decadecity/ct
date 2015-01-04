from datetime import datetime

from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

from .utils import _amount_at_time

class Record(models.Model):
    time = models.DateTimeField(default=datetime.now)
    description = models.CharField(max_length=255)
    caffeine = models.PositiveIntegerField()
    user = models.ForeignKey(User, related_name='records')

    def __str__(self):
        return '%s [%s]' % (self.description, self.caffeine)

    class Meta:
        ordering = ['-time']

    def caffeine_remaining(self):
        return _amount_at_time(self.caffeine, self.time.timestamp(), datetime.now().timestamp())


class Item(models.Model):
    description = models.CharField(unique=True, max_length=255)
    caffeine = models.PositiveIntegerField()
    added = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, related_name='items')

    def __str__(self):
        return '%s [%s]' % (self.description, self.caffeine)

    class Meta:
        ordering = ['-added']


class UsersRecentItem(models.Model):
    user = models.ForeignKey(User, related_name='recent_items')
    item = models.ForeignKey(Item, related_name='recent_items')
    time = models.DateTimeField(default=datetime.now)
    count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return '%s [%s]' % (self.item.description, self.user.first_name)

    class Meta:
        ordering = ['-time']
        unique_together = ('item', 'user')


@receiver(post_save, sender=Record)
def log_items(sender, **kwargs):
    record = kwargs.get('instance')
    try:
        item = Item.objects.get(description=record.description)
    except Item.DoesNotExist:
        item = Item(
            description=record.description,
            caffeine=record.caffeine,
            created_by=record.user,
        )
        item.save()
    recent, new = UsersRecentItem.objects.get_or_create(
        user=record.user,
        item=item,
    )
    recent.time = record.time
    recent.count += 1
    recent.save()


class Event(models.Model):
    time = models.DateTimeField(default=datetime.now)
    description = models.CharField(max_length=255)
    user = models.ForeignKey(User, related_name='events')

    def __str__(self):
        return '%s' % (self.description)

    class Meta:
        ordering = ['-time']
