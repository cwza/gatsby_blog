---
title: 'Generate Prime Numbers, Generate Number of Factors by Nearly O(n)'
date: 2021-03-10
tags: ['algorithm', 'competitive-programming']
draft: false
hide: false
---

## Prime Numbers (Sieve)
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

## Number of Factors (DP)
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

## Number of Factors of n
* Use sieve to generate primes that less than ceil(sqrt(n))
* Prime decomposition to compute the answer
* 18 = 2 * 3^2 => number of factors of 18 is 2*3=6
* O(sqrt(n))

``` cpp
const int maxX = 66000; // sqrt(2^32-1)
// const int maxX = 20;
int sieve[maxX+1];
vector<int> primes;

void gen_primes() {
    for(int i = 2; i <= maxX; ++i) {
        for(int j = 2*i; j <= maxX; j += i) {
            if(sieve[j]) continue; 
            sieve[j] = i;
        }
    }
    for(int i = 2; i <= maxX; ++i) {
        if(!sieve[i]) primes.push_back(i);
    }
}

int num_factors(ll x) {
    // prime decomposition
    int ans = 1;
    for(int prime : primes) {
        if(prime*prime > x) break;
        int cnt = 0;
        while(x%prime==0) {
            x /= prime;
            cnt++;
        }
        ans *= cnt+1;
    }
    if(x!=1) ans *= 2; // Important because the prime factor could larger than sqrt(x)
    return ans;
}

int main() {
    gen_primes();
    ll n;
    cout << num_factors(n);
}
```