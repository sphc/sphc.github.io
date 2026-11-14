---
title: PAT 1007.素数对猜想
categories: 'PAT题解[乙级]'
mathjax: true
toc: true
tags:
  - PAT
abbrlink: de4e4672
date: 2017-12-01 21:45:36
---
## 题目
让我们定义d<sub>n</sub>为：d<sub>n</sub> = p<sub>n+1</sub> - p<sub>n</sub>, 其中p<sub>i</sub>是第i个素数。显然有d<sub>1</sub>=1且对于n>1有d<sub>n</sub>是偶数。"素数对猜想"认为"存在无穷多对相邻且差为2的素数"。

现给定任意正整数N(<10<sup>5</sup>)，请计算不超过N的满足猜想的素数对的个数。

**输入格式：** 每个测试输入包含1个测试用例，给出正整数N。

**输出格式：** 每个测试用例的输出占一行，不超过N的满足猜想的素数对的个数。

**输入样例：**

20

**输出样例：**

4

## 我的解决方案
```c
#include <stdio.h>
#include <stdbool.h>

//判断一个数是否素数
bool isPrime(int num)
{
    if (num < 1) {
        return false;
    }

    for (int i = 2; i * i <= num; ++i) {
        if (num % i == 0) {
            return false;
        }
    }

    return true;
}

//生成一个大于num的素数
int generatePrime(int num)
{
    if (num < 1) {
        return 1;
    }

    while (!isPrime(++num)) {
    }

    return num;
}

int primeGuess(int n)
{
    int count = 0; //满足条件的素数对个数
    int prim1, prim2; // 用于保存第n个素数和第n+1个素数

    prim1 = 1; //第一个素数
    while ((prim2 = generatePrime(prim1)) <= n) { 
        if (prim2 - prim1 == 2) { 
            ++count;
        }
        prim1 = prim2;
    }

    return count;
}

int main(void)
{
    int n;

    scanf("%d", &n);
    printf("%d\n", primeGuess(n));

    return 0;
}
```
