---
title: 'Some common pattern of recursive time complexity'
date: 2020-11-27
tags: ['algorithm', 'leetcode']
draft: false
hide: false
---


## Think of Inorder Tree Traversal
* T(n) = T(n-1) + T(1)
    + O(n)
    + Factorial or search on an extremely unbalanced binary tree
* T(n) = 2*T(n/2)
    + O(n)
    + Inorder traversal of balanced binary tree

## Think of Quick Sort
* T(n) = T(n-1) + T(1) + O(n)
    + O(n^2)
    + Worst case of quick sort
* T(n) = 2*T(n/2) + O(n)
    + O(nlogn)
    + Merge sort or Best case of quick sort
* T(n) = T(n/10) + T(n*9/10) + O(n)
    + O(nlogn)
    + Other case of quick sort

## Think of Binary Search
* T(n) = T(n/2)
    + O(logn)
    + Binary search

## Think of Permutation Combination
* T(n) = T(n-1) + T(n-2) + ... + T(1)
    + T(2^n)
    + Think of all combination from 1 to n or all subsets
* T(n) = n * T(n-1)
    + T(n!)
    + Think of Permutation