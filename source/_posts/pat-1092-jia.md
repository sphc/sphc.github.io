---
title: PAT 1092.To Buy or Not to Buy
mathjax: true
toc: true
categories: 'PAT题解[甲级]'
tags:
  - PAT
abbrlink: 454c5392
date: 2018-04-15 09:47:59
---

## 题目
Eva would like to make a string of beads with her favorite colors so she went to a small shop to buy some beads. There were many colorful strings of beads. However the owner of the shop would only sell the strings in whole pieces. Hence Eva must check whether a string in the shop contains all the beads she needs. She now comes to you for help: if the answer is "Yes", please tell her the number of extra beads she has to buy; or if the answer is "No", please tell her the number of beads missing from the string.

For the sake of simplicity, let's use the characters in the ranges [0-9], [a-z], and [A-Z] to represent the colors. For example, the 3rd string in Figure 1 is the one that Eva would like to make. Then the 1st string is okay since it contains all the necessary beads with 8 extra ones; yet the 2nd one is not since there is no black bead and one less red bead.

<center>
<img src="https://t1.aixinxi.net/o_1cbj65uefubl1jnjgvj2m41ha0a.jpg-w.jpg" />
</center>
<center>Figure 1</center>

**Input Specification:**

Each input file contains one test case. Each case gives in two lines the strings of no more than 1000 beads which belong to the shop owner and Eva, respectively.

**Output Specification:**

For each test case, print your answer in one line. If the answer is "Yes", then also output the number of extra beads Eva has to buy; or if the answer is "No", then also output the number of beads missing from the string. There must be exactly 1 space between the answer and the number.

**Sample Input 1:**

ppRYYGrrYBR2258
YrR8RrY

**Sample Output 1:**

Yes 8

**Sample Input 2:**

ppRYYGrrYB225
YrR8RrY

**Sample Output 1:**

No 2

## 我的解决方案
```cpp
#include <iostream>
#include <map>

//解题思路
//用map存储,下标为字符,值为该字符的个数
//遍历需求串,并将其每个字符的个数与商品串中该字符的个数做差
//若差值大于0,则说明该字符缺少,将该差值(即该字符缺少的个数)累加到shortage变量
//每一次从商品串中减去该字符的需求个数(若不够,将其值赋0),这样最终该串中的字符个数即多余的字符数

using namespace std;

//m中字符的总数
int sum(const map<char, int> &m)
{
    int s = 0;

    for (auto i = m.cbegin(); i != m.cend(); ++i) {
        s += i->second;
    }

    return s;
}

int main()
{
    map<char, int> goods, need;
    int shortage = 0; //缺少的个数
    int c;

    while ((c = cin.get()) != EOF && c != '\n') {
        ++goods[c];
    }
    while ((c = cin.get()) != EOF && c != '\n') {
        ++need[c];
    }
    for (const auto &x : need) {
        int tmp = x.second - goods[x.first];

        if (tmp >= 0) {
            shortage += tmp;
            goods[x.first] = 0;
        }
        else {
            goods[x.first] -= x.second;
        }
    }
    if (shortage) {
        cout << "No " << shortage << endl;
    }
    else {
        cout << "Yes " << sum(goods) << endl;
    }

    return 0;
}
```
