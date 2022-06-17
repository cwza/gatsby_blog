---
title: "Lock File in Shell"
date: 2022-06-17
tags: ['shell']
draft: false
hide: false
---

## Note
* A very good snippet to lock file by shell script
* Very useful if you want there is only one instance of your program be runned by OS.
``` sh
lockfile=/var/tmp/mylock
if ( set -o noclobber; echo "$$" > "$lockfile") 2> /dev/null; then
        trap 'rm -f "$lockfile"; exit $?' INT TERM EXIT
        # do stuff here
        echo 'running'
        sleep 10
        # clean up after yourself, and release your trap
        rm -f "$lockfile"
        trap - INT TERM EXIT
else
        echo "Lock Exists: $lockfile owned by $(cat $lockfile)"
fi
```
* This Code is From https://unix.stackexchange.com/questions/22044/correct-locking-in-shell-scripts/22047#22047