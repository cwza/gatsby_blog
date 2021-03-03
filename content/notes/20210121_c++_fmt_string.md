---
title: 'Use fmt Library to Print Container and Format String in C++'
date: 2021-01-21
tags: ['c++']
draft: false
hide: false
---

## Install
* brew install fmt

## Code
``` cpp
#include <fmt/core.h>
#include <fmt/ranges.h>
using namespace fmt;
int main() {
    vector<int> nums = {1, 2, 3, 4};
    print("{}\n", nums); // {1, 2, 3, 4}
    unordered_map<string, int> table = {{"aa", 1}, {"bb", 2}};
    print("{}\n", table); // {("bb", 2), ("aa", 1)}
    tuple<int, int, int> triple = make_tuple(2, 3, 4);
    print("{}\n", triple); // (2, 3, 4
}
```

## Compile
``` sh
g++ -std=gnu++17 -O2 -Wall -lfmt test.cpp -o test
```

## VSCode
* Add "-lfmt" to tasks.json > args