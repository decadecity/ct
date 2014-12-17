from django.core.urlresolvers import reverse

from caffeine_tracker.lib.utils import HttpResponseTemporaryRedirect

def home(request):
    if request.user.is_authenticated:
        return HttpResponseTemporaryRedirect(reverse('add_record'))
    else:
        return HttpResponseTemporaryRedirect(reverse('login'))
