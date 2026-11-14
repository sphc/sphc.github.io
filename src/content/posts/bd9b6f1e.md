---
title: "PAT 1005.继续(3n+1)猜想"
pubDatetime: 2018-01-27T20:28:26+08:00
description: ""
category: "PAT题解[乙级]"
tags:
  - "PAT"
---

## 题目
卡拉兹(Callatz)猜想已经在1001中给出了描述。在这个题目里，情况稍微有些复杂。

当我们验证卡拉兹猜想的时候，为了避免重复计算，可以记录下递推过程中遇到的每一个数。例如对n=3进行验证的时候，我们需要计算3、5、8、4、2、1，则当我们对n=5、8、4、2进行验证的时候，就可以直接判定卡拉兹猜想的真伪，而不需要重复计算，因为这4个数已经在验证3的时候遇到过了，我们称5、8、4、2是被3“覆盖”的数。我们称一个数列中的某个数n为“关键数”，如果n不能被数列中的其他数字所覆盖。

现在给定一系列待验证的数字，我们只需要验证其中的几个关键数，就可以不必再重复验证余下的数字。你的任务就是找出这些关键数字，并按从大到小的顺序输出它们。

**输入格式：** 每个测试输入包含1个测试用例，第1行给出一个正整数K(<100)，第2行给出K个互不相同的待验证的正整数n(1<n<=100)的值，数字间用空格隔开。

**输出格式：** 每个测试用例的输出占一行，按从大到小的顺序输出关键数字。数字间用1个空格隔开，但一行中最后一个数字后没有空格。

**输入样例：**

6
3 5 6 7 8 11

**输出样例：**

7 6

## 我的解决方案
```c
#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>

#define SIZE 110
#define SEQUENCE_SIZE 10000

typedef struct {
    int base[SEQUENCE_SIZE];
    int size;
} Array;

int cmp(const void *left, const void *right)
{ return *(int *)right - *(int *)left; }

void initArray(Array *array)
{ array->size = 0; }

//num存在array中则返回true
bool isExisted(const Array *array, int num)
{
    for (int i = 0; i < array->size; ++i) {
        if (array->base[i] == num) {
            return true;
        }
    }

    return false;
}

//产生3n+1猜想过程中的序列
void generateSequence(Array *array, int num)
{
    while (num != 1) {
        array->base[array->size++] = num;
        num = ((num % 2) ? (3 * num + 1): num) / 2;
    }
    array->base[array->size++] = 1;
}

int main(void)
{
    int k;
    Array nums[SIZE]; //保存每个数3n+1猜想过程中产生的序列
    int result[SIZE]; //保存结果
    int numSize = 0, resultSize = 0; 

    //初始化
    for (int i = 0; i < SIZE; ++i) {
        initArray(nums + i);
    }

    scanf("%d", &k);
    for (int i = 0; i < k; ++i) {
        int num;
        bool existed = false;

        scanf("%d", &num);
        //每一次都查看已经产生的序列中是否包含num，若包含则说明num不可能是关键数
        //这时不保存num及其序列
        for (int j = 0; j < i; ++j) {
            if (existed = isExisted(&nums[j], num)) {
                break;
            }
        }
        if (!existed) {
            generateSequence(&nums[numSize++], num);
        }
    }

    //检查每一个数是否被其他序列包含,若未被包含,则说明是关键数,保存至result中
    for (int i = 0; i < numSize; ++i) {
        bool existed = false;

        for (int j = 0; j < numSize; ++j) {
            if (i != j && (existed = isExisted(&nums[j], nums[i].base[0]))) {
                break;
            }
        }
        if (!existed) {
            result[resultSize++] = nums[i].base[0];
        }
    }

    //降序排序
    qsort(result, resultSize, sizeof(int), cmp);

    for (int i = 0; i < resultSize; ++i) {
        if (i) {
            printf(" ");
        }
        printf("%d", result[i]);
    }
    if (resultSize > 0) {
        printf("\n");
    }

    return 0;
}
```
