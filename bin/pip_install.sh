#!/bin/bash
BASE_PATH=`dirname $0`

source $BASE_PATH/caffeinetracker.venv/bin/activate

pip install -r $BASE_PATH/requirements.txt
