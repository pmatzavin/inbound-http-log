#!/bin/bash

PORT=$1

CMD_PREFIX='node_modules/autocannon/autocannon.js -c 100 -p 10 http://localhost:'

CMD=$CMD_PREFIX$PORT

echo $CMD

eval $CMD
