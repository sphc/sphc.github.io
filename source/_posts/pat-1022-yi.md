---
title: PAT 1022.D进制的A+B
mathjax: true
toc: true
categories: 'PAT题解[乙级]'
tags:
  - PAT
abbrlink: b4a67c45
date: 2017-12-15 21:47:01
---
## 题目
输入两个非负10进制整数A和B(<=2<sup>30</sup>-1)，输出A+B的D (1 < D <= 10)进制数。

**输入格式：**

输入在一行中依次给出3个整数A、B和D。

**输出格式：**

输出A+B的D进制数。

**输入样例：**

123 456 8

**输出样例：**

1103

## 我的解决方案
```c
#include <stdio.h>

//将num以base进制打印
void printBase(int num, int base)
{
    if (num / base) {
        printBase(num / base, base);
    }
    printf("%d", num % base);
}

int main(void)
{
    int a, b, base;

    scanf("%d%d%d", &a, &b, &base);
    printBase(a + b, base);
    printf("\n");

    return 0;
}
```
