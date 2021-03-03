---
title: 'Maximum Bipartite Matching'
date: 2021-02-25
tags: ['algorithm', 'competitive-programming']
draft: false
hide: false
---

## Detailed Explained
https://www.geeksforgeeks.org/maximum-bipartite-matching/

## Solution 1
* Use Max-Flow
1. Add source and sink, connect all applicants to source and all job to sink
2. Run max-flow
3. The edge that start from applicant end with job and capacity is 0 are answers

## Solution 2
u as applicant, v as job, for all u we do this:
* We try to assign v to u
* if v is free then assign it to u
* if v has been assigned to some u' before, we ask if u' can take another job, if he can, then we reassign that job to u' and assign v to u
* if u' can't find another free job, then we do not assign v to u
* try another job

## Sample Code of Solution2
* [CSES 1696 School Dance](https://cses.fi/problemset/task/1696/)
``` cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef vector<int> vi;
typedef vector<vector<int>> vvi;
typedef pair<int, int> pi;

/*
Maximum Bipartite Matching
Solution 1: DFS, Easy to implement but hard to understand
https://www.geeksforgeeks.org/maximum-bipartite-matching/

Idea:
u as applicant, v as job
for all u we do this:
  * We try to assign v to u
  * if v is free then assign it to u
  * if v has been assigned to some u' before, we ask if u' can take another job, if he can, then we reassign that job to u' and assign v to u
  * if u' can't find another free job, then we do not assign v to u
  * try another job
*/

int n, m, k;
const int maxN = 500, maxM = 500;
bool bpGraph[maxN][maxM]; // bpGraph[1][2] is true if boy1 want to dance with girl2
bool seen[maxM];
int assign[maxM]; // girl: boy

bool match(int u) {
    for(int v = 0; v < m; v++) {
        if(bpGraph[u][v]) {
            if(seen[v]) continue;
            seen[v] = true;
            if(assign[v]==-1 || match(assign[v])) {
                assign[v] = u;
                return true;
            }
        }
    }
    return false;
}

int main() {
    ios::sync_with_stdio(0); 
    cin.tie(0);

    cin >> n >> m >> k;
    for(int i = 0, u, v; i < k; ++i) {
        cin >> u >> v; u--; v--;
        bpGraph[u][v] = true;
    }

    int maxNumMatch = 0;
    fill(assign, assign+m, -1);
    for(int u = 0; u < n; ++u) {
        fill(seen, seen+m, false);
        if(match(u)) {
            maxNumMatch++;
        }
    } 

    cout << maxNumMatch << "\n";
    for(int i = 0; i < m; ++i) {
        if(assign[i]!=-1) {
            cout << assign[i]+1 << " " << i+1 << "\n";
        }
    }
}
```