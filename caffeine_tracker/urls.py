from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.contrib.auth.models import User

from rest_framework import routers, serializers, viewsets

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'caffeine_tracker.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', 'caffeine_tracker.apps.homepage.views.home', name='home'),
    url(r'^admin/', include(admin.site.urls)),

    url(r'^record/item', 'caffeine_tracker.apps.record.views.new_item', name='add_record'),
    url(r'^edit/item', 'caffeine_tracker.apps.record.views.edit_item', name='edit_record'),
    url(r'^delete/item', 'caffeine_tracker.apps.record.views.delete_item', name='delete_record'),
    url(r'^view/items', 'caffeine_tracker.apps.record.views.view_items', name='view_records'),

    url(r'^record/event', 'caffeine_tracker.apps.record.views.new_event', name='add_event'),
    url(r'^edit/event', 'caffeine_tracker.apps.record.views.edit_event', name='edit_event'),
    url(r'^delete/event', 'caffeine_tracker.apps.record.views.delete_event', name='delete_event'),
    url(r'^view/events', 'caffeine_tracker.apps.record.views.view_events', name='view_events'),

    url(r'^overview', 'caffeine_tracker.apps.record.views.overview', name='overview'),

    url(r'^login$', 'django.contrib.auth.views.login', name='login'),
    url(r'^logout$', 'caffeine_tracker.apps.user.views.logout', name='logout'),
    url(r'^profile$', 'caffeine_tracker.apps.user.views.profile', name='profile'),
    url(r'^start$', 'caffeine_tracker.apps.user.views.register', name='register'),
)

# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'is_staff')

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browseable API.
urlpatterns += [
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
