---
title: "Find Strongly Connected Components and Generate Compressed Graph by Kosaraju's algorithm"
date: 2020-12-08
tags: ['algorithm', 'leetcode']
draft: false
hide: false
---

## Brief Explained
1. Run dfs on original graph, push nodes into stack by dfs end time order
2. Reverse the graph to get rgraph
3. Run dfs on rgraph by the stack poped order
* Note that in dfs2 Kosaraju's algorithm will proccess the nodes(grouped) by topological sort!!! This fact is useful if you want to run some DP on compressed graph

## Detailed Explained of Kosaraju's algorithm
https://www.youtube.com/watch?v=RpgcYiky7uw&t=57s

## Sample Code
``` python
from collections import defaultdict, deque
def build_scc(graph):
    "Kosaraju's algorithm"
    #1 Push nodes into stack by dfs end time order
    visited = set()
    stack = deque()
    def dfs1(node):
        if node is None: return
        visited.add(node)
        for adj in graph[node]:
            if adj not in visited:
                dfs1(adj)
        stack.append(node)
    for node in graph.keys():
        if node not in visited:
            dfs1(node)
    #2 Build the reversed graph
    rgraph = defaultdict(set)
    for u, adjs in graph.items():
        for v in adjs:
            rgraph[v].add(u)
    #3 Run 2nd DFS by stack order to build parent
    visited = set()
    parent = {} # { node: group_parent }
    def dfs2(root, node):
        if node is None: return
        visited.add(node)
        parent[node] = root
        for adj in rgraph[node]:
            if adj not in visited:
                dfs2(root, adj)
    while stack:
        node = stack.pop()
        if node not in visited:
            dfs2(node, node)
    #4 Build compressed graph
    compressed_graph = {parent: set() for parent in set(parent.values())}
    for u, adjs in graph.items():
        for v in adjs:
            if parent[u] != parent[v]:
                compressed_graph[parent[u]].add(parent[v])

    return parent, compressed_graph

graph = {
    1: set([2]),
    2: set([3]),
    3: set([1, 5]),
    4: set([5]),
    5: set([6]),
    6: set([4]),
    7: set([6]),
}
parent, compressed_graph = build_scc(graph)
print(parent) # {7: 7, 1: 1, 3: 1, 2: 1, 5: 5, 4: 5, 6: 5}
print(compressed_graph) # {1: {5}, 5: set(), 7: {5}}
```