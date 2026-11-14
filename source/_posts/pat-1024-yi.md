---
title: PAT 1024.科学计数法
mathjax: true
toc: true
categories: 'PAT题解[乙级]'
tags:
  - PAT
abbrlink: af6c62d0
date: 2017-12-15 21:52:53
---
## 题目
科学计数法是科学家用来表示很大或很小的数字的一种方便的方法，其满足正则表达式[+-][1-9]"."[0-9]+E[+-][0-9]+，即数字的整数部分只有1位，小数部分至少有1位，该数字及其指数部分的正负号即使对正数也必定明确给出。

现以科学计数法的格式给出实数A，请编写程序按普通数字表示法输出A，并保证所有有效位都被保留。

**输入格式：**

每个输入包含1个测试用例，即一个以科学计数法表示的实数A。该数字的存储长度不超过9999字节，且其指数的绝对值不超过9999。

**输出格式：**

对每个测试用例，在一行中按普通数字表示法输出A，并保证所有有效位都被保留，包括末尾的0。

**输入样例1：**

+1.23400E-03

**输出样例1：**

0.00123400

**输入样例2：**

-1.2E+10

**输出样例2：**

-12000000000

## 我的解决方案
```c
#include <stdio.h>
#include <stdbool.h>

char num[10010];

int main(void)
{
    int size = 0; 
    int count = 0; //E与指数符号之后的值
    int c;
    bool notZero = false;
    char sym; 

    //如果第一个符号是负，则打印
    sym = getchar();
    //将到E为止的数存入数组
    while ((c = getchar()) != 'E') {
        num[size++] = c;
        if (c != '.' && c != '0') {
            notZero = true;
        }
    }
    num[size] = '\0';
    //打印符号
    if (sym == '-' && notZero) {
        putchar('-');
    }

    sym = getchar(); //指数符号
    while ((c = getchar()) != '\n' && c != EOF) {
        count = count * 10 + c - '0';
    }
    //指数为0，原样打印
    if (count-- == 0) {
        printf("%s", num);
    }
    else if (sym == '-') {
        printf("0.");
        while (count--) {
            putchar('0');
        }
        for (int i = 0; i < size; ++i) {
            if (num[i] != '.') {
                putchar(num[i]);
            }
        }
    }
    else if (sym == '+') {
        //size-2表示小数点后的数字的个数,因为count之前已经自减一次，所以这里减3
        count -= size - 3;
        if (count > 0) { //点的位置超过数字部分长度，则不必打印
            for (int i = 0; i < size; ++i) {
                if (num[i] != '.') {
                    putchar(num[i]);
                }
            }
            while (count--) { //打印多出的0
                putchar('0');
            }
        }
        else {
            for (int i = 0; i < size; ++i) {
                if (i == count + size) { //在恰当位置打印点
                    putchar('.');
                }
                if (num[i] != '.') {
                    putchar(num[i]);
                }
            }
        }
    }
    putchar('\n');

    return 0;
}
```
