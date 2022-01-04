---
title: "dfs with dp on DAG"
date: 2022-01-03
tags: ['competitive-programming', 'leetcode', 'algorithm']
draft: false
hide: false
---

## Sample Question
* [CSES Investigation](https://cses.fi/problemset/task/1202)
``` cpp
#include <bits/stdc++.h>
using namespace std;
#define ll long long
#define ar array

int n, m;
const int maxN = 1e5, M = 1e9+7;
const ll inf = 1e18, ninf = -1e18;
vector<ar<int, 2>> adj[maxN];
bool visited[maxN];
ll d[maxN];

vector<ar<int, 2>> adj2[maxN];
bool visited2[maxN];
ll ans1[maxN], ans2[maxN], ans3[maxN];
// ans1: number of minimum-price routes from others to n-1
// ans2: the minimum number of flights in a minimum-price route from others to n-1
// ans3: the maximum number of flights in a minimum-price route from others to n-1

void dfs(int u) {
	visited2[u] = true;

	for(auto [v, w] : adj2[u]) {
		if(!visited2[v]) {
			dfs(v);
		}
		ans1[u] = (ans1[u] + ans1[v]) % M;
		ans2[u] = min(ans2[u], ans2[v] + 1);
		ans3[u] = max(ans3[u], ans3[v] + 1);
	}
}

int main() {
	ios::sync_with_stdio(0); 
	cin.tie(0);
	
	cin >> n >> m;
	for(int i = 0; i < m; i++) {
		int u, v, w;
		cin >> u >> v >> w; u--; v--;
		adj[u].push_back({v, w});
	}

	// Dijkstra to generate d[]
	priority_queue<ar<ll, 2>, vector<ar<ll, 2>>, greater<ar<ll, 2>>> pq;
	fill(d, d+maxN, inf);
	pq.push({0, 0});
	d[0] = 0;
	while(pq.size()) {
		auto [du, u] = pq.top(); pq.pop();
		if(visited[u]) continue;
		visited[u] = true;

		for(auto [v, w] : adj[u]) {
			if(d[u] == inf) continue;
			if(d[v] > d[u]+w) {
				d[v] = d[u] + w;
				pq.push({d[v], v});
			}
		}
	}

	 // Generate Shortest Path Graph which has no cycle
	for(int u = 0; u < n; u++) {
		for(auto [v, w] : adj[u]) {
			if(d[u] + w == d[v]) {
				adj2[u].push_back({v, w});
			}
		}
	}
	cout << d[n-1] << " ";

	// dfs + dp on DAG to find ans
	fill(ans2, ans2+maxN, inf);
	fill(ans3, ans3+maxN, ninf);
	ans1[n-1] = 1;
	ans2[n-1] = 0;
	ans3[n-1] = 0;
	dfs(0);
	cout << ans1[0] << " " << ans2[0] << " " << ans3[0];
}
```