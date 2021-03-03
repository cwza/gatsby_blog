---
title: 'Find Connected Components in Undirected Graph'
date: 2020-12-01
tags: ['algorithm', 'leetcode']
draft: false
hide: false
---

## Brief Explained
1. Run dfs on one node, when dfs finished on this node we find a connected component.
2. Run dfs on other node that has not been visited to find more connected components

## Detail Explained
https://www.youtube.com/watch?v=9esCn0awd5k

## Sample Code
``` python
def find_connected_components(graph: dict):
    "Time: O(V+E), Space: O(V)"
    visited = set()
    def dfs(node):
        visited.add(node)
        for adj in graph[node]:
            if adj not in visited:
                dfs(adj)
    result = 0
    for node in graph.keys():
        if node in visited:
            continue
        nodes = dfs(node)
        result += 1
    return result

graph = {
    0: [1],
    1: [0],
    2: [],
}

print(find_connected_components(graph))mponents()
```

## Leetcode
[200. Number of Islands](https://leetcode.com/problems/number-of-islands/)  
[547. Friend Circles](https://leetcode.com/problems/friend-circles/)  