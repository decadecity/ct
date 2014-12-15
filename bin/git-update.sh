#!/bin/bash
echo "Updating Git submodules..."
git submodule foreach git pull origin master
