from datetime import datetime

from django.test import TestCase
from django.contrib.auth.models import User

from .models import Record, Item, UsersRecentItem

class RecieverTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='test', email='test@example.com', password='password')
        self.timestamp = datetime.now()
        self.description = 'Cup of coffee'
        self.caffeine = 100

    def test_record_item(self):
        """Check that when a record is created the trigger """
        record = Record(
            time=self.timestamp,
            description=self.description,
            caffeine=self.caffeine,
            user=self.user,
        )
        record.save()
        item = Item.objects.get(description=record.description)
        recent = UsersRecentItem.objects.get(
            user=record.user,
            item=item,
        )

        self.assertEqual(recent.count, 1)
