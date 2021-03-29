---
title: 'Generate Prime Numbers, Generate Number of Factors by Nearly O(n)'
date: 2021-03-10
tags: ['algorithm', 'competitive-programming']
draft: false
hide: false
---

## Prime Numbers
* Remove 2's multiplies, 3's multiplies, 5's multipliers, ...
* Time Complexity: O(n * log(logn))
``` cpp
const int n = 20;
int sieve[n+1];
for (int x = 2; x <= n; x++) {
    if (sieve[x]) continue;
    for (int u = 2*x; u <= n; u += x) {
        sieve[u] = x;
    }
}

// sieve[]: 
// 2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20
// 0  0  2  0  3  0  2  3  5  0  3  0  7  5  2  0  3  0  5
```

## Number of Factors
* Add 1 to all 1's multipliers, Add 1 to all 2's multipliers, Add 1 to all 3's multipliers, ...
* Time Complexity: O(n * log(logn))
``` cpp
const int maxN = 1e6;
ll d[maxN+1];
for(int i = 1; i <= maxN; ++i) {
    for(int j = i; j <= maxN; j += i) {
        d[j]++;
    }
}
// d[]:
// 1 2 3 4 5 6 7 8 9 10
// 1 2 3 3 2 4 2 4 3  4 
```