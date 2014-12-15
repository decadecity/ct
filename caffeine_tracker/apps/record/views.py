import simplejson

from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from caffeine_tracker.lib.utils import HttpResponseGetAfterPost

from caffeine_tracker.apps.data.models import Record, Item

from .forms import RecordForm

@login_required
def new_item(request):

    items = []
    for item in Item.objects.all():
        items.append({
            'description': item.description,
            'caffeine': item.caffeine,
        })
    items = simplejson.dumps(items)

    if request.method == 'POST':
        form = RecordForm(request.POST)
        if not form.is_valid():
            messages.error(request, 'There was a problem recording the item.')
        else:
            record = form.save(commit=False)
            record.user = request.user
            record.save()
            messages.success(request, 'Item recorded.')
            return HttpResponseGetAfterPost(request.path)

    else:
        form = RecordForm()

    context = {
        'form': form,
        'items': items,
    }

    return render(request, 'record/record.html', context)