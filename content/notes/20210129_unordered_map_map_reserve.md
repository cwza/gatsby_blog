---
title: 'unordered_map vs map and trick of use unordered_map::reserve(1<<20)'
date: 2021-01-29
tags: ['c++', 'competitive-programming']
draft: false
hide: false
---

## Time Complexity
* Map: AVL Tree, O(logn) to insert, delete, retrieve
* Unordered_Map: Hash Based, O(1) to insert, delete, retrieve

## Actual Run Time
Although the time complexity of unorderd_map is better than map, but usually you will find that using unordered_map runs much slower than map. That is because unordered_map in fact has a large constant factor in it, and for most n, it is not so common that log(n) will larger than this constant value.

By the way, unordered_map has a special function called reserve, use it on competitive-programming let your unordered_map runs much much faster. Just a little trick.
``` cpp
map<int, int> m1;
unordered_map<int, int> m2
unordered_map<int, int> m3; m3.reserve(1<<20);
// Speed m3 > m1 > m2 on many online-judge platform
```
When you do competitive programming, better use map or unordered_map with reserve. This may help you to go from TLE to AC!!!!