from datetime import datetime

from django.test import Client, TestCase

from caffeine_tracker.apps.data.models import Record, Item

"""
c = Client()
response = c.post('/login/', {'username': 'john', 'password': 'smith'})

c = Client()
c.login(username='fred', password='secret')
"""

from django.contrib.auth.models import User

class RecordTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='test', email='test@example.com', password='password')
        self.timestamp = datetime.now()
        self.description = 'Cup of coffee'
        self.caffeine = 100

    def test_record_item(self):
        c = Client()
        c.login(username='test', password='password')
        response = c.post('/record/item', {
            'time': self.timestamp,
            'description': self.description,
            'caffeine': self.caffeine,
        })
        self.assertEqual(response.status_code, 303)
        record = Record.objects.get(pk=1)
        self.assertEqual(record.time, self.timestamp)
        self.assertEqual(record.caffeine, self.caffeine)
        self.assertEqual(record.description, self.description)

    def test_edit_item(self):
        timestamp = datetime.now()
        description = 'Coke'
        caffeine = 50
        c = Client()
        c.login(username='test', password='password')
        response = c.post('/record/item', {
            'time': self.timestamp,
            'description': self.description,
            'caffeine': self.caffeine,
        })

        response = c.post('/edit/item?id=1', {
            'time': timestamp,
            'description': description,
            'caffeine': caffeine,
        })
        self.assertEqual(response.status_code, 303)
        record = Record.objects.get(pk=1)
        self.assertEqual(record.time, timestamp)
        self.assertEqual(record.caffeine, caffeine)
        self.assertEqual(record.description, description)

        response = c.post('/edit/item?id=2', {
            'time': timestamp,
            'description': description,
            'caffeine': caffeine,
        })
        self.assertEqual(response.status_code, 404)

    def test_delete_item(self):
        c = Client()
        c.login(username='test', password='password')
        response = c.post('/record/item', {
            'time': self.timestamp,
            'description': self.description,
            'caffeine': self.caffeine,
        })
        record = Record.objects.get(pk=1)

        response = c.post('/delete/item?id=1')
        self.assertEqual(response.status_code, 303)
        #??? self.assertRaises(Record.DoesNotExist, Record.objects.get(pk=1))
