---
title: PAT 1065.单身狗
mathjax: true
toc: true
categories: 'PAT题解[乙级]'
tags:
  - PAT
abbrlink: 5ab163e3
date: 2018-01-25 16:46:02
---
## 题目
“单身狗”是中文对于单身人士的一种爱称。本题请你从上万人的大型派对中找出落单的客人，以便给予特殊关爱。

**输入格式：**

输入第一行给出一个正整数N（<=50000），是已知夫妻/伴侣的对数；随后N行，每行给出一对夫妻/伴侣——为方便起见，每人对应一个ID号，为5位数字（从00000到99999），ID间以空格分隔；之后给出一个正整数M（<=10000），为参加派对的总人数；随后一行给出这M位客人的ID，以空格分隔。题目保证无人重婚或脚踩两条船。

**输出格式：**

首先第一行输出落单客人的总人数；随后第二行按ID递增顺序列出落单的客人。ID间用1个空格分隔，行的首尾不得有多余空格。

**输入样例：**

3
11111 22222
33333 44444
55555 66666
7
55555 44444 10000 88888 22222 11111 23333

**输出样例：**

5
10000 23333 44444 55555 88888

## 我的解决方案
```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define PAIR_SIZE 100010
#define ID_SIZE 10010
#define NOT_FOUND -1

int cmp(const void *left, const void *right)
{ return *(int *)left - *(int *)right; }

//二分搜索
int binarySearch(const int *arr, int left, int right, int value) 
{
    int mid = (left + right) / 2;

    if (left > right) {
        return NOT_FOUND;
    }
    else if (arr[mid] > value) {
        return binarySearch(arr, left, mid - 1, value);
    }
    else if (arr[mid] < value) {
        return binarySearch(arr, mid + 1, right, value);
    }
    else {
        return mid;
    }
}

void initPair(int *pair, int size, int value)
{
    for (int i = 0; i < size; ++i) {
        pair[i] = value;
    }
}

int main(void)
{
    int n, m;
    int id[ID_SIZE]; //输入的id
    int result[ID_SIZE]; //单身狗id
    int resultSize = 0; //单身狗个数
    int pair[PAIR_SIZE]; //下标和值表示一对夫妻的id

    initPair(pair, PAIR_SIZE, NOT_FOUND);
    scanf("%d", &n);
    //构造映射关系,pair[夫]=妻,pair[妻]=夫
    for (int i = 0; i < n; ++i) {
        int first, second;

        scanf("%d%d", &first, &second);
        pair[first] = second;
        pair[second] = first;
    }

    scanf("%d", &m);
    //输入id
    for (int i = 0; i < m; ++i) {
        scanf("%d", id + i);
    }

    //id按升序排
    qsort(id, m, sizeof(int), cmp);

    for (int i = 0; i < m; ++i) {
        //id未出现在pair中或未找到其伴侣
        if (pair[id[i]] == NOT_FOUND || binarySearch(id, 0, m - 1, pair[id[i]]) == NOT_FOUND) {
            result[resultSize++] = id[i];
        }
    }

    //打印结果
    printf("%d\n", resultSize);
    for (int i = 0; i < resultSize; ++i) {
        if (i) {
            printf(" ");
        }
        printf("%.5d", result[i]);
    }
    //resultSize为0时不打印换行，否则会有测试点过不去
    if (resultSize) {
        printf("\n");
    }

    return 0;
}
```
