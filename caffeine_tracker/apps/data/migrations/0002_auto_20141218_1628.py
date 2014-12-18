# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('data', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='item',
            options={'ordering': ['-added']},
        ),
        migrations.AlterModelOptions(
            name='record',
            options={'ordering': ['-time']},
        ),
        migrations.AlterModelOptions(
            name='usersrecentitem',
            options={'ordering': ['-time']},
        ),
        migrations.AddField(
            model_name='usersrecentitem',
            name='count',
            field=models.PositiveIntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AlterUniqueTogether(
            name='usersrecentitem',
            unique_together=set([('item', 'user')]),
        ),
    ]
