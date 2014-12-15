# -*- coding: utf-8 -*-
from django.http import HttpResponse
from django.utils.encoding import iri_to_uri

class HttpResponseNoContent(HttpResponse):
    status_code = 204

    def __init__(self):
        HttpResponse.__init__(self)


class HttpResponseGetAfterPost(HttpResponse):
    status_code = 303

    def __init__(self, redirect_to):
        HttpResponse.__init__(self)
        self['Location'] = iri_to_uri(redirect_to)


class HttpResponseTemporaryRedirect(HttpResponse):
    status_code = 307

    def __init__(self, redirect_to):
        HttpResponse.__init__(self)
        self['Location'] = iri_to_uri(redirect_to)

