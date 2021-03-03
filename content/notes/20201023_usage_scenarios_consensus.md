---
title: 'Usage Scenarios of Consensus Services'
date: 2020-10-23
tags: ['distributed-system']
draft: false
hide: false
---

## Consensus algorithm
All nodes agree the same thing

## Distributed services that implement consensus algorithm
ZooKeeper, etcd.  
They are all single leader architecture and they have linearizability(strong consistent).

## Situations that you need consensus
When you need HA version of followings, consider to use Zookeeper.

* Single leader election
    + Use global lock
* Store configurations of each node, ex: Partition infos node1: [10, 20, 33], node2: [100, 123, 145] ... 
* Monotonic sequential id across partitions
    + Do multiple consensus
* Global lock
    + Fencing tokens need monotonic sequential generator
    + About fencing tokens see DDIA page303
* Unique constraints across partitions
    + You need monotonic sequential generator to decide which request is the first, then you can rule out others
* Sirealiability(Isolation level) across partitions
    + MVCC need monotonic sequential generator
* Linearizability(Strong consistency)
    + See DDIA page350
