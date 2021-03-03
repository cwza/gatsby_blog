---
title: 'Binary Search Template'
date: 2020-12-11
tags: ['algorithm', 'leetcode']
draft: false
hide: false
---

## Video Explained
https://www.youtube.com/watch?v=v57lNF2mb_s

## Binary Search Template
1. Find a function g(x), that g(x) is True while x >= m otherwise False
2. Then we can use binary search template to find the smallest x satisfies g that is m
3. If we want to find the largest x that does not satisfies g(x), then that is m - 1
``` python
def template(l, r, target):
    "Time: O(log(r-l) * g(m)), Space: O(g(m))"
    # [l, r), l = min(searchSpace), max(searchSpace) + 1
    # return the smallest one that satisfies g(), if returns == max(searchSpace)+1 this means there is no x can satisfies g() 
    def g(m, target) -> bool:
        ...
    while l < r:
        m = l + (r-l)//2
        if g(m, target): r = m
        else: l = m + 1
    return l 
```

## Sample Code of lower_bound and upper_bound using Template
``` python
# lower_bound is x which x is the smallest index that satisfies arr[x] >= target
def lower_bound(arr, target):
    l, r = 0, len(arr)
    while l <= r:
        m = l + (r-l)//2
        if arr[m] >= target: r = m
        else: l = m + 1
    return l
assert lower_bound([1, 3, 5, 5, 7], 4) == 2
assert lower_bound([1, 3, 4, 5, 5, 7], 5) == 3
assert lower_bound([1, 3, 5, 5, 7], 10) == 5
assert lower_bound([1, 3, 5, 5, 7], -5) == 0

# upper bound is x-1 which x is the smallest index that satisfies arr[x] > target, 
def upper_bound(arr, target):
    l, r = 0, len(arr)
    while l < r:
        m = l + (r-l)//2
        if arr[m] > target: r = m
        else: l = m + 1
    if l - 1 < 0: return -1
    return l - 1
assert upper_bound([1, 3, 5, 5, 7], 6) == 3
assert upper_bound([1, 3, 4, 5, 5, 7], 5) == 4
assert upper_bound([1, 3, 5, 5, 7], 10) == 4
assert upper_bound([1, 3, 5, 5, 7], -5) == -1
```

## LeetCode
[34. Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)  
[278. First Bad Version](https://leetcode.com/problems/first-bad-version/)  
[69. Sqrt(x)](https://leetcode.com/problems/sqrtx/)  
[35. Search Insert Position](https://leetcode.com/problems/search-insert-position/)  
[1011. Capacity To Ship Packages Within D Days](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/)  
[875. Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/)    
[378. Kth Smallest Element in a Sorted Matrix](https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/)   
[162. Find Peak Element](https://leetcode.com/problems/find-peak-element/)  
[153. Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)   
[33. Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)