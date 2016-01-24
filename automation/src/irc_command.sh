#!/bin/bash
while read -r line; do bash -c "coffee irc.coffee ${line[0]} ${line[1]} ${line[2]} &"; done < irc_now.txt
