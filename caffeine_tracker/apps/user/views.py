from django.shortcuts import render
from django.contrib.auth import logout as logout_user

from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse

from caffeine_tracker.lib.utils import HttpResponseGetAfterPost

@login_required
def logout(request):
    logout_user(request)
    return HttpResponseGetAfterPost(reverse('login'))
