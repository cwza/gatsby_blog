---
title: 'Subsets, Permutation, Combinations, ...etc'
date: 2020-12-17
tags: ['algorithm', 'leetcode']
draft: false
hide: false
---

## Subsets
``` python
'''
Approach 1:
        0              N
     .     .        .     .
    1       N      1       N
   . .     . .    . .     . .
  2   N   2   N  2   N   2   N

Approach 2:
   0      1      2
 .   .    .  
1     2   2
.
2

Approach 3:
Generate binary representation of 0 ~ 7, then generate subsets from them
000, 001, 010, 011, 100, 101, 110, 111
'''
def subsets(nums: List[int]) -> List[List[int]]:
    "Approach 1"
    n = len(nums)
    result = []
    def dfs(i, path):
        if i == n:
            result.append(path[:])
            return
        path.append(i)
        dfs(i+1, path)
        path.pop()
        dfs(i+1, path)
    dfs(0, [])
    return result
def subsets(nums: List[int]) -> List[List[int]]:
    "Approach 2"
    n = len(nums)
    result = []
    def dfs(i, path):
        result.append(path[:])
        for j in range(i+1, n):
            path.append(nums[j])
            dfs(j, path)
            path.pop()
    dfs(-1, [])
    return result
def subsets(nums: List[int]) -> List[List[int]]:
    "Approach 3"
    n = len(nums)
    ans = []
    for b in range((1<<n)): # 0 ~ 2^n-1
        path = []
        for i in range(n):
            if (b>>i)&1: # if ith bit is 1
                path.append(nums[i])
        ans.append(path)
    return ans
print(subsets([1, 2, 3])) # #[[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]]
```

## Permutation
``` python
'''
   0     1     2
  . .   . .   . .
  1 2   0 2   0 1
  . .   . .   . .
  2 1   2 0   1 0
'''
def permute(nums: List[int]) -> List[List[int]]:
    "dfs, Time: O(n!)"
    n = len(nums)
    result = []
    done = set()
    def helper(path):
        if len(path) == n:
            result.append(path[:])
            return
        for i, num in enumerate(nums):
            if i not in done:
                done.add(i)
                path.append(num)
                helper(path)
                done.remove(i)
                path.remove(num)
    helper([])
    return result
print(permute([1,2,3])) #[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

## Leetcode
https://leetcode.com/problems/subsets/  
https://leetcode.com/problems/subsets-ii/  
https://leetcode.com/problems/permutations/  
https://leetcode.com/problems/permutations-ii/  
https://leetcode.com/problems/combinations/  
https://leetcode.com/problems/combination-sum/  
https://leetcode.com/problems/combination-sum-ii/  
https://leetcode.com/problems/combination-sum-iii/  