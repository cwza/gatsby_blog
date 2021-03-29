---
title: 'Some Code related to Binary Lifting'
date: 2021-03-04
tags: ['algorithm', 'competitive-programming']
description: "Some Code related to Binary Lifting"
draft: false
hide: false
---

## Successor paths
[CSES 1750 Planet Queries](https://cses.fi/problemset/task/1750)
``` cpp
/*
Binary Lifting
Competitive Programmer's Handbook
Ch16.3 Successor paths
dp:
          0 1 2 3 4 5 6 7 8 9 
succ(x,1)   3 5 7 6 2 2 1 6 3 
succ(x,2)   7 2 1 2 5 5 3 2 7 
succ(x,4)   3 2 7 2 5 5 1 2 3 
succ(x,8)   7 2 1 2 5 5 3 2 7

Sample Test Case
9 1
3 5 7 6 2 2 1 6 3
4 11
ans: 5
*/

int n, q;
const int maxN = 2e5;
int dp[31][maxN+1];

int main() {
    ios::sync_with_stdio(0); 
    cin.tie(0);

    cin >> n >> q;
    for(int j = 1; j <= n; ++j) { // Init 1 step for each node
        cin >> dp[0][j];
    }

    for(int i = 1; i < 31; ++i) { // Transition from 2^(i-1) step to 2^i step
        for(int j = 1; j <= n; ++j) {
            dp[i][j] = dp[i-1][dp[i-1][j]];
        }
    }

    while(q--) {
        int x, k; // From x move k step
        cin >> x >> k;
        for(int i = 0; i < 31; ++i) {
            if((k>>i)&1) {
                x = dp[i][x];
            }
        }
        cout << x << "\n";
    }
}
```

## K Step Ancestor 
[CSES 1687 Company Queries I](https://cses.fi/problemset/task/1687)
``` cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef vector<int> vi;
typedef vector<vector<int>> vvi;
typedef pair<int, int> pi;

/*
Binary Lifting
*/
// Fill anc by DFS
int n, q;
const int maxN = 2e5;
const int maxS = 18;
vector<int> adj[maxN+1];
int anc[maxN+1][maxS];

void dfs(int u, int p) {
    anc[u][0] = p;
    for(int i = 1; i < maxS; ++i) {
        anc[u][i] = anc[anc[u][i-1]][i-1];
    }
    for(int v : adj[u]) {
        if(v == p) continue;
        dfs(v, u);
    }
}

int main() {
    ios::sync_with_stdio(0); 
    cin.tie(0);

    cin >> n >> q;
    for(int i = 2, a; i <= n; ++i) {
        cin >> a;
        adj[a].push_back(i);
    }

    dfs(1, 0);

    while(q--) {
        int u, k;
        cin >> u >> k;
        for(int i = 0; i < maxS; ++i) {
            if((k>>i)&1) {
                u = anc[u][i];
            }
        }
        if(u==0) cout << -1 << "\n";
        else cout << u << "\n";
    }
}

//// Fill anc by table dp
// int n, q;
// const int maxN = 2e5;
// const int maxS = 18;
// int anc[maxS][maxN+1];

// int main() {
//     ios::sync_with_stdio(0); 
//     cin.tie(0);

//     cin >> n >> q;
//     for(int i = 2, a; i <= n; ++i) {
//         cin >> a;
//         anc[0][i] = a;
//     }

//     while(q--) {
//         int u, k;
//         cin >> u >> k;
//         for(int i = 0; i < maxS; ++i) {
//             if((k>>i)&1) {
//                 u = anc[i][u];
//             }
//         }
//         if(u==0) cout << -1 << "\n";
//         else cout << u << "\n";
//     }
// }
```

## LCA
* O(logn) for lca(u, v)
* [CSES 1688 Company Queries II](https://cses.fi/problemset/task/1688/)
``` cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef vector<int> vi;
typedef vector<vector<int>> vvi;
typedef pair<int, int> pi;

int n, q;
const int maxN = 2e5, maxS = 18;
vector<int> adj[maxN+1];
int level[maxN+1];
int anc[maxN+1][maxS];

void dfs1(int u, int p) {
    anc[u][0] = p;
    for(int i = 1; i < maxS; ++i) {
        anc[u][i] = anc[anc[u][i-1]][i-1];
    }
    for(int v : adj[u]) {
        if(v == p) continue;
        level[v] = level[u] + 1;
        dfs1(v, u);
    }
}

int lift(int u, int k) {
    for(int i = 0; i < maxS; ++i) {
        if((k>>i)&1) {
            u = anc[u][i];
        }
    }
    return u;
}

int lca(int u, int v) {
    if(level[u] < level[v]) swap(u, v);
    u = lift(u, level[u]-level[v]);
    if(u==v) return u;
    for(int i = maxS-1; i >= 0; --i) {
        if(anc[u][i] != anc[v][i]) {
            u = anc[u][i];
            v = anc[v][i];
        }
    }
    return anc[u][0];
}

int main() {
    ios::sync_with_stdio(0); 
    cin.tie(0);

    cin >> n >> q;
    for(int i = 2, a; i <= n; ++i) {
        cin >> a;
        adj[a].push_back(i);
    }

    dfs1(1, 0);
    
    while(q--) {
        int u, v;
        cin >> u >> v;
        cout << lca(u, v) << "\n";
    }
}
```