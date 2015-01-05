from django.test import Client, TestCase

from django.contrib.auth.models import User

class RecordTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='test', email='test@example.com', password='password')

    def test_logout(self):
        c = Client()
        c.login(username='test', password='password')
        self.assertIn('_auth_user_id', c.session)
        c.get('/logout')
        response = c.get('/record/item')
        self.assertNotIn('_auth_user_id', c.session)
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response['Location'], 'http://testserver/login?next=/record/item')

    def test_profile(self):
        c = Client()
        c.login(username='test', password='password')
        response = c.get('/profile')
        self.assertEqual(response.status_code, 200)

    def test_register(self):
        c = Client()
        response = c.get('/start')
        self.assertEqual(response.status_code, 200)
        response = c.post('/start', {
            'username': 'test1',
            'password1': 'password',
            'password2': 'password',
        })
        try:
            user = User.objects.get(username='test1')
        except:
            user = User()
            self.fail('User was not created.')
        self.assertEqual(user.first_name, 'test1')
        self.assertIn('_auth_user_id', c.session)

        c = Client()
        c.login(username='test', password='password')
        response = c.get('/start')
        self.assertEqual(response.status_code, 307)
