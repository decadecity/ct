from django.forms import ModelForm

from caffeine_tracker.apps.data.models import Event, Record

class RecordForm(ModelForm):
     class Meta:
         model = Record
         exclude = ['user']


class EventForm(ModelForm):
     class Meta:
         model = Event
         exclude = ['user']
