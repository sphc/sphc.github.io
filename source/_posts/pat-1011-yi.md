---
title: PAT 1011.A+B和C
categories: 'PAT题解[乙级]'
mathjax: true
toc: true
tags:
  - PAT
abbrlink: e5abcabb
date: 2017-12-04 20:55:55
---
## 题目
给定区间[-2<sup>31</sup>, 2<sup>31</sup>]内的3个整数A、B和C，请判断A+B是否大于C。

**输入格式：**

输入第1行给出正整数T(<=10)，是测试用例的个数。随后给出T组测试用例，每组占一行，顺序给出A、B和C。整数间以空格分隔。

**输出格式：**

对每组测试用例，在一行中输出"Case #X: true"如果A+B>C，否则输出"Case #X: false",其中X是测试用例的编号（从1开始）。

**输入样例：**

4
1 2 3
2 3 4
2147483647 0 2147483647
0 -2147483648 -2147483647

**输出样例：**

Case #1: false
Case #2: true
Case #3: true
Case #4: false

## 我的解决方案
```c
#include <stdio.h>
#include <stdbool.h>

bool compare(double a, double b, double c)
{ return a + b > c; }

int main(void)
{
    int n, a, b, c;

    scanf("%d", &n);
    for (int i = 0; i < n; ++i) {
        scanf("%d%d%d", &a, &b, &c);
        printf("Case #%d: %s\n", i + 1, compare(a, b, c) ? "true" : "false");
    }

    return 0;
}
```
