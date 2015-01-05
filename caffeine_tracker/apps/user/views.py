from django.contrib import messages
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout as logout_user
from django.contrib.auth.forms import PasswordChangeForm, UserChangeForm, UserCreationForm
from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse

from caffeine_tracker.lib.utils import HttpResponseGetAfterPost, HttpResponseTemporaryRedirect

@login_required
def logout(request):
    logout_user(request)
    return HttpResponseGetAfterPost(reverse('login'))

@login_required
def profile(request):
    password_form = PasswordChangeForm(request.user)
    user_form = UserChangeForm(instance=request.user)

    if request.method == 'POST':
        if request.GET.get('type', 'password'):
            password_form = PasswordChangeForm(request.user, request.POST)
            if not password_form.is_valid():
                messages.error(request, 'There was a problem changing the password.')
            else:
                messages.success(request, 'Password changed.')
                return HttpResponseGetAfterPost('%s' % (request.path))
        if request.GET.get('type', 'details'):
            user_form = PasswordChangeForm(request.POST, instance=request.user)
            if not user_form.is_valid():
                messages.error(request, 'There was a problem updating your details.')
            else:
                messages.success(request, 'Details updated.')
                return HttpResponseGetAfterPost('%s' % (request.path))

    context = {
        'password_form': password_form,
        'user_form': user_form
    }
    return render(request, 'user/profile.html', context)

def register(request):
    if request.user.is_authenticated():
        return HttpResponseTemporaryRedirect(reverse('home'))

    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if not form.is_valid():
            messages.error(request, 'There was a problem with the registration.')
        else:
            user = form.save(commit=False)
            user.first_name = user.username
            user.save()
            if user.is_active:
                user = authenticate(username=form.cleaned_data.get('username'), password=form.cleaned_data.get('password1'))
                login(request, user)
            return HttpResponseGetAfterPost(reverse('home'))

    else:
        form = UserCreationForm()

    context = {
        'form': form,
    }
    return render(request, 'user/register.html', context)
