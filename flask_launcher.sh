#!/bin/bash

if pgrep -x "flask" > /dev/null
then
	echo "Running"
else
	export FLASK_APP=main.py
	flask run --host=0.0.0.0
fi