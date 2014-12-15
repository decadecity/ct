#!/bin/bash
echo "Pulling, updating and collecting static..."
git pull && ./bin/git-update.sh && ./bin/errors.sh && ./django-admin collectstatic --noinput
