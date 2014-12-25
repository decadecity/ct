from datetime import datetime, timedelta
from math import pow

from django.conf import settings


def _amount_at_time(start_value, start_time, current_time):
    half_lives = (current_time - start_time) / float(settings.CAFFEINE_HALF_LIFE)
    return start_value * pow(0.5, half_lives)

def current_caffeine(user):
    start_date = datetime.now() - timedelta(days=4)
    records = user.records.filter(time__gte=start_date)
    current_caffeine = 0
    for record in records:
        current_caffeine += _amount_at_time(record.caffeine, record.time.timestamp(), datetime.now().timestamp())
    return round(current_caffeine)
