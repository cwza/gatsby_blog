---
title: 'Print Negative Cycle in Graph by Modified Bellman-Ford'
date: 2021-02-18
tags: ['algorithm', 'competitive-programming']
draft: false
hide: false
---

## Video Explained
https://www.youtube.com/watch?v=kZfm68XKC5

## CSES Problem
[1197-Cycle Finding](https://cses.fi/problemset/task/1197/)

## First Step
* Add another node to graph and connect it to all other nodes with weight 0, because the graph may be unconnected and we need to run single source algorithm on it.
* Initialize d[] to be all 0
``` python
edges = [(a, b, w), ...] # a->b with weight w
for i in range(1, n+1) edges.append((0, i, 0))
d = [0] * N
```

## Second Step
* Run n-1 times relax, and record the parent pointer while relax
``` python
parent = [0] * N
for _ in range(N-1): # N: number of nodes
    for each edge (u, v):
        if d[v] > d[u] + w(u, v):
            d[v] = d[u] + w(u, v)
            parent[v] = u
```

## Third Step
* Run the nth relax to detect negative cycle
``` python
int cycleStart = -1
for each edge (u, v):
    if d[v] > d[u] + w(u, v):
        cycleStart = v
        break
if cycleStart == -1:
    print("No Negative Cycle")
```

## Forth Step
* Run n-1 times backtrace based on parent[] to find the node in negative cycle
``` python
for i in range(N-1):
    cycleStart = parent[cycleStart]
```

## Fifth Step
* Backtrace based on parent and cycle node from above to print all nodes in cycle.
``` python
ans = []
cur = cycleStart
while True:
    ans.append(cur)
    cur = parent[cur]
    if cur==cycleStart:
        break
ans.append(cycleStart)
ans = ans[::-1]
```