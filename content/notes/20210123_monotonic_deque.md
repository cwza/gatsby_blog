---
title: 'Monotonicly Increasing or Decreasing Deque'
date: 2021-01-21
tags: ['leetcode', 'algorithm', 'competitive-programming']
draft: false
hide: false
---

## Find the first larger value at the right of each element
[739. Daily Temperatures](https://leetcode.com/problems/daily-temperatures/)
``` python
def dailyTemperatures(self, T: List[int]) -> List[int]:
    "Monotonic Decreasing Deque, Time: O(n), Space: O(n)"
    from collections import deque;
    d = deque() # We store idx in deque, the values are decreasing
    n = len(T)
    ans = [0]*n
    for i in reversed(range(n)):
        while(d and T[d[-1]] <= T[i]): d.pop() # Maintain the decreasing order
        if(d): ans[i] = d[-1] - i
        else: ans[i] = 0
        d.append(i)
    return ans
T = [73, 74, 75, 71, 69, 72, 76, 73]
ans = Solution().dailyTemperatures(T)
assert ans == [1, 1, 4, 2, 1, 1, 0, 0]
```

## Find the max value in sliding window
[239. Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/)
``` python
def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
    " Monotonic Decreasing Deque, Time: O(n), Space: O(k) "
    from collections import deque
    n = len(nums)
    d = deque() # We store idx in deque, the values are decreasing
    ans = []
    for i in range(n):
        while d and nums[d[-1]] <= nums[i]: d.pop() # Maintain the decreasing order
        while d and d[0] <= i-k: d.popleft() # Maintain the window size
        d.append(i)
        if i >= k-1: ans.append(nums[d[0]])
    return ans
nums = [1,3,-1,-3,5,3,6,7]
k = 3
result = Solution().maxSlidingWindow(nums, k)
assert result == [3,3,5,5,6,7]
```