# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('description', models.CharField(unique=True, max_length=255)),
                ('caffeine', models.PositiveIntegerField()),
                ('added', models.DateTimeField(auto_now_add=True)),
                ('created_by', models.ForeignKey(to=settings.AUTH_USER_MODEL, related_name='items')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Record',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('time', models.DateTimeField(default=datetime.datetime.now)),
                ('description', models.CharField(max_length=255)),
                ('caffeine', models.PositiveIntegerField()),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL, related_name='records')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='UsersRecentItem',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('time', models.DateTimeField(default=datetime.datetime.now)),
                ('item', models.ForeignKey(to='data.Item', related_name='recent_items')),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL, related_name='recent_items')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
