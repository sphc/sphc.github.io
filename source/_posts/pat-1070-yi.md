---
title: PAT 1070.结绳
mathjax: true
toc: true
categories: 'PAT题解[乙级]'
tags:
  - PAT
abbrlink: bfa1d21b
date: 2018-01-25 16:46:45
---
## 题目
给定一段一段的绳子，你需要把它们串成一条绳。每次串连的时候，是把两段绳子对折，再如下图所示套接在一起。这样得到的绳子又被当成是另一段绳子，可以再次对折去跟另一段绳子串连。每次串连后，原来两段绳子的长度就会减半。

<center>
<img src="https://t1.aixinxi.net/o_1cbj6m594oii16a917sa1487u94a.png-w.jpg" />
</center>

给定N段绳子的长度，你需要找出它们能串成的绳子的最大长度。

**输入格式：**

每个输入包含1个测试用例。每个测试用例第1行给出正整数N (2 <= N <= 10<sup>4</sup>)；第2行给出N个正整数，即原始绳段的长度，数字间以空格分隔。所有整数都不超过10<sup>4</sup>。

**输出格式：**

在一行中输出能够串成的绳子的最大长度。结果向下取整，即取为不超过最大长度的最近整数。

**输入样例：**

8
10 15 12 3 4 13 1 15

**输出样例：**

14

## 我的解决方案
```c
#include <stdio.h>
#include <stdlib.h>

#define SIZE 10010

int cmp(const void *left, const void *right)
{ return *(int *)left - *(int *)right; }

int main(void)
{
    int rope[SIZE];
    int n;
    double result = 0;

    scanf("%d", &n);
    for (int i = 0; i < n; ++i) {
        scanf("%d", rope + i);
    }

    //升序排序
    qsort(rope, n, sizeof(int), cmp);

    //优先连接短的绳子,可以尽可能多的保留长的绳子,以使最终结果最大
    result = rope[0];
    for (int i = 1; i < n; i ++) {
        result = (result + rope[i]) / 2.0; 
    }

    printf("%d\n", (int)result);
}
```
