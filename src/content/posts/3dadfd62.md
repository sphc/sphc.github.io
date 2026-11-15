---
title: "PAT 1016.部分A+B"
published: 2017-12-12T17:46:41+08:00
description: ""
category: "PAT题解[乙级]"
tags:
  - "PAT"
---

## 题目
正整数A的“D<sub>A</sub>（为1位整数）部分”定义为由A中所有D<sub>A</sub>组成的新整数P<sub>A</sub>。例如：给定A = 3862767，D<sub>A</sub> = 6，则A的“6部分”P<sub>A</sub>是66，因为A中有2个6。

现给定A、D<sub>A</sub>、B、D<sub>B</sub>，请编写程序计算P<sub>A</sub> + P<sub>B</sub>。

**输入格式：**

输入在一行中依次给出A、D<sub>A</sub>、B、D<sub>B</sub>，中间以空格分隔，其中0 < A, B < 10<sup>10</sup>。

**输出格式：**

在一行中输出P<sub>A</sub> + P<sub>B</sub>的值。

**输入样例1：**

3862767 6 13530293 3

**输出样例1：**

399

**输入样例2：**

3862767 1 13530293 8

**输出样例2：**

0

## 我的解决方案
```c
#include <stdio.h>

//计算pn
int p(int n, int dn)
{
    int tmp;
    int result = 0;

    while (n) {
        tmp = n % 10;
        if (tmp == dn) {
            result = result * 10 + tmp;
        }
        n /= 10;
    }

    return result;
}

int main(void)
{
    int a, da;
    int b, db;

    scanf("%d%d%d%d", &a, &da, &b, &db);
    printf("%d\n", p(a, da) + p(b, db)); 

    return 0;
}
```
