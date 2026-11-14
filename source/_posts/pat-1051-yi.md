---
title: PAT 1051.复数乘法
mathjax: true
toc: true
categories: 'PAT题解[乙级]'
tags:
  - PAT
abbrlink: d934503
date: 2017-12-28 18:39:16
---
## 题目
复数可以写成(A + Bi)的常规形式，其中A是实部，B是虚部，i是虚数单位，满足i<sup>2</sup> = -1；也可以写成极坐标下的指数形式(R*e<sup>(Pi)</sup>)，其中R是复数模，P是辐角，i是虚数单位，其等价于三角形式 R(cosP + isinP)。

现给定两个复数的R和P，要求输出两数乘积的常规形式。

**输入格式：**

输入在一行中依次给出两个复数的R1, P1, R2, P2，数字间以空格分隔。

**输出格式：**

在一行中按照“A+Bi”的格式输出两数乘积的常规形式，实部和虚部均保留2位小数。注意：如果B是负数，则应该写成“A-|B|i”的形式。

**输入样例：**

2.3 3.5 5.2 0.4

**输出样例：**

-8.68-8.23i

## 我的解决方案
```c
#include <stdio.h>
#include <math.h>

typedef struct {
    double real; //实部
    double imag; //虚部
} Complex;

//输入复数
void inputComplex(Complex *complex)
{
    double r, p;

    scanf("%lf%lf", &r, &p);
    complex->real = r * cos(p);
    complex->imag = r * sin(p);
}

//打印复数
void printComplex(const Complex *complex)
{
    if (complex->real > -0.005 && complex->real < 0) {
        printf("0.00");
    }
    else {
        printf("%.2f", complex->real);
    }
    if (complex->imag > -0.005) {
        putchar('+');
    }
    if (complex->imag > -0.005 && complex->imag < 0) {
        printf("0.00i");
    }
    else {
        printf("%.2fi", complex->imag);
    }
    putchar('\n');
}

//复数乘法
void multiply(const Complex *left, const Complex *right, Complex *result)
{
    result->real = left->real * right->real - left->imag * right->imag;
    result->imag = left->real * right->imag + left->imag * right->real;
}

int main(void)
{
    Complex complex1, complex2, result;

    inputComplex(&complex1);
    inputComplex(&complex2);
    multiply(&complex1, &complex2, &result);
    printComplex(&result);

    return 0;
}
```
