#!/bin/bash
NOW=$(date +"%Y-%m-%d")
PROJECT_ROOT="$HOME/caffeinetracker"
$PROJECT_ROOT/django-admin clearsessions
