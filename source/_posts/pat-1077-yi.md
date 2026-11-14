---
title: PAT 1077.互评成绩计算
mathjax: true
toc: true
categories: 'PAT题解[乙级]'
tags:
  - PAT
abbrlink: 6df7d772
date: 2017-12-30 20:21:54
---
## 题目
在浙大的计算机专业课中，经常有互评分组报告这个环节。一个组上台介绍自己的工作，其他组在台下为其表现评分。最后这个组的互评成绩是这样计算的：所有其他组的评分中，去掉一个最高分和一个最低分，剩下的分数取平均分记为 G1；老师给这个组的评分记为 G2。该组得分为 (G1+G2)/2，最后结果四舍五入后保留整数分。本题就要求你写个程序帮助老师计算每个组的互评成绩。

**输入格式：**

输入第一行给出两个正整数N（> 3）和M，分别是分组数和满分，均不超过100。随后N行，每行给出该组得到的N个分数（均保证为整型范围内的整数），其中第1个是老师给出的评分，后面 N-1 个是其他组给的评分。合法的输入应该是[0, M]区间内的整数，若不在合法区间内，则该分数须被忽略。题目保证老师的评分都是合法的，并且每个组至少会有3个来自同学的合法评分。

**输出格式：**

为每个组输出其最终得分。每个得分占一行。

**输入样例：**

6 50
42 49 49 35 38 41
36 51 50 28 -1 30
40 36 41 33 47 49
30 250 -25 27 45 31
48 0 0 50 50 1234
43 41 36 29 42 29

**输出样例：**

42
33
41
31
37
39

## 我的解决方案
```c
#include <stdio.h>
#include <stdlib.h>

//四舍五入
int myRound(double num)
{ return num + 0.5; }

int cmp(const void *left, const void *right)
{ return *(int *)left - *(int *)right; }

//计算left到right(不包括right)的平均值
double average(const int *arr, int left, int right)
{
    double sum = 0;;
    int size = right - left;

    while (left < right) {
        sum += arr[left++];
    }
    if (size > 0) {
        sum /= size;
    }

    return sum;
}

int main(void)
{
    int n, m;
    int score[110]; //评分

    scanf("%d%d", &n, &m);
    for (int i = 0; i < n; ++i) {
        int size = 0;

        for (int j = 0; j < n; ++j) {
            int grade;

            scanf("%d", &grade);
            if (grade >= 0 && grade <= m) {
                score[size++] = grade;
            }
        }
        qsort(score + 1, size - 1, sizeof(int), cmp);
        printf("%d\n", myRound((score[0] + average(score, 2, size - 1)) / 2));
    }

    return 0;
}
```
