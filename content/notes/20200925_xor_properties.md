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
1. 任何數與0作xor運算結果不變, ex: 3 ^ 0 = 3
2. 任何數與自己作xor運算結果為0, ex: 3 ^ 3 = 0
3. xor sum有交換律, ex: 1 ^ 2 ^ 3 ^ 4 = 3 ^ 1 ^ 2 ^ 4 = 4 ^ 3 ^ 2 ^ 1
```
Ex:
1 ^ 3 ^ 1 ^ 2 ^ 3 = 1 ^ 1 ^ 3 ^ 3 ^ 2 = 2
```

## Application
* 移除重複結果不變, ex: 1 ^ 2 ^ 3 ^ 2 = 1 ^ 3 (By property 3 and 1)
* 欲移除xor sum中的某一個元素只要xor該元素即可, ex: 從x移除b, x = a ^ b ^ c then x ^ b = a ^ c (左右取^b)

## Associated Leetcode Problems
[136-Single Number](https://leetcode.com/problems/single-number/)  
[389-Find the Difference](https://leetcode.com/problems/find-the-difference/)