---
title: 'Shortest path algorithms'
date: 2020-12-15
tags: ['algorithm', 'leetcode']
draft: false
hide: false
---

## Videos Explained
https://www.youtube.com/watch?v=Aa2sqUhIn-E
https://www.youtube.com/watch?v=2E7MmKv0Y24
https://www.youtube.com/watch?v=ozsuci5pIso

## Notations
* delta[s, u]: optimal minimal distance from s to u 
* d[u]: current minimal distance from s to u (be updated during algorithm)
* w[u, v]: weight of edge u->v
* pi[v]: current parent of v for minimal path

## Relax
``` python
def relax(u, v, w):
    if d[v] > d[u] + w(u, v):
        d[v] = d[u] + w(u, v)
        pi[v] = u
def general_alg(src)
    d[src] = 0
    d[others] = inf
    pi[all] = None
    
    while True:
        Select an edge (u, v) # How to select? Different algorithm 
        relax(u, v, w)
        if all edge have d[v] <= d[u] + w(u, v):
            break
```

## Algorithm for DAG
* O(V+E)
* No cycle, can be used on negative edge
* DP algorithm
```
1. Topological sort the DAG
2. One pass over vertices in topologically sorted order relaxes each edge that leave each vertex.(You can start from source vertex, the points on the left of source will always be infinity)
```

## Dijkstra
* O(VlogV+E): Use fibonacci heap for O(1) update O(logn) delete
* No negative edge, can be used on cycle
* Greedy algorithm
``` python
inf = float("+inf")
def dijkstra(src)
    d[src] = 0
    d[others] = inf
    pi[all] = None

    q = PriorityQueue([(0, src)]) # (d[v], node), d[v] as priority, initially d[src] = 0, d[other nodes] = infinity
    visited = set()
    while q:
        du, u = q.extract_min() # get and remove min
        # At this time, Dijkstra algorithm quarantees that d[u] is already equals to delta[s, u]
        #  Because our priority queue can't be update so we need visited to skip something that already done
        if u in visited: 
            continue 
        visited.add(u)
        for v in u.adjs:
            # Relax and Update priority
            if d[u] == inf: 
                continue
            if d[v] > d[u] + w(u, v):
                d[v] = d[u] + w(u, v)
                pi[v] = u
                q.push(d[v], v) # update the priority of v
```

## Bellman-Ford
* O(VE)
* Can be used on negative cycles
* It can't be used on finding shortest path on negative cycles, it only can detect negative cycle and abort
``` python
inf = float("+inf")
ninf = float("-inf")
def bellman_ford(src):
    d[src] = 0
    d[others] = inf
    pi[all] = None

    # do N-1 times relax on each edges
    for _ in range(N-1): # N: number of nodes
        for each edge (u, v):
            if d[u] == inf: continue;
            if d[v] > d[u] + w(u, v):
                d[v] = d[u] + w(u, v)
                pi[v] = u
    # do another N-1 times, find the nodes that inside cycle and set their dist to -inf
    for _ in range(N-1):
        for each edge (u, v):
            if d[u] == inf: continue;
            if d[v] > d[u] + w(u, v):
                d[v] = ninf
```

## Generate Shortest Path Tree Graph: Guaranteed to Have No Cycle
1. Generate d[] from Dijkstra or Bellman-Ford
2. Run following
``` python
for each edge (u, v, w):
    if(d[u]+w == d[v]):
        add (u, v, w) to shortest path tree graph
```

## Floyed-WarShall
* O(V^3)
* Used on all pairs shortest path problem
* https://www.youtube.com/watch?v=NzgFUwOaoIw&list=PLUl4u3cNGP6317WaSNfmCvGym2ucw3oGp&index=15
``` python
"dist[u][v]: shortest dist from node u to node v"
"w[u][v]: length of edge (u, v), actually w is the adjacency matrix"
# Initialize dist[u][v] from adjacency matrix, If u->v have more than one edge, We need to take the smallest one
inf = float("+inf")
for u in range(n):
    for v in range(n):
        if u==v: dist[u][v] = 0
        elif w[u][v]: dist[u][v] = w[u][v] # If u->v have more than one edge, We need to take the smallest one
        else: dist[u][v] = inf
# DP
"""
Subproblem:
    d[k][u][v]: shortest path whose intermediate vertices in {0, 1, 2, ..., k}
Guess:
    choose to go though k or not through k
Recursive relation:
    d[k][u][v] = min(d[k-1][u][v], d[k-1][u][k] + d[k-1][k][v] 
    d[0][u][v] = w[u][v] (the direct edge of u, v)
If we loop k from 0 to n-1, then we can reduce the space from 3D to 2D, because the [k-1] is the value in the previous loop, and they are already in the dist array.
"""
for k in range(n):
    for u in range(n):
        for v in range(n):
            # Just a relax
            if dist[u][k] == inf or dist[k][v] == inf: continue
            if dist[u][v] > dist[u][k] + dist[k][v]:
                dist[u][v] = dist[u][k] + dist[k][v]
                # dist[u][v] = min(dist[u][v], dist[u][k]+dist[k][v])
```

## Longest path or Shortest path on negative cycle
NP-Hard problem, no polynomial time solution

## CSES problems
[Dijkstra practice](https://cses.fi/problemset/task/1671)
[Floyed-Warshall practice](https://cses.fi/problemset/task/1672)
[Bellman-Ford practice](https://cses.fi/problemset/task/1673)