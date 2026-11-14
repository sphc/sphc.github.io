---
title: PAT 1029.旧键盘
mathjax: true
toc: true
categories: 'PAT题解[乙级]'
tags:
  - PAT
abbrlink: e0a9d234
date: 2017-12-17 19:37:29
---
## 题目
旧键盘上坏了几个键，于是在敲一段文字的时候，对应的字符就不会出现。现在给出应该输入的一段文字、以及实际被输入的文字，请你列出肯定坏掉的那些键。

**输入格式：**

输入在2行中分别给出应该输入的文字、以及实际被输入的文字。每段文字是不超过80个字符的串，由字母A-Z（包括大、小写）、数字0-9、以及下划线“_”（代表空格）组成。题目保证2个字符串均非空。

**输出格式：**

按照发现顺序，在一行中输出坏掉的键。其中英文字母只输出大写，每个坏键只输出一次。题目保证至少有1个坏键。

**输入样例：**

7_This_is_a_test
_hs_s_a_es

**输出样例：**

7TI

## 我的解决方案
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

#define NPOS -9999 //表示未找到

int cmp(const void *first, const void *second)
{ return strcmp((const char *)first, (const char *)second); }

int binarySearch(char c, const char *arr, int left, int right)
{
    int mid = (left + right) / 2;

    if (left > right) {
        return NPOS;
    }
    if (arr[mid] > c) {
        return binarySearch(c, arr, left, mid - 1);
    }
    else if (arr[mid] < c) {
        return binarySearch(c, arr, mid + 1, right);
    }
    else {
        return mid;
    }
}

void toUpper(char *str)
{
    while (*str) {
        if (isalpha(*str)) {
            *str = toupper(*str);
        }
        ++str;
    }
}

bool exist(const char *str, char sym) {
    while (*str) {
        if (sym == *str) {
            return true;
        }
        ++str;
    }

    return false;
}

int main(void)
{
    char input[90];
    char output[90];
    char result[90];
    int size = 0;

    scanf("%s%s", input, output);
    toUpper(input);
    toUpper(output);
    qsort(output, strlen(output), sizeof(char), cmp);
    for (int i = 0; i < strlen(input); ++i) {
        if (binarySearch(input[i], output, 0, strlen(output)) == NPOS
            && !exist(result, input[i])) {
            result[size++] = input[i];
            result[size] = '\0';
        }
    }
    printf("%s\n", result);

    return 0;
}
```
