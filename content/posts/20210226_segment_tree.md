---
title: 'Segment Tree and Segment Tree with Lazy Propagation'
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

## Segment Tree with Lazy Propagation (Addition on segments)
* https://www.youtube.com/watch?v=xuoQdt5pHj0
* O(logn) for range update, n is the range
* [CSES 1735 Range Updates and Sums](https://cses.fi/problemset/task/1735/)
``` cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

int n, q;

struct node {
    ll s, lz;
    bool mark;
};
node tree[1<<19];

void apply(int i, ll val, bool mark, int l, int r) {
    // update value and lazy
    if(mark) {
        tree[i].s = val*(r-l+1);
        tree[i].mn = val;
        tree[i].lz = val;
        tree[i].mark = true;
    } else {
        tree[i].s += val*(r-l+1);
        tree[i].mn += val;
        tree[i].lz += val;
    }
}

void push(int i, int l, int mid, int r) {
    // propagate from parent to children
    apply(2*i, tree[i].lz, tree[i].mark, l, mid);
    apply(2*i+1, tree[i].lz, tree[i].mark, mid+1, r);
    tree[i].lz = 0;
    tree[i].mark = false;
}


void update(int x, int y, ll val, bool mark, int i = 1, int l = 1, int r = n) {
    if(x > r || y < l) { // [x, y] completely not overlap with [l, r]
        return;
    }
    if(x <= l && y >= r) { // [x, y] completely cover [l, r]
        // Update value and lazy
        apply(i, val, mark, l, r);
        return;
    }
    // [x, y] partially overlap with [l, r]
    int mid = l + (r-l)/2;
    push(i, l, mid, r); // Propagate
    update(x, y, val, mark, 2*i, l, mid);
    update(x, y, val, mark, 2*i+1, mid+1, r); 
    tree[i].s = tree[2*i].s + tree[2*i+1].s;
    tree[i].mn = max(tree[2*i].mn, tree[2*i+1].mn);
}

ll query(int x, int y, int i = 1, int l = 1, int r = n) {
    if(x > r || y < l) { // [x, y] completely not overlap with [l, r]
        return 0;
    }
    if(x <= l && y >= r) { // [x, y] completely cover [l, r]
        return tree[i].s;
    }
    // [x, y] partially overlap with [l, r]
    int mid = l + (r-l)/2;
    push(i, l, mid, r); // Propagate
    ll v1 = query(x, y, 2*i, l, mid);
    ll v2 = query(x, y, 2*i+1, mid+1, r);
    return v1 + v2;
    // return max(v1, v2);
}

int main() {
    ios::sync_with_stdio(0); 
    cin.tie(0);
    // freopen("input.txt", "r", stdin); 
    // freopen("output.txt", "w", stdout);

    cin >> n >> q;
    for(int i = 1, a; i <= n; ++i) {
        cin >> a;
        update(i, i, a, false);
    }
    while(q--) {
        int qt;
        cin >> qt;
        if(qt==1) {
            int a, b, x;
            cin >> a >> b >> x;
            update(a, b, x, false);
        } else if(qt==2) {
            int a, b, x;
            cin >> a >> b >> x;
            update(a, b, x, true);
        } else {
            int a, b;
            cin >> a >> b;
            cout << query(a, b) << "\n";
        }
    }
}
```