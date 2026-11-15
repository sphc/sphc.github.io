---
title: "PAT 1054.The Dominant Color"
published: 2018-02-12T19:31:58+08:00
description: ""
category: "PAT题解[甲级]"
tags:
  - "PAT"
---

## 题目
Behind the scenes in the computer's memory, color is always talked about as a series of 24 bits of information for each pixel. In an image, the color with the largest proportional area is called the dominant color. A strictly dominant color takes more than half of the total area. Now given an image of resolution M by N (for example, 800x600), you are supposed to point out the strictly dominant color.

**Input Specification:**

Each input file contains one test case. For each case, the first line contains 2 positive numbers: M (<=800) and N (<=600) which are the resolutions of the image. Then N lines follow, each contains M digital colors in the range [0, 2<sup>24</sup>). It is guaranteed that the strictly dominant color exists for each input image. All the numbers in a line are separated by a space.

**Output Specification:**

For each test case, simply print the dominant color in a line.

**Sample Input:**

5 3
0 0 255 16777215 24
24 24 0 0 24
24 0 24 24 24

**Sample Output:**

24

## 我的解决方案
```cpp
#include <cstdio>
#include <map>

//解题思路:
//1.map存储,下标为颜色值,值为出现次数,找出出现次数最多的颜色值即可
//2.用cin会超时

using namespace std;

int main()
{
    int m, n;
    map<int, int> colors;

    scanf("%d%d", &m, &n);
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < m; ++j) {
            int x;

            scanf("%d", &x);
            ++colors[x];
        }
    }

    map<int, int>::const_iterator max = colors.begin();
    for (map<int, int>::const_iterator i = colors.begin(); i != colors.end(); ++i) {
        if (i->second > max->second) {
            max = i;
        }
    }

    printf("%d\n", max->first);

    return 0;
}
```
