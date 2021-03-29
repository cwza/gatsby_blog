---
title: 'Useful snippet for finding the first value that not equal to arr[i] from left or from right'
date: 2021-03-10
tags: ['algorithm', 'competitive-programming']
draft: false
hide: false
---

``` cpp
// From i go to right and find the first value that not equal to arr[i]
int i = 0, j = i;
while(j<n && arr[j]==arr[i]) j++;
int ans = arr[j]

// From i go to left and find the first value that not equal to arr[i]
int i = n-1, j = i;
while(j>=0 && arr[j]==arr[i]) j--;
int ans = arr[j]
```