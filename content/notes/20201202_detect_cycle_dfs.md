---
title: 'Detect Cycle in Graph by DFS'
date: 2020-12-02
tags: ['algorithm', 'leetcode']
draft: false
hide: false
---

## Brief Explained
There is a cycle in directed graph <=> There is a back edge in directed graph.  
(v1, v2) is back edge if v2 is an ancestor of v1 in the dfs tree.  

For undirected graph, 1 -> 2, 2 -> 1, the 2 -> 1 is not a back edge.  
That is 1 is direct parent of 2 in dfs tree then the 2 -> 1 can not be a back edge.  

## Find the nodes in Cycle
The following sample code just detect cycle. If you want to actually find the nodes in cycle do the following changes:  
1. Store the dfs tree while doing dfs traversal. (ex: dfs tree 1->2->3 then you store it as parent = {1: None, 2: 1, 3: 2})
2. When you find an back edge, just walk back the dfs tree until you meet the node again. Then these nodes are in the cycle.

## Sample Code
``` python
def detect_cycle_directed(graph):
    visit_state: Dict[int, int] = defaultdict(lambda: 0) # 0: initial, 1: exporing, 2: visited
    def dfs(node):
        "Returns True if there is a cycle start from node else False"
        visit_state[node] = 1 # exploring
        for adj in graph[node]:
            if visit_state[adj] == 1: # This adj is an ancestor of node, So this is a back edge
                return True
            elif visit_state[adj] == 0: # if adj is at initial state 
                if dfs(adj):
                    return True
        visit_state[node] = 2 # visited
        return False
    for node in graph.keys():
        if visit_state[node] == 0:
            if dfs(node):
                return True
    return False

graph = {
    1: [2],
    2: [3],
    3: [1],
    4: [5],
    5: []
}
assert detect_cycle_directed(graph) == True

graph = {
    1: [2, 3],
    2: [3],
    3: [],
    4: [5, 6],
    5: [],
    6: [5]
}
assert detect_cycle_directed(graph) == False
```
``` python
def detect_cycle_undirected(graph):
    visit_state: Dict[int, int] = defaultdict(lambda: 0)
    parent: Dict[int, Optional[int]] = defaultdict(lambda: None) # Store dfs tree as parent relationship
    def dfs(node):
        "Returns True if there is a cycle start from node else False"
        visit_state[node] = 1
        for adj in graph[node]:
            if parent[node] != adj and visit_state[adj] == 1: # Check this back edge is not a directed parent relationship
                return True
            elif visit_state[adj] == 0:
                parent[adj] = node # build the dfs tree
                if dfs(adj):
                    return True
        visit_state[node] = 2
        return False
    for node in graph.keys():
        if visit_state[node] != -1:
            if dfs(node):
                return True
    return False

graph = {
    1: [2, 3],
    2: [1, 3],
    3: [1, 2],
    4: [5],
    5: [4]
}
assert detect_cycle_undirected(graph) == True

graph = {
    1: [2],
    2: [1, 3],
    3: [2],
    4: [5],
    5: [4]
}
assert detect_cycle_undirected(graph) == False
```