#!/bin/bash
echo "Stopping Django Gunicorn..."
kill `cat /tmp/caffeinetracker_gunicorn.pid`
