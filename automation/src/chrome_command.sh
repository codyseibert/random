#!/bin/bash
while read -r line; do sleep 20 && bash -c "coffee watch.coffee ${line[0]} ${line[1]} ${line[2]} &"; done < now.txt
