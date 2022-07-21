---
title: "pprof python"
date: 2022-07-14
tags: ['python']
draft: false
hide: false
---

## Install pyprof in Linux
* pip install pyprof
* pip install protobuf==3.20.1

## Install pyprof in Mac
* Manually install zprofile
    + git clone https://github.com/timpalpant/zprofile.git
    + edit the setup.py remove '-static-libgcc' from extra_link_args
    + pip install file:///[location path of setup.py]
* Same as Install pyprof in Linux

## python code example
This code will create a http server with following route
```
GET "/debug/pprof":
GET "/debug/pprof/profile":
GET "/debug/pprof/wall":
GET "/debug/pprof/heap":
GET "/debug/pprof/thread"
GET "/debug/pprof/cmdline":
```
``` py
# start http server on background thread
from pypprof.net_http import start_pprof_server
server = start_pprof_server(port=6000)


# start mprofile and simulate large memory usage
EMPTY_BYTES_SIZE = sys.getsizeof(b'')
def allocate_bytes(size):
    bytes_len = (size - EMPTY_BYTES_SIZE)
    return b'x' * bytes_len
import mprofile
mprofile.start(sample_rate=128 * 1024)
aa = allocate_bytes(50 * 1024 * 1024)

# block forever
from threading import Event
Event().wait()
```

## pprof heap example
``` sh
# create profile protobuffer
go tool pprof http://localhost:6000/debug/pprof/heap
# load profile file by graphiz
go tool pprof -http=:8080 pprof.sample.HEAP.007.pb.gz
# 
go tool pprof -http=:8080 :6000/debug/pprof/heap
```


## Reference
* [pyprof](https://github.com/timpalpant/pypprof)
* [zprofile](https://github.com/timpalpant/zprofile)
* [mprofile](https://github.com/timpalpant/mprofile)
* [tracemalloc](https://docs.python.org/3/library/tracemalloc.html)