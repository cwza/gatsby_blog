---
title: "Template of dfs and bfs"
date: 2021-12-28
tags: ['competitive-programming', 'leetcode', 'algorithm']
draft: false
hide: false
---

## DFS
``` cpp
int n;
const int maxN = 1e5;
vector<int> adj[maxN];
bool visited[maxN];
int parent[maxN];

void dfs(int u) {
	visited[u] = true;
	for(int v : adj[u]) {
		if(visited[u]) continue;
		parent[v] = u;
		dfs(v);
	}
}

int main() {
	ios::sync_with_stdio(0); 
	cin.tie(0);
	
	for(int u = 0; u < n; u++) {
		if(visited[u]) continue;
		dfs(u);
	}
}
```

## BFS
``` cpp
int n;
const int maxN = 1e5;
vector<int> adj[maxN];
bool visited[maxN];
int parent[maxN];

int main() {
	ios::sync_with_stdio(0); 
	cin.tie(0);
	
	queue<int> q;
	q.push(0);
	visited[0] = true;

	while(q.size()) {
		int u = q.front(); q.pop();
		for(int v : adj[u]) {
			if(visited[v]) continue;
			visited[v] = true;
			parent[v] = u;
			q.push(v);
		}
	}
}
```