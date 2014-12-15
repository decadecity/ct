#!/bin/bash
#echo "Starting Django FCGI..."
#./django-admin runfcgi host=127.0.0.1 port=8004 pidfile=/tmp/decadecity_django.pid

LOGFILE=$HOME/caffeinetracker/log/gunicorn.log

echo "Starting Django Gunicorn..."
./caffeinetracker.venv/bin/gunicorn wsgi -b 127.0.0.1:8013 \
	--workers 3 \
	--name caffeinetracker \
	--daemon \
	--pid /tmp/caffeinetracker_gunicorn.pid \
	--log-level=info --log-file=$LOGFILE 2>>$LOGFILE

