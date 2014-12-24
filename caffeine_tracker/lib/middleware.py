from hashlib import md5

from django.conf import settings

head_css = ''

def get_head_css():
    global head_css
    if settings.DEBUG:
        base_path = settings.STATICFILES_DIRS[0]
    else:
        base_path = settings.STATIC_ROOT
    if not head_css or settings.DEBUG:
        try:
            filename = '%s/css/head.min.css' % (base_path)
            with open(filename) as f:
                head_css = f.read()
                return head_css
        except (OSError, IOError):
            return '/* File: %s not found. */' % (filename)
    else:
        return head_css

class AddVariablesMiddleware():

    def process_request(self, request):
        # Add all these into an object for use.
        try:
            timeout = settings.CACHES['default']['TIMEOUT']
        except KeyError:
            timeout = 0
        request.extra = {
            'CACHE_BUSTER': settings.CACHE_BUSTER,
            'CACHE_TIMEOUT': timeout,
            'DEBUG': settings.DEBUG,
            'HEAD_CSS':  get_head_css(),
            'INLINE_CSS': settings.INLINE_CSS,
            'OFFLINE': settings.OFFLINE,
        }
        if request.user.is_authenticated:
            request.extra['UID'] = md5(('%s:%s' % (settings.UID_SALT, request.user.pk)).encode('utf-8')).hexdigest()
        return None
