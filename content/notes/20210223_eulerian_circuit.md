---
title: 'Find Eulerian Path and Eulerian Circuit'
date: 2021-02-23
tags: ['algorithm', 'competitive-programming']
draft: false
hide: false
---

## Video Explained
https://www.youtube.com/watch?v=qZrfK2iE4UA

## Pseudo-Code
```
procedure FindEulerPath(V)
  1. iterate through all the edges outgoing from vertex V;
       remove this edge from the graph,
       and call FindEulerPath from the second end of this edge;
  2. add vertex V to the answer.
```

## Find Eulerian Circuit on Undirected Graph
* [CSES 1691 Mail Delivery](https://cses.fi/problemset/task/1691)
* Outdegree of each node should be even
* The number of nodes in answer should be m+1 (Graph should be connected)
``` cpp
set<int> adj[maxN+1]; // u: [v, ...]
vector<int> ans;

void dfs(int u) {
    while(adj[u].size()) {
        int v = *adj[u].begin();
        // Remove 2-dir edge
        adj[u].erase(v);
        adj[v].erase(u);
        dfs(v);
        ans.push_back(v);
    }
}

// Check if Eulerian Circuit Exists

dfs(1);
ans.push_back(1);
reverse(ans.begin(), ans.end());
if(ans.size() != m+1) {
    cout << "IMPOSSIBLE";
    return 0;
}
for(int u : ans) cout << u << " ";
```

## Find Eulerian Path on Directed Graph
* [CSES 1693 Teleporters Path](https://cses.fi/problemset/task/1693)
* For start point, outdegree should be greater than indegree by 1
* For end point, indegree should be greater than outdegree by 1
* For other points, outdegree should be equal to indegree
* The number of nodes in answer should be m+1 (Graph should be connected)
``` cpp
set<int> adj[maxN+1]; // u: [v, ...]
int ind[maxN+1], outd[maxN+1];
vector<int> ans;

void dfs(int u) {
    while(adj[u].size()) {
        int v = *adj[u].begin();
        // Remove edge
        adj[u].erase(v);
        dfs(v);
        ans.push_back(v);
    }
}

// Check if Eulerian Path Exists

dfs(start);
ans.push_back(start);
reverse(ans.begin(), ans.end());
if(ans.size() != m+1) {
    cout << "IMPOSSIBLE";
    return 0;
} 
for(int u : ans) cout << u << " ";
```