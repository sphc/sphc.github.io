---
title: PAT 1013.数素数
categories: 'PAT题解[乙级]'
mathjax: true
toc: true
tags:
  - PAT
abbrlink: 24242b79
date: 2017-12-04 20:56:08
---
## 题目
令P<sub>i</sub>表示第i个素数。现任给两个正整数M <= N <= 10<sup>4</sup>，请输出P<sub>M</sub>到P<sub>N</sub>的所有素数。

**输入格式：** 

输入在一行中给出M和N，其间以空格分隔。

**输出格式：**

输出从P<sub>M</sub>到P<sub>N</sub>的所有素数，没10个数字占1行，其间以空格分隔，但行末不得有多余空格。

**输入样例：**

5 27

**输出样例：**

11 13 17 19 23 29 31 37 41 43 
47 53 59 61 67 71 73 79 83 89
97 101 103

## 我的解决方案
```c
#include <stdio.h>
#include <stdbool.h>

//判断是否素数
bool isPrim(int num)
{
    for (int i = 2; i * i <= num; ++i) {
        if (num % i == 0) {
            return false;
        }
    }

    return true;
}

//产生一个大于num的素数
int generatePrim(int num)
{
    while (!isPrim(++num)) {
    }
    
    return num;
}

int main(void)
{
    int m, n;
    int prim = 0;
    int i = 0; //第几个素数

    scanf("%d%d", &m, &n);
    while (i < m) {
        prim = generatePrim(prim);
        ++i;
    }
    while (i <= n) {
        printf("%d", prim = generatePrim(prim));
        //控制格式
        if ((i - m + 1) % 10 == 0) {
            putchar('\n');
        }
        else {
            if (i != n) {
                putchar(' ');
            }
        }
        ++i;
    }
    if ((n - m + 1) % 10 != 0) {
        putchar('\n');
    }

    return 0;
}
```
