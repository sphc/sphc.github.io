---
title: PAT 1056.组合数的和
categories: 'PAT题解[乙级]'
mathjax: true
toc: true
tags:
  - PAT
abbrlink: c0405eb8
date: 2017-12-04 20:56:27
---
## 题目
给定N个非0的个位数字，用其中任意2个数字都可以组合成1个2位的数字。要求所有可能组合出来的2位数字的和。例如给定2、5、8，则可以组合出：25、28、52、58、82、85，他们的和为330.

**输入格式：**

输入在一行中先给出N（1<N<10），随后是N个不同的非0个位数字。数字间以空格分隔。

**输出格式：**

输出所有可能组合出来的2位数字的和。

**输入样例：**

3 2 8 5

**输出样例：**

330

## 我的解决方案
```c
#include <stdio.h>
#include <stdlib.h>

int combine(int a, int b)
{ return a * 10 + b; }

int combineSum(int *nums, int size)
{
    int sum = 0;

    for (int i = 0; i < size; ++i) {
        for (int j = 0; j < size; ++j) {
            if (i != j) {
                sum += combine(nums[i], nums[j]);
            }
        }
    }

    return sum;
}

int main(void)
{
    int n;
    int *nums;

    scanf("%d", &n);
    nums = malloc(sizeof(int) * n);
    for (int i = 0; i < n; ++i) {
        scanf("%d", nums + i);
    }
    printf("%d\n", combineSum(nums, n));

    return 0;
}
```
