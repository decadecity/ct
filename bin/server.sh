#!/bin/bash
PROJECT_ROOT="$HOME/caffeinetracker/"

cd $PROJECT_ROOT

if (( $# < 1 )); then
  echo "Usage:  server.sh release|stop|start|restart|update"
fi

if [ "$1" = 'update' ]; then
   ./bin/update.sh
fi

if [ "$1" = 'release' ]; then
  ./bin/update.sh && ./bin/django_stop.sh && ./bin/django_start.sh
fi

if [ "$1" = 'start' ]; then
  ./bin/django_start.sh
fi

if [ "$1" = 'stop' ]; then
  ./bin/django_stop.sh
fi

if [ "$1" = 'restart' ]; then
  ./bin/django_stop.sh && ./bin/django_start.sh
fi

