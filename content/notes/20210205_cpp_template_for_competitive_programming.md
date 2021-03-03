---
title: 'C++ template for competitive programming'
date: 2021-02-05
tags: ['algorithm', 'competitive-programming', 'c++']
draft: false
hide: false
---

## Template
``` cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef vector<int> vi;
typedef vector<vector<int>> vvi;
typedef pair<int, int> pi;

int main() {
    ios::sync_with_stdio(0); 
    cin.tie(0);

    
}
```

## Sample Script to compile and run 
``` Makefile
fname=main.cpp
c: 
	clang++ "$(fname)" -o a.out -std=c++17 -stdlib=libc++ -g -Wall -fsanitize=address -isystem/usr/local/include -L/usr/local/lib -lfmt
r:
	./a.out
```

## How to use snippets in VSCode
Go to Code > Preferences > User Snippets and choose C++ from the dropdown. 
Use a [Snippet Generator](https://snippet-generator.app) to generate snippets for VSCode.