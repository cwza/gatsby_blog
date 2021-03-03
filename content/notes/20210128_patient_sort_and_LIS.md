---
title: 'The relation between patience sorting and longest increasing substring'
date: 2021-01-28
tags: ['competitive-programming', 'algorithm']
draft: false
hide: false
---

## Video Explained
https://www.youtube.com/watch?v=l2rCz7skAlk

## Comparison
* Patience sorting with greater than or equal to <=> LIS with strictly increasing
* Patience sorting with greater than <=> LIS with non-decreasing

## Code
``` python
def lengthOfLIS(self, nums: List[int]) -> int:
    "Patience Sort, Time: O(nlogn), Space: O(n)"
    from bisect import bisect_left
    n = len(nums)
    dp = []
    for num in nums:
        idx = bisect_left(dp, num) # Patience sorting with greater than or equal to <=> LIS with strictly increasing
        # idx = bisect_right(dp, num) # Patience sorting with greater than <=> LIS with non-decreasing
        if idx==len(dp):
            dp.append(num)
        else:
            dp[idx] = num
    return len(dp)
```