import simplejson

from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse
from django.shortcuts import get_object_or_404, render

from caffeine_tracker.lib.utils import HttpResponseGetAfterPost

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
            messages.success(request, 'Item recorded: %s at %s' % (record.description, record.time))
            return HttpResponseGetAfterPost('%s#recorded' % (request.get_full_path()))

    else:
        form = RecordForm()

    recent = request.user.recent_items.all()
    items = Item.objects.all().extra(select={'lower_desc':'lower(description)'}).order_by('lower_desc')

    context = {
        'form': form,
        'items': items,
        'recent': recent,
        'advanced_form': True,
    }
    return render(request, 'record/record.html', context)


@login_required
def view_items(request):
    records = request.user.records.all()

    context = {
        'records': records
    }
    return render(request, 'record/records.html', context)


@login_required
def edit_item(request):

    record_pk = request.GET.get('id', None)
    record = get_object_or_404(Record, pk=record_pk)

    if request.method == 'POST':
        form = RecordForm(request.POST, instance=record)
        if not form.is_valid():
            messages.error(request, 'There was a problem editing the item.')
        else:
            record = form.save()
            messages.success(request, 'Item edited: %s at %s' % (record.description, record.time))
            return HttpResponseGetAfterPost('%s#edited' % (request.get_full_path()))

    else:
        form = RecordForm(instance=record)

    context = {
        'form': form,
    }
    return render(request, 'record/record.html', context)


@login_required
def delete_item(request):

    record_pk = request.GET.get('id', None)
    record = get_object_or_404(Record, pk=record_pk)

    if request.method == 'POST':
        record.delete()
        messages.success(request, 'Item deleted: %s at %s' % (record.description, record.time))
        return HttpResponseGetAfterPost('%s#deleted' % (reverse(view_items)))

    context = {
        'record': record,
    }
    return render(request, 'record/delete.html', context)
