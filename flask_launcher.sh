#!/bin/bash

if pgrep -u carpdiem -x "flask" > /dev/null
then
	echo "Running"
else
	FLASK_APP=/home/carpdiem/raspi_neopixel_lights_central_webserver/main.py flask run --host=0.0.0.0 &>> /home/carpdiem/raspi_neopixel_lights_central_webserver/flask_log
fi
