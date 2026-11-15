---
title: "PAT 1044.火星数字"
published: 2017-12-22T22:43:25+08:00
description: ""
category: "PAT题解[乙级]"
tags:
  - "PAT"
---

## 题目
火星人是以13进制计数的：

* 地球人的0被火星人称为tret。
* 地球人数字1到12的火星文分别为：jan, feb, mar, apr, may, jun, jly, aug, sep, oct, nov, dec。
* 火星人将进位以后的12个高位数字分别称为：tam, hel, maa, huh, tou, kes, hei, elo, syy, lok, mer, jou。

例如地球人的数字“29”翻译成火星文就是“hel mar”；而火星文“elo nov”对应地球数字“115”。为了方便交流，请你编写程序实现地球和火星数字之间的互译。

**输入格式：**

输入第一行给出一个正整数N（<100），随后N行，每行给出一个[0, 169)区间内的数字 —— 或者是地球文，或者是火星文。

**输出格式：**

对应输入的每一行，在一行中输出翻译后的另一种语言的数字。

**输入样例：**

4
29
5
elo nov
tam

**输出样例：**

hel mar
may
115
13

## 我的解决方案
```c
#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <stdlib.h>

#define NPOS -11111 //表示未找到

//低位
const char *low[] = { "tret", "jan", "feb", "mar", "apr", "may", "jun", "jly", "aug", "sep", "oct", "nov", "dec" };

//高位
const char *high[] = { "tam", "hel", "maa", "huh", "tou", "kes", "hei", "elo", "syy", "lok", "mer", "jou" };

//火星文数字转整数
int marstoi(const char *mars)
{
    for (int i = 0; i < 13; ++i) {
        if (strcmp(mars, low[i]) == 0) {
            return i;
        }
    }
    for (int i = 0; i < 12; ++i) {
        if (strcmp(mars, high[i]) == 0) {
            return (i + 1) * 13;
        }
    }

    return NPOS;
}

//以整型打印火星文mars
void printInt(char *mars)
{
    char *p = mars;
    int value = 0;

    //计算高位
    while (*p) {
        if (*p == ' ') {
            *p = '\0';
            value = value * 10 + marstoi(mars);
            mars = ++p;
            continue;
        }
        ++p;
    }
    value += marstoi(mars); //加上最后的低位
    printf("%d", value);
}

//打印高位
void printHigh(int num)
{
    if (num != 0) {
        printHigh(num / 13);
        printf("%s", high[num % 13 - 1]);
    }
}

//以火星文打印num
void printMars(int num)
{
    printHigh(num / 13);
    //有高位时，不打印低位的零
    if (num / 13 != 0 && num % 13 != 0) {
        printf(" %s", low[num % 13]);
    }
    else if (num / 13 == 0) { //没有高位时，不打印前面的空格
        printf("%s", low[num % 13]);
    }
}

int main(void)
{
    int n;
    char num[10];
    char *tmp;

    scanf("%d", &n);
    getchar();
    for (int i = 0; i < n; ++i) {
        gets(num);
        if (isdigit(num[0])) {
            printMars(atoi(num));
        }
        else {
            printInt(num);
        }
        putchar('\n');
    }

    return 0;
}
```
