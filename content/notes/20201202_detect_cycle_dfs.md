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
* You can check this by storing state(init, visiting, visited) of each node while traverse the graph.

## Undirected Graph
* For undirected graph, 1 -> 2, 2 -> 1, the 2 -> 1 is not a back edge.  
That is 1 is direct parent of 2 in dfs tree then the 2 -> 1 can not be a back edge.  
* While dfs pass parent node into function to check if next node is parent or not
* You can check this by storing state and parent of each node while traverse the graph.

## Find the nodes in Cycle
If you want to actually find the nodes in cycle do the following changes:  
1. Store the dfs tree while doing dfs traversal. (ex: dfs tree 1->2->3 then you store it as parent = {1: None, 2: 1, 3: 2})
2. When you find an back edge, just walk back the dfs tree until you meet the node again. Then these nodes are in the cycle.

## Sample Code for Directed Graph
* [CSES 1678 Round Trip II](https://cses.fi/problemset/task/1678/)
``` cpp
#include <bits/stdc++.h>
using namespace std;
#define ll long long
#define ar array

/*
Cycle Detection on Directed Graph
*/

int n, m;
const int maxN = 1e5;
vector<int> adj[maxN]; // u: [v, ...]
int state[maxN]; // 0: init, 1: visiting, 2: visited
int parent[maxN];

void dfs(int u) {
	state[u] = 1;
	for(int v : adj[u]) {
		if(state[v] == 2) continue;
		if(state[v] == 1) {
			vector<int> ans;
			int cur = u;
			ans.push_back(u);
			while(cur != v) {
				ans.push_back(parent[cur]);
				cur = parent[cur];
			}
			ans.push_back(u);
			cout << ans.size() << "\n";
			for(int i = ans.size()-1; i >= 0; i--) cout << ans[i]+1 << " ";
			exit(0);
		}
		parent[v] = u;
		dfs(v);
	}
	state[u] = 2;
}

int main() {
	ios::sync_with_stdio(0); 
	cin.tie(0);
	
	cin >> n >> m;
	fill(parent, parent+n, -1); // -1 indicate there is no parent of it
	for(int i = 0; i < m; i++) {
		int u, v;
		cin >> u >> v; u--; v--;
		adj[u].push_back(v);
	}

	for(int u = 0; u < n; u++) {
		if(state[u] != 0) continue;
		dfs(u);
	}
	cout << "IMPOSSIBLE";
}
```

## Sample Code for Undirected Graph
* [CSES 1669 Round Trip](https://cses.fi/problemset/task/1669/)
``` cpp
#include <bits/stdc++.h>
using namespace std;
#define ll long long
#define ar array

/*
Cycle Detection on Undirected Graph
*/

int n, m;
const int maxN = 1e5;
vector<int> adj[maxN]; // u: [v, ...]
int state[maxN]; // 0: init, 1: visiting, 2: visited
int parent[maxN];

void dfs(int u) {
	state[u] = 1;
	for(int v : adj[u]) {
		if(v == parent[u] || state[v] == 2) continue;
		if(state[v] == 1) {
			vector<int> ans;
			int cur = u;
			ans.push_back(u);
			while(cur != v) {
				ans.push_back(parent[cur]);
				cur = parent[cur];
			}
			ans.push_back(u);
			cout << ans.size() << "\n";
			for(int i = ans.size()-1; i >= 0; i--) cout << ans[i]+1 << " ";
			exit(0);
		}
		parent[v] = u;
		dfs(v);
	}
	state[u] = 2;
}

int main() {
	ios::sync_with_stdio(0); 
	cin.tie(0);
	
	cin >> n >> m;
	fill(parent, parent+n, -1); // -1 indicate there is no parent of it
	for(int i = 0; i < m; i++) {
		int u, v;
		cin >> u >> v; u--; v--;
		adj[u].push_back(v);
		adj[v].push_back(u);
	}

	for(int u = 0; u < n; u++) {
		if(state[u] != 0) continue;
		dfs(u);
	}
	cout << "IMPOSSIBLE";
}
```