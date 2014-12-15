from datetime import datetime

from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Record(models.Model):
    time = models.DateTimeField(default=datetime.now)
    description = models.CharField(max_length=255)
    caffeine = models.PositiveIntegerField()
    user = models.ForeignKey(User, related_name='records')
    #User.record_set.all()

    def __str__(self):
        return '%s (%s)' % (self.description, self.caffeine)


class Item(models.Model):
    description = models.CharField(unique=True, max_length=255)
    caffeine = models.PositiveIntegerField()
    added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '%s (%s)' % (self.description, self.caffeine)


@receiver(post_save, sender=Record)
def log_items(sender, **kwargs):
    record = kwargs.get('instance')
    try:
        item = Item.objects.get(description=record.description)
    except Item.DoesNotExist:
        item = Item(
            description=record.description,
            caffeine=record.caffeine,
        )
        item.save()
