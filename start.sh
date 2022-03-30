#!/bin/sh

pm2 start app.js -n ROTARYCLUB_MMATE --merge-logs --log-date-format="YYYY-MM-DD HH:mm Z" -l /home/node_log/ROTARYCLUB_MMATE/log.log -e /home/node_log/ROTARYCLUB_MMATE/err.log -o /home/node_log/ROTARYCLUB_MMATE/out.log
tail -f /home/node_log/ROTARYCLUB_MMATE/log.log
