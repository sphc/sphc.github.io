---
title: PAT 1045.快速排序
mathjax: true
toc: true
categories: 'PAT题解[乙级]'
tags:
  - PAT
abbrlink: afd54190
date: 2018-01-29 18:21:41
---
## 题目
著名的快速排序算法里有一个经典的划分过程：我们通常采用某种方法取一个元素作为主元，通过交换，把比主元小的元素放到它的左边，比主元大的元素放到它的右边。 给定划分后的N个互不相同的正整数的排列，请问有多少个元素可能是划分前选取的主元？

例如给定N = 5, 排列是1、3、2、4、5。则：

* 1的左边没有元素，右边的元素都比它大，所以它可能是主元；
* 尽管3的左边元素都比它小，但是它右边的2它小，所以它不能是主元；
* 尽管2的右边元素都比它大，但其左边的3比它大，所以它不能是主元；
* 类似原因，4和5都可能是主元。

因此，有3个元素可能是主元。

**输入格式：**

输入在第1行中给出一个正整数N（<= 10<sup>5</sup>）； 第2行是空格分隔的N个不同的正整数，每个数不超过10<sup>9</sup>。

**输出格式：**

在第1行中输出有可能是主元的元素个数；在第2行中按递增顺序输出这些元素，其间以1个空格分隔，行末不得有多余空格。

**输入样例：**

5
1 3 2 4 5

**输出样例：**

3
1 4 5

## 我的解决方案
```c
#include <stdio.h>
#include <limits.h>
#include <stdlib.h>

#define SIZE 100010

int cmp(const void *left, const void *right)
{ return *(int *)left - *(int *)right; }

int main(void)
{
    int n;
    int elements[SIZE];
    int min[SIZE]; //min[i]表示第i + 1个元素到末尾元素间的最小值
    int m = INT_MAX, max = INT_MIN;
    int size = 0; //结果的个数

    //输入元素
    scanf("%d", &n);
    for (int i = 0; i < n; ++i) {
        scanf("%d", elements + i);
    }

    //求min
    for (int i = n - 1; i >= 0; --i) {
        min[i] = m;
        if (m > elements[i]) {
            m = elements[i];
        }
    }

    for (int i = 0; i < n; ++i) {
        //对于每一个元素,它只要大于在它之前的最大值
        //并且小于在它之后的最小值,便是主元
        if (elements[i] > max && elements[i] < min[i]) {
            //将结果元素覆盖在elements中,并以size表示其个数
            elements[size++] = elements[i];
        }
        if (max < elements[i]) {
            max = elements[i];
        }
    }

    //升序排序
    qsort(elements, size, sizeof(int), cmp);

    //打印结果
    printf("%d\n", size);
    for (int i = 0; i < size; ++i) {
        if (i) {
            printf(" ");
        }
        printf("%d", elements[i]);
    }
    printf("\n");

    return 0;
}
```
