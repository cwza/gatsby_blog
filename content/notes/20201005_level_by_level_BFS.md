---
title: 'Level by Level Traversal of BST Using BFS'
date: 2020-09-25
tags: ['leetcode', 'algorithm']
draft: false
hide: false
---

## Sample Code
``` python
class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
    def __repr__(self):
        return 'TreeNode({})'.format(self.val)

def bfs(self, root: TreeNode) -> List[int]:
    if root is None: return []
    queue = deque([root])
    result = []
    while queue:
        sz = len(queue)
        result[-1].append([0]*sz)
        for i in range(sz):
            node = queue.popleft()
            result[-1][i] = node.val
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
    return result
'''
Input:
    3
   / \
  9  20
    /  \
   15   7
Returns:
[
  [3],
  [9,20],
  [15,7]
]
'''
```

## LeetCode
[102. Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/submissions/)  
[103. Binary Tree Zigzag Level Order Traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/)  