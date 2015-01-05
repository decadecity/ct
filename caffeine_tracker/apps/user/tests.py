from django.test import Client, TestCase

from django.contrib.auth.models import User

class RecordTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='test', email='test@example.com', password='password')

    def test_logout(self):
        c = Client()
        c.login(username='test', password='password')
        response = c.get('/record/item')
        self.assertEqual(response.status_code, 200)
        c.get('/accounts/logout/')
        response = c.get('/')
        #self.assertEqual(response.status_code, 307)
        self.assertEqual(response['Location'], 'http://testserver/')
