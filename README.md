# Caffeine Tracker

WIP for a caffeine tracking web thing.

## Getting started
This is for Ubuntu.  Unless otherwise stated, all commands should be run from the project's root directory.

### Node
Install node and npm, best to use the NodeSource repository and [follow these instructions](https://github.com/joyent/node/wiki/installing-node.js-via-package-manager#debian-and-ubuntu-based-linux-distributions).

Install the grunt cli: `sudo npm install -g grunt-cli`

Install the grunt dependencies by running: `npm install`

### Python
Install Python 3: `sudo apt-get install python3`

Install virtual env: `sudo apt-get install virtualenv`

In the project's root directory set up a Python 3 virtual env: `virtualenv -p python3 caffeinetracker.venv`

Install the Python dependencies by running: `./bin/pip_install.sh`

### Ruby
Install ruby: `sudo apt-get install ruby`

Install Sass and the Scss linter: `sudo gem install sass scss-lint`

### Django
The Django site lives in the `caffeine_tracker` directory.

You'll need a local settings file, the easiest thing to do is copy `settings/local_example.py` to `settings/local.py`.

To set up the database run: `./django-admin migrate`

To set up an admin user run: `./django-admin createsuperuser` and follow the prompts.

## Working with the project

### Grunt
Root run `grunt` without arguments to see a list of available tasks.

### Django
Run: `./django-admin test` to check that the tests pass.

Run: `./django-admin runserver` to start the default dev server on: `http://localhost:8000/`

The admin interface can be found at: `http://localhost:8000/admin/`
