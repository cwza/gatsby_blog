---
title: 'Usage of bisect_left and bisect_right in python'
date: 2021-01-27
tags: ['python', 'competitive-programming']
draft: false
hide: false
---

## 大於
* `bisect_left(arr, num)`：從list中查詢`第一個大於或等於num的數字`，找到返回index，不存在則返回n。
``` python
l = [1, 3, 5, 5, 7]
idx = bisect_left(l, 2)
print(idx, l[idx]) # 1 3
idx = bisect_left(l, 5)
print(idx, l[idx]) # 2 5
idx = bisect_left(l, 8)
print(idx) # 5
```
* `bisect_right(arr, num)`：從list中查詢`第一個大於num的數字`，找到返回index，不存在則返回n。
``` python
l = [1, 3, 5, 5, 7]
idx = bisect_right(l, 5)
print(idx, l[idx]) # 4 5
idx = bisect_right(l, 7)
print(idx) # 5
```

## 小於
* 要找`第一個小於或等於num的數字`, 只要用`bisect_right(arr, num)-1`, 意思就是找到第一個大於num的那個index再減1
``` python
l = [1, 3, 5, 5, 7]
idx = bisect_right(l, 4) - 1
print(idx, l[idx]) # 1 3
idx = bisect_right(l, 5) - 1
print(idx, l[idx]) # 3 5
idx = bisect_right(l, 0) - 1
print(idx) # -1
```
* 同理要找`第一個小於num的數字`, 可以用`lower_left(begin, num)-1`, 意思就是找到第一個大於或等於num的那個index再減1
``` python
l = [1, 3, 5, 5, 7]
idx = bisect_left(l, 5) - 1
print(idx, l[idx]) # 1 3
idx = bisect_left(l, 1) - 1
print(idx) # -1
```
* 須注意的是若回傳的index==0則代表找不到