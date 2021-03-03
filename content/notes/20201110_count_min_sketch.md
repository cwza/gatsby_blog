---
title: 'Count Min Sketch'
date: 2020-11-10
tags: ['algorithm']
draft: false
hide: false
---

## Summary
* Just like frequency hash map, we can accumulate value to a key and get the frequency back.
* Just like bloom filter, we may get a wrong value with some probability
* You can increase the filter size to decrease the probability that you get wrong frequency

## Complexity
Time Complexity: O(1) for insert and search
Space Complexity: O(1)

## Algorithm
* Events = [C, B, A, A, A]
    + hash1(A)%6 = 1, hash2(A)%6 = 3, hash3(A)%6 = 0, hash4(A)%6 = 5, hash5(A)%6 = 4
    + hash1(B)%6 = 1, hash2(B)%6 = 6, hash3(B)%6 = 2, hash4(B)%6 = 6, hash5(B)%6 = 3
    + hash1(C)%6 = 1, hash2(C)%6 = 6, hash3(C)%6 = 4, hash4(C)%6 = 2, hash5(C)%6 = 0


|    | 0 | 1       | 2 | 3 | 4 | 5 | 6    |
|----|---|---------|---|---|---|---|------|
| h5 | 1 |         |   | 1 | 3 |   |      |
| h4 |   |         | 1 |   |   | 3 | 1    |
| h3 | 3 |         | 1 |   | 1 |   |      |
| h2 |   |         |   | 3 |   |   | 1->2 |
| h1 |   | 3->4->5 |   |   |   |   |      |

* Frequency: {A: 3, B: 1, C: 1}
    + Take the most appeared number.