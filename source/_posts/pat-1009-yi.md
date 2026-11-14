---
title: PAT 1009.说反话
categories: 'PAT题解[乙级]'
mathjax: true
toc: true
tags:
  - PAT
abbrlink: d6277fdf
date: 2017-12-01 22:00:28
---
## 题目
给定一句英语，要求你编写程序，将句中所有单词的顺序颠倒输出。

**输入格式：** 测试输入包含一个测试用例，在一行内给出总长度不超过80的字符串。字符串由若干空格组成，其中单词是由英文字母（大小写有区分）组成的字符串，单词之间用1个空格分开，输入保证句子末尾没有多余的空格。

**输出格式：** 每个测试用例的输出占一行，输出倒序后的句子。

**输入样例：**

Hello World Here I Come

**输出样例：**

Come I Here World Hello

## 我的解决方案
```c
#include <stdio.h>
#include <string.h>
#include <ctype.h>

//打印单词
void print(const char *s)
{
    while (*s != '\0' && !isspace(*s)) {
        putchar(*s++);
    }
}

void reversePrint(const char *s)
{
    size_t i = strlen(s) - 1; //字符串最后一个字符下标

    //空字符串，不处理
    if (!strlen(s)) {
        return;
    }

    //倒序遍历，若s[i]为空格，说明s[i]后面有一个单词可以打印
    while (i--) {
        if (isspace(s[i])) {
            print(s + i + 1);
            putchar(' ');
        }
    }
    //打印第一个单词
    print(s);
}

int main(void)
{
    char s[82];

    gets(s);
    reversePrint(s);
    putchar('\n');

    return 0;
}
```
