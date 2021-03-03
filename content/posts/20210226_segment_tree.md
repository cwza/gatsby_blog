---
title: 'Segment Tree with Lazy Propagation'
date: 2021-02-26
tags: ['algorithm', 'competitive-programming', 'leetcode']
description: "Sample code for segment tree with lazy propagation which is useful for range query problems"
draft: false
hide: false
---

## Segment Tree
* https://www.hackerearth.com/practice/data-structures/advanced-data-structures/segment-trees/tutorial/
* https://www.youtube.com/watch?v=ZBHKZF5w4YU
* You can easily change to fit min, max, xor. Because these operations all have associative property.
* Both update and query take O(logn) time
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
Segment Tree
*/

int n, q;
const int maxN = 2e5;
int x[maxN+1];

struct node {
    ll s;
};
node tree[1<<19];

void build(int i = 1, int l = 1, int r = n) {
    if(l == r) {
        tree[i].s = x[l];
        return;
    }
    int mid = l + (r-l)/2;
    build(2*i, l, mid);
    build(2*i+1, mid+1, r);
    tree[i].s = tree[2*i].s + tree[2*i+1].s; // change
}

void update(int idx, int val, int i = 1, int l = 1, int r = n) {
    if(l == r) {
        x[idx] = val;
        tree[i].s = val;
        return;
    }
    int mid = l + (r-l)/2;
    if(idx >= l && idx <= mid) {
        update(idx, val, 2*i, l, mid);
    } else {
        update(idx, val, 2*i+1, mid+1, r);
    }
    tree[i].s = tree[2*i].s + tree[2*i+1].s; // change
}

ll query(int x, int y, int i = 1, int l = 1, int r = n) {
    if(x > r || y < l) { // [x, y] completely not overlap with [l, r]
        // Return the value that will not be chosen
        return 0; // change
    }
    if(x <= l && y >= r) { // [x, y] completely cover [l, r]
        return tree[i].s;
    }
    // [x, y] partially overlap with [l, r]
    int mid = l + (r-l)/2;
    ll v1 = query(x, y, 2*i, l, mid);
    ll v2 = query(x, y, 2*i+1, mid+1, r);
    return v1 + v2; // change
}

int main() {
    ios::sync_with_stdio(0); 
    cin.tie(0);

    cin >> n >> q;
    for(int i = 1; i <= n; ++i) {
        cin >> x[i];
    }
    build();
    while(q--) {
        int type, a, b;
        cin >> type >> a >> b;
        if(type == 1) {
            update(a, b);
        } else {
            cout << query(a, b) << "\n";
        }
    }
}
```

## Lazy Propagation
* https://www.youtube.com/watch?v=xuoQdt5pHj0
* Code of lazyRangeUpdate: https://youtu.be/xuoQdt5pHj0?t=899
* Code of lazyQuery: https://youtu.be/xuoQdt5pHj0?t=1373
* O(logn) for range update, n is the range
* [CSES 1651 Range Update Query](https://cses.fi/problemset/task/1651/)
``` cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef vector<int> vi;
typedef vector<vector<int>> vvi;
typedef pair<int, int> pi;

int n, q;
const int maxN = 2e5;
int x[maxN+1];

struct node {
    ll s, lz;
};
node tree[1<<19];

void lzRangeUpdate(int x, int y, int delta, int i = 1, int l = 1, int r = n) {
    // Update tree[i] to the latest value, and propagate lz to its children
    if(tree[i].lz != 0) {
        tree[i].s += tree[i].lz;
        if(l != r) { // if not leaf, we propagate lz to children
            tree[2*i].lz += tree[i].lz;
            tree[2*i+1].lz += tree[i].lz;
        }
        tree[i].lz = 0;
    }
    if(x > r || y < l) { // [x, y] completely not overlap with [l, r]
        return;
    }
    if(x <= l && y >= r) { // [x, y] completely cover [l, r]
        tree[i].s += delta; // update tree[i]
        if(l != r) { // if not leaf, we propagate delta to children's lz
            tree[2*i].lz += delta;
            tree[2*i+1].lz += delta;
        }
        return;
    }
    // [x, y] partially overlap with [l, r]
    int mid = l + (r-l)/2;
    lzRangeUpdate(x, y, delta, 2*i, l, mid);
    lzRangeUpdate(x, y, delta, 2*i+1, mid+1, r); 
    tree[i].s = tree[2*i].s + tree[2*i+1].s;
}

ll lzRangeQuery(int x, int y, int i = 1, int l = 1, int r = n) {
    // Update tree[i] to the latest value, and propagate lz to its children
    if(tree[i].lz != 0) {
        tree[i].s += tree[i].lz;
        if(l != r) {
            tree[2*i].lz += tree[i].lz;
            tree[2*i+1].lz += tree[i].lz;
        }
        tree[i].lz = 0;
    }
    if(x > r || y < l) { // [x, y] completely not overlap with [l, r]
        return 0;
    }
    if(x <= l && y >= r) { // [x, y] completely cover [l, r]
        return tree[i].s;
    }
    // [x, y] partially overlap with [l, r]
    int mid = l + (r-l)/2;
    ll v1 = lzRangeQuery(x, y, 2*i, l, mid);
    ll v2 = lzRangeQuery(x, y, 2*i+1, mid+1, r);
    return v1 + v2;
}

int main() {
    ios::sync_with_stdio(0); 
    cin.tie(0);

    cin >> n >> q;
    for(int i = 1; i <= n; ++i) {
        cin >> x[i];
        lzRangeUpdate(i, i, x[i]);
    }
    while(q--) {
        int type, a, b, c;
        cin >> type;
        if(type==1) {
            cin >> a >> b >> c;
            lzRangeUpdate(a, b, c);
        } else {
            cin >> a;
            cout << lzRangeQuery(a, a) << "\n";
        }
    }
}
```
