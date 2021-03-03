---
title: 'Basic Bit Manimulation and Set'
date: 2021-01-08
tags: ['algorithm', 'competitive-programming']
draft: false
hide: false
---

## Basic
``` cpp
/*
     543210
43 = 101011
*/
x | (1 << k) // sets the kth bit of x to one
x & ~(1<<k) // sets the kth bit of x to zero
x ^ (1<<k) // inverts the kth bit of x
if ( x&(1<<i) ) cout << "1"; else cout << "0"; // check the kth bit is 1 or not
x & (x−1) // sets the last one bit of x to zero
x & −x // sets all the one bits to zero, except for the last one bit.
x | (x−1) // inverts all the bits after the last one bit
if( (x&(x−1))==0 ) // a positive number x is a power of two exactly when x & (x−1)=0

x = 5328; // 00000000000000000001010011010000 
cout << __builtin_clz(x) << "\n"; // 19 = the number of zeros at the beginning of the number
cout << __builtin_ctz(x) << "\n"; // 4 = the number of zeros at the end of the number
cout << __builtin_popcount(x) << "\n"; // 5 = the number of ones in the number
cout << __builtin_parity(x) << "\n"; // 1 = the parity (even or odd) of the number of ones
```

## Use integer to represent set
* Set operation
``` cpp
/*
intersection   a ∩ b == a & b
union          a ∪ b == a | b 
complement     a ̄ == ~a 
difference     a \ b == a & (~b)
*/
int x = (1<<1)|(1<<3)|(1<<4)|(1<<8); // x = {1,3,4,8}
int y = (1<<3)|(1<<6)|(1<<8)|(1<<9); // y = {3, 6, 8, 9}
int z = x|y; // z = x ∪ y = {1, 3, 4, 6, 8, 9}
cout << __builtin_popcount(z) << "\n"; // 6 = size of z

// prints all elements that belong to the set
for (int i = 0; i < 32; i++) {
        if (x&(1<<i)) cout << i << " ";
} // output: 1 3 4 8
```
* Iterate through subsets
``` cpp
// goes through the subsets of {0,1,...,n−1}
for (int b = 0; b < (1<<n); b++) {
    // process subset b
}
//  goes through the subsets with exactly k elements
for (int b = 0; b < (1<<n); b++) {
    if (__builtin_popcount(b) == k) {
        // process subset b
    } 
}
// goes through the subsets of a set x
int b = 0; do {
    // process subset b
} while (b=(b-x)&x);
```