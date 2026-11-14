---
title: PAT 1068.万绿丛中一点红
mathjax: true
toc: true
categories: 'PAT题解[乙级]'
tags:
  - PAT
abbrlink: 94f5a477
date: 2018-01-01 23:07:16
---
## 题目
对于计算机而言，颜色不过是像素点对应的一个24位的数值。现给定一幅分辨率为MxN的画，要求你找出万绿丛中的一点红，即有独一无二颜色的那个像素点，并且该点的颜色与其周围8个相邻像素的颜色差充分大。

**输入格式：**

输入第一行给出三个正整数，分别是M和N（<= 1000），即图像的分辨率；以及TOL，是所求像素点与相邻点的颜色差阈值，色差超过TOL的点才被考虑。随后N行，每行给出M个像素的颜色值，范围在[0, 2<sup>24</sup>)内。所有同行数字间用空格或TAB分开。

**输出格式：**

在一行中按照“(x, y): color”的格式输出所求像素点的位置以及颜色值，其中位置x和y分别是该像素在图像矩阵中的列、行编号（从1开始编号）。如果这样的点不唯一，则输出“Not Unique”；如果这样的点不存在，则输出“Not Exist”。

**输入样例1：**

8 6 200
0 	 0 	  0 	   0	    0 	     0 	      0        0
65280 	 65280    65280    16711479 65280    65280    65280    65280
16711479 65280    65280    65280    16711680 65280    65280    65280
65280 	 65280    65280    65280    65280    65280    165280   165280
65280 	 65280 	  16777015 65280    65280    165280   65480    165280
16777215 16777215 16777215 16777215 16777215 16777215 16777215 16777215

**输出样例1：**

(5, 3): 16711680

**输入样例2：**

4 5 2
0 0 0 0
0 0 3 0
0 0 0 0
0 5 0 0
0 0 0 0

**输出样例2：**

Not Unique

**输入样例3：**

3 3 5
1 2 3
3 4 5
5 6 7

**输出样例3：**

Not Exist

## 我的解决方案
```c
#include <stdio.h>
#include <math.h>
#include <stdbool.h>

typedef struct {
    int first; //行下标
    int second; //列下标
} Pair;

void setAttributes(Pair *pair, int first, int second)
{
    pair->first = first;
    pair->second = second;
}

int getFirst(const Pair *pair)
{ return pair->first; }

int getSecond(const Pair *pair)
{ return pair->second; }

bool isExisted(const int matrix [][1010], int n, int m, const Pair *pair)
{
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < m; ++j) {
            int x = getFirst(pair);
            int y = getSecond(pair);

            if (!(i == x && j == y) && matrix[i][j] == matrix[x][y]) {
                return true;
            }
        }
    }

    return false;
}

void inputMatrix(int matrix [][1010], int n, int m)
{
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < m; ++j) {
            scanf("%d", &matrix[i][j]);
        }
    }
}

//row, col处的值是否满足
bool isDifference(const int matrix [][1010], int n, int m, int row, int col, int tol)
{
    for (int i = row - 1; i <= row + 1; ++i) {
        for (int j = col - 1; j <= col + 1; ++j) {
            if (i >= 0 && i < n && //行下标合法
                j >= 0 && j < m && //列下标合法
                !(i == row && j == col) && //不是本身
                (fabs(matrix[i][j] - matrix[row][col]) <= tol)) {
                return false;
            }
        }
    }

    return true;
}

int main(void)
{
    int m, n, tol;
    //像素矩阵
    int matrix[1010][1010];
    //可能结果的行列下标
    Pair maybe[1010];
    int size = 0;
    //结果个数
    int count = 0;
    int result; //结果下标

    scanf("%d%d%d", &m, &n, &tol);
    inputMatrix(matrix, n, m);

    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < m; ++j) {
            if (isDifference(matrix, n, m, i, j, tol)) {
                setAttributes(maybe + size++, i, j);
            }
        }
    }
    for (int i = 0; i < size; ++i) {
        if (!isExisted(matrix, n, m, maybe + i)) {
            ++count;
            result = i;
        }
    }
    if (count > 1) {
        printf("Not Unique\n");
    }
    else if (count == 1) {
        int i = getFirst(maybe + result);
        int j = getSecond(maybe + result);

        printf("(%d, %d): %d\n", j + 1, i + 1, matrix[i][j]);
    }
    else {
        printf("Not Exist\n");
    }

    return 0;
}
```
