---
title: 'Find Minimum Spanning Tree by Kruskal and Prim'
date: 2021-01-12
tags: ['algorithm', 'competitive-programming']
draft: false
hide: false
---

## Explain
https://www.youtube.com/watch?v=tKwnms5iRBU&list=PLUl4u3cNGP6317WaSNfmCvGym2ucw3oGp&index=16

## Kruskal
The implementation of DisjointSet can be find in this blog by searching "Union Find".
``` python
def kruskal(nodes, edges):
    "Time: O(ElogE)"
    "edge: (u, v, w)"
    d_set = DisjointSet()
    d_set.make_sets(nodes)
    edges = sorted(edges, key=lambda edge: edge[2])
    tree = []
    for u, v, w in edges:
        if d_set.union(u, v):
            tree.append((u, v, w))
    return tree

"""
 ...2...3...
1   .   .   4
 ...5...6...
"""
nodes = [1, 2, 3, 4, 5, 6]
edges = [(1, 2, 3), (2, 3, 5), (3, 4, 9), (1, 5, 5), (5, 6, 2), (6, 4, 7), (2, 5, 6), (3, 6, 3)]
tree = kruskal(nodes, edges)
print(tree) # [(5, 6, 2), (1, 2, 3), (3, 6, 3), (2, 3, 5), (6, 4, 7)]
```


## Prim
``` python
def prim(graph):
    "Time: O(VlogV+ElogE)"
    import heapq
    init_node = list(graph.keys())[0]
    pq = [(0, init_node, None)] # (priority, node, parent)
    done = set()
    tree = {} # node: parent
    while pq:
        _, node, parent = heapq.heappop(pq)
        if node not in done:
            tree[node] = parent
        done.add(node)
        for adj_node, w in graph[node]:
            if adj_node not in done:
                heapq.heappush(pq, (w, adj_node, node))
    return tree


graph = {
    1: [(2, 3), (5, 5)], 
    2: [(1, 3), (3, 5), (5, 6)], 
    3: [(2, 5), (4, 9), (6, 3)], 
    4: [(3, 9), (6, 7)], 
    5: [(1, 5), (6, 2), (2, 6)], 
    6: [(5, 2), (4, 7), (3, 3)]
}
tree = prim(graph)
print(tree) # {1: None, 2: 1, 3: 2, 6: 3, 5: 6, 4: 6}
```