---
title: 'Bloom Filter'
date: 2020-11-04
tags: ['algorithm']
draft: false
hide: false
---

## Summary
* Just like hash set, we can add element to it and check whether element is in it or not. 
* Space complexity: O(1)
* May have false positive, but guarantee that no false negative
    + 如果bloom filter說它存在, 它有低機率其實不存在
    + 如果bloom filter說它不存在, 就保證它真的不存在
* Can't remove element
* You can increase the filter size to decrease the false positive rate

## Complexity
Time Complexity: O(1) for insert and search
Space Complexity: O(1)

## Pros and Cons
* Pros
    + Space complexity: O(1)
    + No False Negative
* Cons
    + May Have False Positive

## Simple Pseudo Code Just for Understand
``` python
filter = [0] * 32
hash_funcs = [md5, sha1, sha256, ...]
# Add "Tom" into filter
for hash_func in hash_funcs: 
    filter[hashfunc("Tom") % 32] = 1

# Check if "Tom" is in filter
tmp = []
for hash_func in hash_funcs: 
    if filter[hashfunc("Tom") % 32] == 1:
        tmp.append(1)
if tmp is all 1:
    print("Tom is in filter with high probability")
else:
    print("Tom is definitely not in the filter")
```