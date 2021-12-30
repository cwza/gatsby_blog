---
title: 'Topological Sort'
date: 2020-11-04
tags: ['algorithm', 'leetcode']
draft: false
hide: false
---

## Using BFS
https://www.csie.ntu.edu.tw/~sprout/algo2017/ppt_pdf/topological_sort.pdf

Intuition:
1. 找到一個入度為 0 的點 𝑝
2. 把 𝑝 和它的出度都拔掉，形成 𝐺′
3. 遞迴求解 𝐺′ 的 topological order，然後接在 𝑝 後面形成 𝐺 的 topological order

BFS Modified Implementation:
1. 初始將所有入度為 0 的點都推入 queue
2. 從 queue 中取出元素 p
3. 將 𝑝 的出度都移除掉，並維護各個點的入度值
4. 如果某點在上步驟執行後入度變為 0，則將該點推入 queue
5. 若 queue 不為空，回到步驟 2
6. 當queue為空時，若還有入度非0的點 則該圖不存在拓撲排序(i.e.有環)
7. 否則取出的順序即為拓撲排序

## BFS Sample Code
``` python
from collections import deque
def topo_sort(graph):
    "Time: O(V+E), Space: O(V)"
    # Build node_to_indegree
    node_to_indegree = {node: 0 for node in graph.keys()}
    for _, adjs in graph.items():
        for adj in adjs:
            node_to_indegree[adj] += 1
    # Put 0 degree node into queue
    q = deque()
    for node, indegree in node_to_indegree.items():
        if indegree == 0:
            q.append(node)
    # Run BFS Modified Alg.
    result = []
    while q:
        node = q.popleft()
        result.append(node)
        # Remove the outdegree of node, and maintain indegrees
        for adj in graph[node]:
            node_to_indegree[adj] -= 1
            # Push the indegree 0 nodes into queue
            if node_to_indegree[adj] == 0:
                q.append(adj)
    if len(result) == len(graph): return result # Topo_sort exists
    else: return None # There is a cycle in this graph

graph = {0:[1,2], 1:[3], 2:[3], 3:[], 4:[5], 5:[]}
print(topo_sort(graph)) # [0, 4, 1, 2, 5, 3]
graph = {0:[1,2], 1:[3], 2:[3], 3:[0], 4:[5], 5:[]}
print(topo_sort(graph)) # None
```

## Using DFS
1. Check cycle by finding back edge
2. Run DFS, get the sequence by dfs end timestamp order
3. Reverse the sequence get by step 2

## DFS Sample Code
``` python
def topo_sort(graph):
    "Time: O(V+E), Space: O(V)"
    visit_state: Dict[int, int] = defaultdict(lambda: 0)
    result = []
    def dfs(node):
        visit_state[node] = 1
        for adj in graph[node]:
            if visit_state[adj] == 1: # Find back edge, Graph has cycle
                return False
            if visit_state[adj] == 0: 
                if dfs(adj) == False:
                    return False
        visit_state[node] = 2
        result.append(node)   # Build the seq order by dfs end timstamp
        return True
    for node in graph.keys():
        if visit_state[node] == 0:
            if dfs(node) == False:
                return None
    return list(reversed(result))

graph = {0:[1,2], 1:[3], 2:[3], 3:[], 4:[5], 5:[]}
print(topo_sort(graph)) # [4, 5, 0, 2, 1, 3]

graph = {0:[1,2], 1:[3], 2:[3], 3:[0], 4:[5], 5:[]}
print(topo_sort(graph)) # None
```
* [CSES Course Schedule](https://cses.fi/problemset/task/1679/)
``` cpp
#include <bits/stdc++.h>
using namespace std;
#define ll long long
#define ar array

// topological sort

int n, m;
const int maxN = 1e5;
vector<int> adj[maxN];
vector<int> ans;
int state[maxN]; // init: 0, visiting: 1, visited: 2

void dfs(int u) {
	state[u] = 1;
	for(int v : adj[u]) {
		if(state[v] == 2) continue;
		if(state[v] == 1) {
			cout << "IMPOSSIBLE";
			exit(0);
		}
		dfs(v);
	}
	ans.push_back(u);
	state[u] = 2;
}

int main() {
	ios::sync_with_stdio(0); 
	cin.tie(0);
	
	cin >> n >> m;
	for(int i = 0; i < m; i++) {
		int u, v;
		cin >> u >> v; u--; v--;
		adj[u].push_back(v);
	}

	for(int u = 0; u < n; u++) {
		if(state[u] != 0) continue;
		dfs(u);
	}

	reverse(ans.begin(), ans.end());
	for(int a : ans) cout << a+1 << " ";
}
```

## Leetcode
[210 Course Schedule II](https://leetcode.com/problems/course-schedule-ii/)