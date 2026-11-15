---
title: "PAT 1028.人口普查"
published: 2017-12-17T00:20:26+08:00
description: ""
category: "PAT题解[乙级]"
tags:
  - "PAT"
---

## 题目
某城镇进行人口普查，得到了全体居民的生日。现请你写个程序，找出镇上最年长和最年轻的人。

这里确保每个输入的日期都是合法的，但不一定是合理的——假设已知镇上没有超过200岁的老人，而今天是2014年9月6日，所以超过200岁的生日和未出生的生日都是不合理的，应该被过滤掉。

**输入格式：**

输入在第一行给出正整数N，取值在(0, 10<sup>5</sup>]；随后N行，每行给出1个人的姓名（由不超过5个英文字母组成的字符串）、以及按“yyyy/mm/dd”（即年/月/日）格式给出的生日。题目保证最年长和最年轻的人没有并列。

**输出格式：**

在一行中顺序输出有效生日的个数、最年长人和最年轻人的姓名，其间以空格分隔。

**输入样例：**

5
John 2001/05/12
Tom 1814/09/06
Ann 2121/01/30
James 1814/09/05
Steve 1967/11/20

**输出样例：**

3 Tom John

## 我的解决方案
```c
#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char name[7];
    char birth[12];
} Resident;

//年龄合理
bool ageValid(const Resident *resident)
{
    return strcmp(resident->birth, "2014/09/06") <= 0 &&
           strcmp(resident->birth, "1814/09/06") >= 0;
}

int cmp(const void *first, const void *second)
{
    const Resident *resident1 = first;
    const Resident *resident2 = second;

    return strcmp(resident1->birth, resident2->birth);
}

Resident residents[100010];

int main(void)
{
    int n, age;
    int count = 0; //有效生日个数

    scanf("%d", &n);
    while (n--) {
        scanf("%s%s", residents[count].name, &residents[count].birth);
        //若年龄合理，才录入
        if (ageValid(residents + count)) {
            ++count;
        }
    }
    qsort(residents, count, sizeof(Resident), cmp);
    if (count > 0) {
        printf("%d %s %s\n", count, residents[0].name, residents[count - 1].name);
    }
    else {
        printf("0\n");
    }

    return 0;
}
```
