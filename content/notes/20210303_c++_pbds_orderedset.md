---
title: 'Sample Code of C++ pb_ds (Ordered_Set)'
date: 2021-03-03
tags: ['algorithm', 'competitive-programming']
draft: false
hide: false
---

## How to Use Ordered_Set in C++
* Tree structure that automatically maintain the index
* We can get index by value, and get value by index at O(logn)
* order_of_key (k) : Number of items strictly smaller than k .
* find_by_order(k) : K-th element in a set (counting from zero)
``` cpp
#include <ext/pb_ds/assoc_container.hpp>
#include <ext/pb_ds/tree_policy.hpp> 
using namespace __gnu_pbds;
template<class T> using oset = tree<T, null_type, less<T>, rb_tree_tag, tree_order_statistics_node_update>;

int main() {
    oset<int> s;
    s.insert(5); 
    s.insert(1); 
    s.insert(2); 
    cout << *(s.find_by_order(1)) << "\n" // 2
    cout << s.order_of_key(4) << "\n" // 2
}
```

## CSES Practice
[CSES 1749 List Removals](https://cses.fi/problemset/task/1749/)
[CSES 1144 Salary Queries](https://cses.fi/problemset/task/1144)