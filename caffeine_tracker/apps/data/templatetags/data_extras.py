from django import template

from caffeine_tracker.apps.data.utils import current_caffeine

register = template.Library()

@register.simple_tag(takes_context=True)
def users_current_caffeine(context):
    user = context['user']
    return current_caffeine(user)
