import simplejson
from datetime import datetime, timedelta

from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse
from django.db.models import Count
from django.shortcuts import get_object_or_404, render

from caffeine_tracker.lib.utils import HttpResponseGetAfterPost

from caffeine_tracker.apps.data.models import Event, Record, Item
from caffeine_tracker.apps.data.utils import current_caffeine

from .forms import EventForm, RecordForm

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
    return render(request, 'record/edit_record.html', context)


@login_required
def view_items(request):
    records = request.user.records.all()

    context = {
        'records': records
    }
    return render(request, 'record/view_records.html', context)


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
    return render(request, 'record/edit_record.html', context)


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
    return render(request, 'record/delete_record.html', context)


@login_required
def new_event(request):

    if request.method == 'POST':
        form = EventForm(request.POST)
        if not form.is_valid():
            messages.error(request, 'There was a problem recording the event.')
        else:
            event = form.save(commit=False)
            event.user = request.user
            event.save()
            messages.success(request, 'Event recorded: %s at %s' % (event.description, event.time))
            return HttpResponseGetAfterPost('%s#recorded' % (request.get_full_path()))

    else:
        form = EventForm()

    recent = Event.objects.filter(user=request.user)\
        .order_by('time')

    events = Event.objects.filter(user=request.user)\
        .extra(select={'lower_desc':'lower(description)'})\
        .values('description')\
        .order_by('lower_desc')\
        .annotate(total=Count('id'))

    context = {
        'form': form,
        'events': events,
        'recent': recent,
        'advanced_form': True,
    }
    return render(request, 'record/edit_event.html', context)


@login_required
def edit_event(request):

    event_pk = request.GET.get('id', None)
    event = get_object_or_404(Event, pk=event_pk)

    if request.method == 'POST':
        form = EventForm(request.POST, instance=event)
        if not form.is_valid():
            messages.error(request, 'There was a problem editing the note.')
        else:
            event = form.save()
            messages.success(request, 'Note edited: %s at %s' % (event.description, event.time))
            return HttpResponseGetAfterPost('%s#edited' % (request.get_full_path()))

    else:
        form = EventForm(instance=event)

    context = {
        'form': form,
    }
    return render(request, 'record/edit_event.html', context)



@login_required
def delete_event(request):

    event_pk = request.GET.get('id', None)
    event = get_object_or_404(Event, pk=event_pk)

    if request.method == 'POST':
        event.delete()
        messages.success(request, 'Item deleted: %s at %s' % (event.description, event.time))
        return HttpResponseGetAfterPost('%s#deleted' % (reverse(view_events)))

    context = {
        'event': event,
    }
    return render(request, 'record/delete_event.html', context)


@login_required
def view_events(request):
    events = request.user.events.all()

    context = {
        'events': events
    }
    return render(request, 'record/view_events.html', context)

@login_required
def overview(request):

    items = []

    start_date = datetime.now() - timedelta(days=4)
    events = request.user.events.filter(time__gte=start_date)
    records = request.user.records.filter(time__gte=start_date)

    for record in records:
        if record.caffeine_remaining() > 2:
            items.append(record)

    for event in events:
        event.caffeine_level = current_caffeine(request.user, datetime.now().timestamp())
        items.append(event)

    items = sorted(items, key=lambda r: r.time, reverse=True)

    context = {
        'items': items,
    }
    return render(request, 'record/overview.html', context)
