---
title: 'Count the Number of Subarrays Having Sum x, Find the Maximum Sum of Values in a Contiguous Subarray'
date: 2021-03-10
tags: ['algorithm', 'competitive-programming']
draft: false
hide: false
---

## Find the Maximum Sum of Values in a Contiguous Subarray
* Given an array of n integers, your task is to find the maximum sum of values in a contiguous, nonempty subarray.
* Time: O(n), Space: O(1)
* [CSES 1643 Maximum Subarray Sum](https://cses.fi/problemset/task/1643)
``` cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
int main() {
    ios::sync_with_stdio(0); 
    cin.tie(0);

    int n;
    cin >> n;

    ll prefix = 0;
    ll prevMin = 0;
    ll ans = -1e18;
    for(int i = 0, a; i < n; ++i) {
        cin >> a;
        prefix += a;
        ans = max(ans, prefix - prevMin);
        prevMin = min(prevMin, prefix);
    }
    cout << ans;
}
```

## Count the Number of Subarrays Having Sum x
* Given an array of n integers, your task is to count the number of subarrays having sum x.
* Time: O(n), Space: O(n)
* [CSES 1661 Subarray Sum II](https://cses.fi/problemset/task/1661/)
```
Input:
5 7
2 4 1 2 7
Output:
3
```
``` cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

/*
 a       b
---- ----------
      c
---------------

c: current prefix sum, a: previous prefix sum
We want to find a to let b = target.
    b = target
c - a = target
a = c - target
==> Find a = c-target
*/

int main() {
    ios::sync_with_stdio(0); 
    cin.tie(0);

    int n, x;
    cin >> n >> x;
    map<ll, int> counter; // {prefix_sum: freq}
    counter[0] = 1;
    ll curSum = 0, ans = 0;
    for(int i = 0; i < n; ++i) {
        ll a;
        cin >> a;
        curSum += a;
        ans += counter[curSum-x];
        counter[curSum]++;
    }
    cout << ans;
}
```