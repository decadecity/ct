from django.conf import settings

head_css = ''

def get_head_css():
    global head_css
    if settings.DEBUG:
        try:
            base_path = settings.STATICFILES_DIRS[0]
        except IndexError:
            base_path = ''
    else:
        base_path = settings.STATIC_ROOT
    if not head_css or settings.DEBUG:
        try:
            filename = '%s/css/head.css' % (base_path)
            with open(filename) as f:
                head_css = f.read()
                return head_css
        except FileNotFoundError:
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
            'HEAD_CSS':  get_head_css(),
            'INLINE_CSS': settings.INLINE_CSS,
            'OFFLINE': settings.OFFLINE,
        }
        return None