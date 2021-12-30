---
title: "Find Strongly Connected Components and Generate Compressed Graph by Kosaraju's and Tarjan's Algorithm"
date: 2020-12-08
tags: ['algorithm', 'leetcode']
draft: false
hide: false
---

# Kosaraju's Algorithm

## Brief Explained
1. Run dfs on original graph, push nodes into stack by dfs end time order
2. Reverse the graph to get rgraph
3. Run dfs on rgraph by the stack poped order
* Note that in dfs2 Kosaraju's algorithm will proccess the nodes(grouped) by topological sort!!! This fact is useful if you want to run some DP on compressed graph

## Detailed Explained of Kosaraju's algorithm
https://www.youtube.com/watch?v=RpgcYiky7uw&t=57s

## Sample Code
* [CSES 1682 Flight Routes Check](https://cses.fi/problemset/task/1682/)
``` cpp
#include <bits/stdc++.h>
using namespace std;
#define ll long long
#define ar array

// Strongly Connected Component

int n, m;
const int maxN = 1e5;
vector<int> adj1[maxN], adj2[maxN];
bool visited1[maxN], visited2[maxN];
vector<int> rtop;
int who[maxN];

void dfs1(int u) {
	visited1[u] = true;
	for(int v : adj1[u]) {
		if(visited1[v]) continue;
		dfs1(v);
	}
	rtop.push_back(u);
}

void dfs2(int s, int u) {
	visited2[u] = true;
	who[u] = s;
	for(int v : adj2[u]) {
		if(visited2[v]) continue;
		dfs2(s, v);
	}
}

int main() {
	ios::sync_with_stdio(0); 
	cin.tie(0);
	
	cin >> n >> m;
	for(int i = 0; i < m; i++) {
		int u, v;
		cin >> u >> v; u--; v--;
		adj1[u].push_back(v);
		adj2[v].push_back(u);
	}

	for(int u = 0; u < n; u++) {
		if(visited1[u]) continue;
		dfs1(u);
	}

	vector<int> ans;
	for(int i = rtop.size()-1; i >= 0; i--) {
		int u = rtop[i];
		if(visited2[u]) continue;
		ans.push_back(u);
		dfs2(u, u);
	}

	if(ans.size() == 1) {
		cout << "YES";
		return 0;
	}
	cout << "NO\n";
	cout << ans[1]+1 << " " << ans[0]+1;
}
```

# Tarjan's Algorithm

## Sample Code
* [CSES 1682 Flight Routes Check](https://cses.fi/problemset/task/1682/
``` cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef vector<int> vi;
typedef vector<vector<int>> vvi;
typedef pair<int, int> pi;

/*
Strongly Connected Component by Tarjan's Algorithm
*/
int n, m;
const int maxN = 1e5;
vector<int> adj[maxN+1];
bool vis[maxN+1], act[maxN+1];
int disc[maxN+1], low[maxN+1];
int t = 1;
vector<int> roots;
stack<int> s;
int who[maxN+1];

void dfs(int u) {
    vis[u] = true;
    act[u] = true;
    disc[u] = t;
    low[u] = t;
    s.push(u);
    t++;
    for(int v : adj[u]) {
        if(act[v]) { // back edge in same component
            low[u] = min(low[u], disc[v]);
        }
        if(!vis[v]) { // tree edge
            dfs(v);
            low[u] = min(low[u], low[v]);
        }
    }
    if(disc[u]==low[u]) {
        // u is the root of new component
        roots.push_back(u);
        vector<int> group;
        while(s.top()!=u) {
            who[s.top()] = u;
            act[s.top()] = false;
            s.pop();
        }
        who[s.top()] = u;
        act[s.top()] = false;
        s.pop();
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
    }

    for(int u = 1; u <= n; ++u) {
        if(!vis[u]) {
            dfs(u);
        }
    }
    if(roots.size()==1) {
        cout << "YES";
        return 0;
    }
    cout << "NO\n";
    cout << roots[0] << " " << roots[1];
}
```