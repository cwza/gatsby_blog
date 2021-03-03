---
title: 'Quick Sort, Quck Select, K Largest and K Smallest'
date: 2021-01-20
tags: ['leetcode', 'algorithm']
draft: false
hide: false
---

## Partition
``` python
def partition(data, left, right):
    # left is the pivot position
    i = left
    j = right
    while i != j:                  
        while data[j] > data[left] and i < j:   # from right, find the first idx that less than pivot
            j -= 1
        while data[i] <= data[left] and i < j:  # from left, find the first idx that greater than pivot
            i += 1
        if i < j:                        # swap them
            data[i], data[j] = data[j], data[i] 
    # swap the left and i
    data[left], data[i] = data[i], data[left]
    return i # return pivot idx
```

## QuickSort
``` python
import random
def quick_sort(data):
    def helper(left, right):
        if left >= right: return

        pivot = random.randint(left, right) # take the random pivot
        data[left], data[pivot] = data[pivot], data[left] # move pivot to left

        pivot_idx = partition(data, left, right)
        helper(left, pivot_idx-1)
        helper(pivot_idx+1, right)
    helper(0, len(data)-1)
data = [89, 34, 23, 78, 67, 100, 66, 29, 79, 55, 78, 88, 92, 96, 96, 23]
quick_sort(data)
print(data) # [23, 23, 29, 34, 55, 66, 67, 78, 78, 79, 88, 89, 92, 96, 96, 100]
```

## QuickSelect
``` python
def quick_select(data, k):
    # Notice that this k is zero-indexed
    def helper(left, right, k):
        if left >= right: return

        pivot = random.randint(left, right)
        data[left], data[pivot] = data[pivot], data[left]

        mid = partition(data, left, right)
        if(mid == k): return
        elif(mid > k): helper(left, mid-1, k)
        else: helper(mid+1, right, k)
    helper(0, len(data)-1, k)

data = [89, 34, 23, 78, 67, 100, 66, 29, 79, 55, 78, 88, 92, 96, 96, 23]
quick_select(data, 5)
print(data) # [23, 23, 34, 55, 29, 66, 67, 78, 78, 79, 89, 88, 92, 96, 96, 100]
```

## K Largest and K Smallest
``` python
def k_smallest(data, k):
    quick_select(data, k-1)
    return data[:k]
data = [89, 34, 23, 78, 67, 100, 66, 29, 79, 55, 78, 88, 92, 96, 96, 23]
ans = k_smallest(data, 6)
print(ans) # [29, 23, 23, 34, 55, 66]

def k_largest(data, k):
    n = len(data)
    quick_select(data, n-k)
    return data[n-k:]
data = [89, 34, 23, 78, 67, 100, 66, 29, 79, 55, 78, 88, 92, 96, 96, 23]
ans = k_largest(data, 6)
print(ans) # [88, 89, 92, 96, 96, 100]
```

## LeetCode
[973. K Closest Points to Origin](https://leetcode.com/problems/k-closest-points-to-origin/submissions/)  
[215. Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)  
[347. Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)  