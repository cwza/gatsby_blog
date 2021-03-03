---
title: 'Max-Flow Min-Cut'
date: 2021-02-24
tags: ['algorithm', 'competitive-programming']
draft: false
hide: false
---


## Video Explained
* Ford–Fulkerson + Edmonds–Karp algorithm
* Time: O(V*E^2)
* https://www.youtube.com/watch?v=GiN3jRdgxU4

## Max-Flow
1. Generate reverse edges and set the capacity of them to 0, if the flow is 2-way then set the the capacity of them to be the same as normal edge.
2. Run bfs to find a path from source to destination which has only positive capacity
3. Backtrace from this path to find the minimum capacity in this path
4. Use the capacity find from step 3 to decrease the capacity from normal edges and increase the capacity from reverse edges in path
5. Accumulate answer by the number find from step 3
6. Loop step 2 ~ 5 until you can't find any path from step 2
* [CSES 1694 Download Speed](https://cses.fi/problemset/task/1694)
``` cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef vector<int> vi;
typedef vector<vector<int>> vvi;
typedef pair<int, int> pi;

/*
https://www.youtube.com/watch?v=GiN3jRdgxU4
Max-Flow Problem
Ford–Fulkerson + Edmonds–Karp algorithm
Time: O(V*E^2)
*/

struct edge {
    int u, v, rei;
    ll cap;
};

int n, m;
const int maxN = 500, maxM = 1000;
vector<int> adj[maxN]; // u: [edge index]
edge edges[2*maxM]; // normal edge is saved in 2*i, reversed edge is saved in 2*i+1

int main() {
    ios::sync_with_stdio(0); 
    cin.tie(0);

    cin >> n >> m;
    for(int i = 0, u, v, cap; i < m; ++i) {
        cin >> u >> v >> cap; u--; v--;
        edges[2*i] = {u, v, 2*i+1, cap};
        edges[2*i+1] = {v, u, 2*i, 0};
        adj[u].push_back(2*i);
        adj[v].push_back(2*i+1);
    }

    ll maxFlow = 0;
    while(true) {
        // BFS to Find a Positive Weighted Path from src to dest, because of BFS so this path has the minimal number of edges
        queue<int> q; q.push(0);
        bool visited[n]; fill(visited, visited+n, false); visited[0] = true;
        int d[n]; fill(d, d+n, 1e9); d[0] = 0;
        int p[n]; fill(p, p+n, -1); // store the egde index of u->v
        while(q.size()) {
            int u = q.front(); q.pop();
            for(int ei : adj[u]) {
                auto [_, v, rei, cap] = edges[ei];
                if(!visited[v] && cap > 0) {
                    visited[v] = true;
                    if(d[u]==1e9) continue;
                    d[v] = d[u] + 1;
                    p[v] = ei;
                    q.push(v);
                }
            }
        }
        // Use Parent to trace back the path and find the minimum weight
        if(d[n-1] == 1e9) break;
        ll flow = 1e18;
        int v = n-1;
        while(v) {
            int ei = p[v];
            auto [u, _, rei, cap] = edges[ei];
            flow = min(flow, cap);
            v = u;
        }
        maxFlow += flow; // Update maxFlow
        // Use parent to trace back the path and decrease u->v by flow and increase v->u by flow
        v = n-1;
        while(v) {
            int ei = p[v];
            edge &nEdge = edges[ei];
            edge &rEdge = edges[nEdge.rei];
            nEdge.cap -= flow;
            rEdge.cap += flow;
            v = nEdge.u;
        }
    }
    cout << maxFlow;
}
```

## Min-Cut
1. Run Max-Flow to Get New Graph
2. The min-cut edges are the u->v such that u is reachable from source by positive edges and v is not, and the remain capacity from u to v is 0 
* [CSES 1695 Police Chase](https://cses.fi/problemset/task/1695/)
``` cpp
// Run Max-Flow first!!! 
void dfs(int u) {
    for(int ei : adj[u]) {
        auto [_, v, rei, cap] = edges[ei];
        if(!visited[v] && cap > 0) {
            visited[v] = true;
            dfs(v);
        }
    }
}
// Find Min-Cut
// The min-cut edges are u->v that u is reachable from source by positive edges and v is not, and the remain capacity from u to v is 0 
fill(visited, visited+n, false); visited[0] = true;
dfs(0);
for(int i = 0; i < 2*m; ++i) {
    auto [u, v, _, cap] = edges[i];
    if(visited[u] && !visited[v] && cap==0) {
        cout << u+1 << " " << v+1 << "\n";
    }
}
```