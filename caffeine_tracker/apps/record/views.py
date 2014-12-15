from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from caffeine_tracker.apps.data.models import Record, Item

from .forms import RecordForm

@login_required
def new_item(request):

    if request.method == 'POST':
        form = RecordForm(request.POST)
        if not form.is_valid():
            messages.error(request, 'There was a problem recording the item.')
        else:
            record = form.save(commit=False)
            record.user = request.user
            record.save()
            messages.success(request, 'Item recorded.')

    else:
        form = RecordForm()

    context = {
        'form': form
    }

    return render(request, 'record/record.html', context)
