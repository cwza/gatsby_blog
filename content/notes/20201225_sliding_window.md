---
title: 'Template of Sliding Window and LeetCode Problems'
date: 2020-12-25
tags: ['leetcode', 'algorithm']
draft: false
hide: false
---

## Template
``` python
from collections import Counter
arr = [...]
counter = Counter()
l, r = 0, 0
while r < len(arr):
    counter[arr[r]] += 1 # Extend window to right
    while condition:
        counter[arr[l]] -= 1
        # Update ans here if you need minimum
        if counter[arr[l]] <= 0: del counter[arr[l]]
        l += 1 # Shrink window from left
    # Update ans here if you need maximum
    r += 1
```

## LeetCode
[209. Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/)  
[904. Fruit Into Baskets](https://leetcode.com/problems/fruit-into-baskets/)  