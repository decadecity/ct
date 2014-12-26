from datetime import datetime, timedelta

from django.test import TestCase
from django.contrib.auth.models import User

from .models import Record, Item, UsersRecentItem
from .utils import _amount_at_time, current_caffeine

class RecieverTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='test', email='test@example.com', password='password')
        self.timestamp = datetime.now()
        self.description = 'Cup of coffee'
        self.caffeine = 100

    def test_record_item(self):
        """Check that when a record is created the trigger fires"""
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

class CurrentCaffeineTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='test', email='test@example.com', password='password')

    def test_current_caffeine(self):
        """Test the half life calculation."""
        # Inital state
        self.assertEqual(current_caffeine(self.user), 0, 'Initial state')
        # One half life
        time = datetime.now() - timedelta(hours=6)
        record = Record(
            time=time,
            description='Test item',
            caffeine=100,
            user=self.user
        )
        record.save()
        self.assertEqual(current_caffeine(self.user), 50, 'One half life')
        # One + two half lives
        time = datetime.now() - timedelta(hours=12)
        record = Record(
            time=time,
            description='Test item',
            caffeine=100,
            user=self.user
        )
        record.save()
        self.assertEqual(current_caffeine(self.user), 75, 'One + two half lives')

    def test_amount_at_time(self):
        """Test the half life calculation."""
        self.assertEqual(_amount_at_time(0, 0, 60 * 60 * 6), 0, 'No caffeine')
        self.assertEqual(_amount_at_time(100, 0, 60 * 60 * 6), 50, 'One half life')

