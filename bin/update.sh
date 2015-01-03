#!/bin/bash
echo "Pulling, updating and collecting static..."
git pull && ./bin/git-update.sh && grunt build && ./django-admin collectstatic --noinput
