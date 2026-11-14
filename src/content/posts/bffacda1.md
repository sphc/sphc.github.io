---
title: "PAT 1042.字符统计"
pubDatetime: 2017-12-22T22:39:28+08:00
description: ""
category: "PAT题解[乙级]"
tags:
  - "PAT"
---

## 题目
请编写程序，找出一段给定文字中出现最频繁的那个英文字母。

**输入格式：**

输入在一行中给出一个长度不超过1000的字符串。字符串由ASCII码表中任意可见字符及空格组成，至少包含1个英文字母，以回车结束（回车不算在内）。

**输出格式：**

在一行中输出出现频率最高的那个英文字母及其出现次数，其间以空格分隔。如果有并列，则输出按字母序最小的那个字母。统计时不区分大小写，输出小写字母。

**输入样例：**

This is a simple TEST.  There ARE numbers and other symbols 1&2&3...........

**输出样例：**

e 7

## 我的解决方案
```c
#include <stdio.h>
#include <ctype.h>

#define SIZE 129

int count[SIZE] = {0}; //统计各字符个数

int main(void)
{
    int c;
    int max = 0;

    //统计字符
    while ((c = getchar()) != EOF && c != '\n') {
        if (isalpha(c)) {
            ++count[tolower(c)];
        }
    }
    //找到出现次数最多的字符,保存在max中
    for (int i = 'a'; i <= 'z'; ++i) {
        if (count[max] < count[i]) {
            max = i;
        }
    }
    printf("%c %d\n", max, count[max]);

    return 0;
}
```
