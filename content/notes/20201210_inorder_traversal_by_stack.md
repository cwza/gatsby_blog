---
title: 'Implement in-order traversal using stack instead of recursion'
date: 2020-12-10
tags: ['algorithm', 'leetcode']
draft: false
hide: false
---

## Recursion
``` python
def in_order(root):
    result = []
    def helper(node):
        if node.left: helper(node.left)
        result.append(node.val)
        if node.right: helper(node.right)
    helper(root)
    return result
'''
     7
    . .
   3   15
       . .
      9  20
'''
root = deserialize("[7,3,15,null,null,9,20]")
print(in_order(root)) # [3, 7, 9, 15, 20]
```

## Stack
1. Push all left childs to stack
2. Pop node from stack and print it
3. if this node have right child: push all left childs of this right child to stack
4. Loop 2, 3 until stack is empty
``` python
from collections import deque
def in_order(root):
    if root is None: return []
    stack = deque()
    result = []
    def helper(node):
        "put all left childs of node to stack"
        while node:
            stack.append(node)
            node = node.left
    helper(root)
    while stack:
        cur = stack.pop()
        result.append(cur.val)
        if cur.right:
            helper(cur.right)
    return result
'''
     7
    . .
   3   15
       . .
      9  20
'''
root = deserialize("[7,3,15,null,null,9,20]")
print(in_order(root))
```

## LeetCode
[173. Binary Search Tree Iterator](https://leetcode.com/problems/binary-search-tree-iterator)