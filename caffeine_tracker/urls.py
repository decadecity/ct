from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.contrib.auth.models import User

from rest_framework import routers, serializers, viewsets

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'caffeine_tracker.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^item/new', 'caffeine_tracker.apps.record.views.new_item'),
    url(r'^accounts/login/$', 'django.contrib.auth.views.login'),
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
