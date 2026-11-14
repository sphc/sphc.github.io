---
title: PAT 1027.打印沙漏
mathjax: true
toc: true
categories: 'PAT题解[乙级]'
tags:
  - PAT
abbrlink: 32ca445
date: 2017-12-17 00:18:09
---
## 题目
本题要求你写个程序把给定的符号打印成沙漏的形状。例如给定17个“*”，要求按下列格式打印

<pre>
*****
 ***
  *
 ***
*****
</pre>

所谓“沙漏形状”，是指每行输出奇数个符号；各行符号中心对齐；相邻两行符号数差2；符号数先从大到小顺序递减到1，再从小到大顺序递增；首尾符号数相等。

给定任意N个符号，不一定能正好组成一个沙漏。要求打印出的沙漏能用掉尽可能多的符号。

**输入格式：**

输入在一行给出1个正整数N（<=1000）和一个符号，中间以空格分隔。

**输出格式：**

首先打印出由给定符号组成的最大的沙漏形状，最后在一行中输出剩下没用掉的符号数。

**输入样例：**

19 *

**输出样例：**

<pre>
*****
 ***
  *
 ***
*****
</pre>

2

## 我的解决方案
```c
#include <stdio.h>

//打印n个sym符号，spaceCount前导空格数
void printNSym(int spaceCount, int n, char sym)
{
    if (n > 0) {
        while (spaceCount--) {
            putchar(' ');
        }
        while (n--) {
            putchar(sym);
        }
        putchar('\n');
    }
}

//打印最外层end个sym字符的沙漏
//max表示最多一层字符的个数，用于控制空格数目
void printHourglass(int max, int end, char sym)
{
    int spaceCount = (max - end) / 2;

    if (end < 3) {
        printNSym(spaceCount, end, sym);
    }
    else {
        printNSym(spaceCount, end, sym);
        printHourglass(max , end - 2, sym);
        printNSym(spaceCount , end, sym);
    }
}

//计算能打印的最外层字符的个数,并将剩余字符保存在left中
int calculate(int n, char sym, int *left)
{
    int end = n > 0 ? 1 : 0; //最后一层字符的个数
    n -= end;

    //计算最多能打印的一层的字符的个数end
    //end + 2表示每增加一层字符数加2，乘以2表示有对称的两层
    while (n - (end + 2) * 2 >= 0) {
        end += 2;
        n -= end * 2;
    }
    *left = n;

    return end;
}

int main(void)
{
    int n, left, end;
    char sym;

    scanf("%d %c", &n, &sym);
    end = calculate(n, sym, &left),
    printHourglass(end, end, sym);
    printf("%d\n", left);

    return 0;
}
```
