---
title: "PAT 1055.集体照"
published: 2018-01-26T21:49:59+08:00
description: ""
category: "PAT题解[乙级]"
tags:
  - "PAT"
---

## 题目
拍集体照时队形很重要，这里对给定的N个人K排的队形设计排队规则如下：

* 每排人数为N/K（向下取整），多出来的人全部站在最后一排；
* 后排所有人的个子都不比前排任何人矮；
* 每排中最高者站中间（中间位置为m/2+1，其中m为该排人数，除法向下取整）；
* 每排其他人以中间人为轴，按身高非增序，先右后左交替入队站在中间人的两侧（例如5人身高为190、188、186、175、170，则队形为175、188、190、186、170。这里假设你面对拍照者，所以你的左边是中间人的右边）；
* 若多人身高相同，则按名字的字典序升序排列。这里保证无重名。

现给定一组拍照人，请编写程序输出他们的队形。

**输入格式：**

每个输入包含1个测试用例。每个测试用例第1行给出两个正整数N（<=10000，总人数）和K（<=10，总排数）。随后N行，每行给出一个人的名字（不包含空格、长度不超过8个英文字母）和身高（[30, 300]区间内的整数）。

**输出格式：**

输出拍照的队形。即K排人名，其间以空格分隔，行末不得有多余空格。注意：假设你面对拍照者，后排的人输出在上方，前排输出在下方。

**输入样例：**

10 3
Tom 188
Mike 170
Eva 168
Tim 160
Joe 190
Ann 168
Bob 175
Nick 186
Amy 160
John 159

**输出样例：**

Bob Tom Joe Nick
Ann Mike Eva
Tim Amy John

## 我的解决方案
```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define SIZE 10010

typedef struct {
    char name[10];
    int height;
} People;

//输入属性
void inputPeople(People *people)
{ scanf("%s%d", people->name, &people->height); }

//按身高降序,若身高相等则按名字升序
int cmp(const void *left, const void *right)
{ 
    if (((People *)right)->height != ((People *)left)->height) {
        return ((People *)right)->height - ((People *)left)->height; 
    }
    else {
        return strcmp(((People *)left)->name, ((People *)right)->name);
    }
}

int main(void)
{
    People people[SIZE];
    char *result[12][SIZE];
    int n, k;
    int count, lastCount; //分别代表每行人数和最后一行人数
    int cur = 0; 
    int mid; //中间位置
    int diff; //与mid的距离

    scanf("%d%d", &n, &k);
    count = n / k;
    lastCount = count + n % k;
    for (int i = 0; i < n; ++i) {
        inputPeople(people + i);
    }

    qsort(people, n, sizeof(People), cmp);

    for (int i = 0; i < k; ++i) {
        int rCount = (i ? count : lastCount); //当前行人数
        diff = 1;
        mid = (i ? count : lastCount) / 2;

        result[i][mid] = people[cur++].name;
        while ((cur - lastCount) % rCount != 0) {
            result[i][mid - diff] = people[cur++].name;
            if ((cur - lastCount) % rCount == 0) {
                break;
            }
            result[i][mid + diff] = people[cur++].name;
            ++diff;
        }
    }

    for (int i = 0; i < k; ++i) {
        for (int j = 0; j < (i ? count : lastCount); ++j) {
            if (j) {
                printf(" ");
            }
            printf("%s", result[i][j]);
        }
        printf("\n");
    }

    return 0;
}
```
