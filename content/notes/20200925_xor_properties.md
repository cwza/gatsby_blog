---
title: 'Some handy properties of XOR'
date: 2020-09-25
tags: ['leetcode']
draft: false
hide: false
---

## Basics
```
0 ^ 0 = 0
1 ^ 0 = 1
0 ^ 1 = 1
1 ^ 1 = 0

Ex:
11 ^ 2 = 9
    1011(11)
xor 0010(2)
-------------- 
    1001(9)
```

## Properties
* 任何數與0作xor運算結果不變, ex: 3 ^ 0 = 3
* 任何數與自己作xor運算結果為0, ex: 3 ^ 3 = 0
* xor運算有交換律, ex: 1 ^ 2 ^ 3 ^ 4 = 3 ^ 1 ^ 2 ^ 4 = 4 ^ 3 ^ 2 ^ 1
```
Ex:
1 ^ 3 ^ 1 ^ 2 ^ 3 = 1 ^ 1 ^ 3 ^ 3 ^ 2 = 2
```

## Associated Leetcode Problems
[136-Single Number](https://leetcode.com/problems/single-number/)  
[389-Find the Difference](https://leetcode.com/problems/find-the-difference/)