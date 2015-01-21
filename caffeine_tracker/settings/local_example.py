print('local settings enabled')

DEBUG = True

UID_SALT = ''

CACHES = {}

CACHES['default'] = {
    'BACKEND': 'django.core.cache.backends.dummy.DummyCache',
}

INLINE_CSS = False

SESSION_COOKIE_SECURE = False
