---
title: 'Union Find'
date: 2020-12-01
tags: ['algorithm', 'leetcode']
draft: false
hide: false
---

## Algorithm Explanined
https://www.youtube.com/watch?v=ID00PMy0-vE

## Sample Code
* O(logn) for find and unite
### General Version
* More General: use map so we can use string to represent node
``` python
from typing import Dict, Any, List
class DisjointSet:
    class Node:
        def __init__(self, data: Any, rank: int):
            self.data = data
            self.rank = rank
            self.parent: "DisjointSet.Node"
    def __init__(self):
        "Space: O(n)"
        self.map: Dict[Any, "DisjointSet.Node"] = {}
    def make_set(self, data: Any):
        node = DisjointSet.Node(data, 0)
        node.parent = node
        self.map[data] = node
    def make_sets(self, datas: List[Any]):
        for data in datas:
            self.make_set(data)
    def union(self, data1: Any, data2: Any) -> bool:
        "Time: O(1)"
        "Combine the 2 sets which contains data1 and data2"
        "If data2 is already in the same set as data1 this function will return False"
        node1, node2 = self.map[data1], self.map[data2]
        parent1, parent2 = self._find(node1), self._find(node2)
        if parent1 == parent2:
            return False
        if parent1.rank >= parent2.rank:
            if parent1.rank == parent2.rank:
                parent1.rank += 1
            parent2.parent = parent1
        else:
            parent1.parent = parent2
        return True
    def find_set(self, data: Any) -> "DisjointSet.Node":
        "Time: O(1)"
        "returns the root of sets which include data"
        return self._find(self.map[data]).data
    def _find(self, node: "DisjointSet.Node"):
        parent = node.parent
        if node == parent:
            return parent
        node.parent = self._find(node.parent)
        return node.parent
        
ds = DisjointSet()
ds.make_sets([i for i in range(1, 8)])
ds.union(1, 2)
ds.union(2, 3)
ds.union(4, 5)
ds.union(6, 7)
ds.union(5, 6)
ds.union(3, 7)
print([ds.find_set(i) for i in range(1, 8)]) # [4, 4, 4, 4, 4, 4, 4, 4]
```
## Simple Version
* Good for competitive programming.
``` python
link = [i for i in range(n)]
size = [1 for i in range(n)]
def find(x):
    while x != link[x]:
        x = link[x]
    return x
def unite(x, y):
    x = find(x)
    y = find(y)
    if x == y: return False
    # link smaller one to larger one to keep O(logn) finding
    if(size[x] < size[y]):
        x, y = y, x
    link[y] = x
    size[x] += size[y]
```

## Detect cycle
We can use union find algorithm to detect if a new edge will cause cycle in the graph.  
This has been used in kruskal's algorithm for finding minimum spanning tree.  
* use union (u, v) to add edge (u, v)
* if find(u) == find(v): then this edge may cause cycle

## Leetcode
[684. Redundant Connection](https://leetcode.com/problems/redundant-connection/)  
[547. Friend Circles](https://leetcode.com/problems/friend-circles/)  