---
title: PAT 1006.换个格式输出整数
categories: 'PAT题解[乙级]'
mathjax: true
toc: true
tags:
  - PAT
abbrlink: '887e7360'
date: 2017-11-29 21:03:37
---
## 题目
让我们用字母B来表示“百”、字母S表示“十”， 用“12...n”来表示个位数字n(n<10)，换个格式来输出任一个不超过3位的正整数。例如234应该被输出为BBSSS1234，因为它有2个“百”、3个“十”、以及个位的4。

**输入格式：** 每个测试输入包含1个测试用例，给出正整数n(<1000)。

**输出格式：** 每个测试用例的输出占一行，用规定的格式输出n。

**输入样例1：**

234

**输出样例1：**

BBSSS1234

**输入样例2：**

23

**输出样例2：**

SS123

## 我的解决方案
```c
#include <stdio.h>

//打印个位
void printGe(int ge)
{
    if (ge == 0) {
        return;
    }
    printGe(ge - 1);
    printf("%d", ge);
}

//打印百位
void printBai(int bai)
{
    for (int i = 0; i < bai; ++i) {
        putchar('B');
    }
}

//打印十位
void printShi(int shi)
{
    for (int i = 0; i < shi; ++i) {
        putchar('S');
    }
}

//以新格式打印
void printNewFormat(int num)
{
    int bai = 0, shi = 0, ge = 0;

    bai = num / 100;
    num %= 100;
    shi = num / 10;
    ge = num % 10;
    printBai(bai);
    printShi(shi);
    printGe(ge);
}

int main(void)
{
    int num;

    scanf("%d", &num);
    printNewFormat(num);
    putchar('\n');

    return 0;
}
```
