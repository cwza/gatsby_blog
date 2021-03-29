---
title: 'Binary Index Tree and Binary Index Tree with Difference Array Concept'
date: 2021-03-05
tags: ['algorithm', 'competitive-programming']
draft: false
hide: false
---

## Binary Index Tree
* For explanation please refers to CPH book.
* Both add and sum take O(logn) time
* The following implementation using 1-index
* [CSES 1648 Dynamic Range Sum Queries](https://cses.fi/problemset/task/1648/)
``` cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef vector<int> vi;
typedef vector<vector<int>> vvi;
typedef pair<int, int> pi;

/*
Binary Index Tree
*/
int n, q;
const int maxN = 2e5;
int x[maxN+1];
ll tree[maxN+1];

void add(int idx, int delta) {
    // add delta to x[idx]
    while(idx <= n) {
        tree[idx] += delta;
        idx += idx & -idx;
    }
}

ll sum(int idx) {
    // return sum of range [1, idx] in x
    ll s = 0;
    while(idx >= 1) {
        s += tree[idx];
        idx -= idx & -idx;
    }
    return s;
}

int main() {
    ios::sync_with_stdio(0); 
    cin.tie(0);

    cin >> n >> q;
    for(int i = 1; i <= n; ++i) {
        cin >> x[i];
        add(i, x[i]);
    }
    while(q--) {
        int type, a, b;
        cin >> type >> a >> b;
        if(type == 1) {
            add(a, b - x[a]);
            x[a] = b;
        } else {
            cout << sum(b) - sum(a-1) << "\n";
        }
    }
}
```

## Binary Index Tree with Difference Array Concept
* Add delta to range in O(logn) time
* [CSES 1651 Range Update Queries](https://cses.fi/problemset/task/1651/)
``` cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef vector<int> vi;
typedef vector<vector<int>> vvi;
typedef pair<int, int> pi;

/*
Binary Index Tree with Difference Array Concept
*/
int n, q;
const int maxN = 2e5;
// int x[maxN+1];
ll tree[maxN+2];

void add(int idx, int delta) {
    // add delta to x[idx]
    while(idx <= n) {
        tree[idx] += delta;
        idx += idx & -idx;
    }
}

ll sum(int idx) {
    // return sum of range [1, idx] in x
    ll s = 0;
    while(idx >= 1) {
        s += tree[idx];
        idx -= idx & -idx;
    }
    return s;
}

int main() {
    ios::sync_with_stdio(0); 
    cin.tie(0);

    cin >> n >> q;
    for(int i = 1, x; i <= n; ++i) {
        cin >> x;
        add(i, x);
        add(i+1, -x);
    }
    while(q--) {
        int qt;
        cin >> qt;
        if(qt==1) {
            int a, b, u; // increase [a, b] by u
            cin >> a >> b >> u;
            add(a, u);
            add(b+1, -u);
        } else {
            int k; // what is the value in position k;
            cin >> k;
            cout << sum(k) << "\n";
        }
    }
}
```