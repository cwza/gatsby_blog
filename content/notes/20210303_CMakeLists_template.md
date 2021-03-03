---
title: 'Template of CMakeLists.txt'
date: 2021-03-03
tags: ['c++']
draft: false
hide: false
---

## Template
CMakeLists.txt
``` cmake
project(a)
set(CMAKE_VERBOSE_MAKEFILE ON)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
set(CMAKE_CXX_COMPILER "g++-10")
set(CMAKE_CXX_STANDARD 17)
add_compile_options("-fsanitize=address")
link_libraries("-fsanitize=address")
add_executable(a.out main.cpp)

# Other Library
string(APPEND CMAKE_CXX_FLAGS " -I/usr/local/include")
string(APPEND CMAKE_CXX_FLAGS " -L/usr/local/lib")
string(APPEND CMAKE_CXX_FLAGS " -lfmt")
```

## Command to build and run
``` bash
mkdir build
cd build
cmake ..
make
./a.out
```