from django.forms import ModelForm
from caffeine_tracker.apps.data.models import Record, Item

class RecordForm(ModelForm):
     class Meta:
         model = Record
         exclude = ['user']
