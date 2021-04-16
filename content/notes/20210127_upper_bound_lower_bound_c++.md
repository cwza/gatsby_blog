---
title: 'Usage of upper_bound and lower_bound in C++'
date: 2021-01-27
tags: ['c++', 'competitive-programming']
draft: false
hide: false
---

## 如果是在從小到大的排序陣列中：
* `lower_bound( begin,end,num)`：從陣列中查詢`第一個大於或等於num的數字`，找到返回iterator，不存在則返回end。通過返回的iterator減去begin,得到找到數字在陣列中的下標。
``` cpp
vi arr = {1, 3, 5, 5, 7};
auto iter = lower_bound(arr.begin(), arr.end(), 2);
cout << iter - arr.begin() << " " << *iter << "\n"; // 1 3
iter = lower_bound(arr.begin(), arr.end(), 5);
cout << iter - arr.begin() << " " << *iter << "\n"; // 2 5
iter = lower_bound(arr.begin(), arr.end(), 8);
cout << iter - arr.begin() << "\n\n"; // 5
```
* `upper_bound( begin,end,num)`：從陣列中查詢`第一個大於num的數字`，找到返回iterator，不存在則返回end。通過返回的iterator減去begin,得到找到數字在陣列中的下標。
``` cpp
arr = {1, 3, 5, 5, 7};
iter = upper_bound(arr.begin(), arr.end(), 5);
cout << iter - arr.begin() << " " << *iter << "\n"; // 4 7
iter = upper_bound(arr.begin(), arr.end(), 7);
cout << iter - arr.begin() << "\n\n"; // 5
```

## 如果是在從大到小的排序陣列中：
* `lower_bound( begin,end,num,greater() )`:從陣列中查詢`第一個小於或等於num的數字`，找到返回iterator，不存在則返回end。通過返回的iterator減去begin,得到找到數字在陣列中的下標。
``` cpp
arr = {7, 5, 5, 3, 1};
iter = lower_bound(arr.begin(), arr.end(), 4, greater());
cout << iter - arr.begin() << " " << *iter << "\n"; // 3 3
iter = lower_bound(arr.begin(), arr.end(), 5, greater());
cout << iter - arr.begin() << " " << *iter << "\n"; // 1 5
iter = lower_bound(arr.begin(), arr.end(), 0, greater());
cout << iter - arr.begin() << "\n\n"; // 5
```
* `upper_bound( begin,end,num,greater() )`:從陣列中查詢`第一個小於num的數字`，找到返回iterator，不存在則返回end。通過返回的iterator減去begin,得到找到數字在陣列中的下標。
``` cpp
arr = {7, 5, 5, 3, 1};
iter = upper_bound(arr.begin(), arr.end(), 5, greater());
cout << iter - arr.begin() << " " << *iter << "\n"; // 3 3
iter = upper_bound(arr.begin(), arr.end(), 1, greater());
cout << iter - arr.begin() << "\n\n"; // 5
```

## More
* 要找`第一個小於或等於num的數字`也可以使用從小到大的陣列, 只要用`upper_bound(begin, end, num)--`, 意思就是找到第一個大於num的那個iterator再減1
``` cpp
arr = {1, 3, 5, 5, 7}
iter = upper_bound(arr.begin(), arr.end(), 4)-1;
cout << iter - arr.begin() << " " << *iter << "\n"; // 1 3
iter = upper_bound(arr.begin(), arr.end(), 5)-1;
cout << iter - arr.begin() << " " << *iter << "\n"; // 3 5
iter = upper_bound(arr.begin(), arr.end(), 0);
cout << iter == arr.begin() << "\n\n"; // true
```
* 同理要找`第一個小於num的數字`並使用從小到大的陣列, 可以用`lower_bound(begin, end, num)--`, 意思就是找到第一個大於或等於num的那個iterator再減1
``` cpp
arr = {1, 3, 5, 5, 7};
iter = lower_bound(arr.begin(), arr.end(), 5)-1;
cout << iter - arr.begin() << " " << *iter << "\n"; // 1 3
iter = lower_bound(arr.begin(), arr.end(), 1);
cout << iter == arr.begin() << "\n\n"; // true
```
* 須注意的是若回傳的iterator==begin則代表找不到


## array<int, 2>
常常我們會在vector中存入array<int, 2>第一個存value, 第二個存index, 在此情形下我們需要一些特殊處理
``` cpp
lower_bound(arr.begin(), arr.end(), {4});
upper_bound(arr.begin(), arr.end(), {4, (int)1e9});
lower_bound(arr.begin(), arr.end(), {4, (int)1e9}, greater<ar<int, 2>>());
upper_bound(arr.begin(), arr.end(), {4}, greater<ar<int, 2>>());
```