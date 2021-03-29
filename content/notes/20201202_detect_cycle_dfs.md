---
title: 'Cycle Detection on Directed Graph and Undirected Graph'
date: 2020-12-02
tags: ['algorithm', 'leetcode']
draft: false
hide: false
---

## Directed Graph
* There is a cycle in directed graph <=> There is a back edge in directed graph.  
(v1, v2) is back edge if v2 is an ancestor of v1 in the dfs tree.  
* You can store visited[] and acting[] array to check back edge

## Undirected Graph
* For undirected graph, 1 -> 2, 2 -> 1, the 2 -> 1 is not a back edge.  
That is 1 is direct parent of 2 in dfs tree then the 2 -> 1 can not be a back edge.  
* While dfs pass parent node into function to check if next node is parent or not
* You can use visited[] array to check cycle on undirected graph

## Find the nodes in Cycle
If you want to actually find the nodes in cycle do the following changes:  
1. Store the dfs tree while doing dfs traversal. (ex: dfs tree 1->2->3 then you store it as parent = {1: None, 2: 1, 3: 2})
2. When you find an back edge, just walk back the dfs tree until you meet the node again. Then these nodes are in the cycle.

## Sample Code for Directed Graph
* [CSES 1678 Round Trip II](https://cses.fi/problemset/task/1678/)
``` cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

/*
Cycle Detection
*/

int n, m;
const int maxN = 1e5;
vector<int> adj[maxN+1]; // u: [v, ...]
bool visited[maxN+1], acting[maxN+1];
int parent[maxN+1];
vector<int> ans;

void dfs(int u) {
    visited[u] = true;
    acting[u] = true;
    for(int v : adj[u]) {
        if(acting[v]) {
            int cur = u;
            ans.push_back(v);
            while(cur!=v) {
                ans.push_back(cur);
                cur = parent[cur];
            }
            ans.push_back(v);
            cout << ans.size() << "\n";
            for(int i = ans.size()-1; i>=0; --i) cout << ans[i] << " ";
            exit(0);
        } 
        if(!visited[v]) {
            parent[v] = u;
            dfs(v);
        }
    }
    acting[u] = false;
}

int main() {
    ios::sync_with_stdio(0); 
    cin.tie(0);

    cin >> n >> m;
    for(int i = 1; i <= m; ++i) {
        int a, b;
        cin >> a >> b;
        adj[a].push_back(b);
    }

    for(int u = 1; u <= n; ++u) {
        if(!visited[u]) {
            dfs(u);
        }
    }
    cout << "IMPOSSIBLE";
}
```

## Sample Code for Undirected Graph
* [CSES 1669 Round Trip](https://cses.fi/problemset/task/1669/)
``` cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

/*
Cycle Detection on Undirected Graph
*/

const int maxN = 1e5;
vector<int> adj[maxN+1];
int n, m;
int parent[maxN+1];
bool visited[maxN+1];
vector<int> ans;

void dfs(int u, int p) {
    visited[u] = true;
    parent[u] = p;
    for(int v : adj[u]) {
        if(v==p) continue;
        if(visited[v]) {
            int cur = u;
            ans.push_back(v);
            while(cur!=v) {
                ans.push_back(cur);
                cur = parent[cur];
            }
            ans.push_back(v);
            cout << ans.size() << "\n";
            for(int i = ans.size()-1; i>=0; --i) cout << ans[i] << " ";
            exit(0);
        } 
        else {
            dfs(v, u);
        }
    }
}

int main() {
    ios::sync_with_stdio(0); 
    cin.tie(0);

    cin >> n >> m;
    for(int i = 1; i <= m; ++i) {
        int a, b;
        cin >> a >> b;
        adj[a].push_back(b);
        adj[b].push_back(a);
    }

    for(int i = 1; i <= n; ++i) {
        if(!visited[i]) {
            dfs(i, 0);
        }
    }
    cout << "IMPOSSIBLE";
}
```