---
title: PAT 1004.成绩排名
categories: 'PAT题解[乙级]'
mathjax: true
toc: true
tags:
  - PAT
abbrlink: 4c999f0
date: 2017-11-29 19:42:09
---
## 题目
读入n名学生的姓名、学号、成绩，分别输出成绩最高和成绩最低学生的姓名和学号。

**输入格式：** 每个测试输入包含1个测试用例，格式为

* 第1行：正整数n
* 第2行：第1个学生的姓名 学号 成绩
* 第3行：第2个学生的姓名 学号 成绩
* ... ... ...
* 第n+1行：第n个学生的姓名 学号 成绩

其中姓名和学号均为不超过10个字符的字符串，成绩为0到100之间的一个整数，这里保证在一组测试用例中没有两个学生的成绩是相同的。

**输出格式：** 对每个测试用例输出2行，第1行是成绩最高学生的姓名和学号，第2行是成绩最低学生的姓名和学号，字符串间有1空格。

**输入样例：**

3
Joe Math990112 89
Mike CS991301 100
Mary EE990830 95

**输出样例：**

Mike CS991301
Joe Math990112

## 我的解决方案
```c
#include <stdio.h>
#include <limits.h>
#include <stdlib.h>

typedef struct {
    char name[11]; //姓名
    char num[11];  //学号
    int grade;     //年龄
} Student;

//用于保存一对指向最高成绩和最低成绩的学生的指针
typedef struct {
    Student *first;
    Student *second;
} Pair;

//构造Pair
Pair *constructPair(Student *first, Student *second)
{
    Pair *pair = malloc(sizeof(Pair));

    if (!pair) {
        exit(-1);
    }
    else {
        pair->first = first;
        pair->second = second;

        return pair;
    }
}

//释放Pair
void freePair(Pair *pair)
{ free(pair); }

//输入学生属性
void inputAttributes(Student *student)
{
    scanf("%s", student->name);
    scanf("%s", student->num);
    scanf("%d", &student->grade);
}

//获取成绩最高与成绩最低的学生，并保存在Pair中
Pair *getMax_MinStudent(Student *students, int size)
{
    int max = INT_MIN, min = INT_MAX;
    int maxIndex = 0, minIndex = 0;

    for (int i = 0; i < size; ++i) {
        if ((students + i)->grade > max) {
            max = (students + i)->grade;
            maxIndex = i;
        }
        if ((students + i)->grade < min) {
            min = (students + i)->grade;
            minIndex = i;
        }
    }

    return constructPair(students + maxIndex, students + minIndex);
}

//打印结果
void printInfo(const Pair *pair)
{
    printf("%s %s\n", pair->first->name, pair->first->num);
    printf("%s %s\n", pair->second->name, pair->second->num);
}

int main(void)
{
    Student students[1000];
    Pair *result;
    int n;

    scanf("%d", &n);
    for (int i = 0; i < n; ++i) {
        inputAttributes(students + i);
    }
    result = getMax_MinStudent(students, n);
    printInfo(result);
    freePair(result);

    return 0;
}

```
