# Week 2 - 数组

## 本周主题

学习如何使用数组来存储和处理多个相关数据。

## 主要内容

### 数组基础

- **声明数组**：`int numbers[5];`
- **初始化**：`int numbers[] = {1, 2, 3, 4, 5};`
- **访问元素**：`numbers[0]`（索引从0开始）
- **遍历数组**：使用循环访问每个元素

### 字符串

在C语言中，字符串就是字符数组：

```c
char name[] = "Alice";
// 等价于
char name[] = {'A', 'l', 'i', 'c', 'e', '\0'};
```

注意：字符串以`\0`（空字符）结尾。

### 命令行参数

```c
int main(int argc, char *argv[])
{
    // argc: 参数个数
    // argv: 参数数组
}
```

## 常用字符串函数

```c
#include <string.h>

strlen(s)     // 字符串长度
strcpy(s1, s2) // 复制字符串
strcmp(s1, s2) // 比较字符串
```

## 密码学入门

- 凯撒密码
- 字母表位移

## Problem Sets

- Scrabble
- Readability
- Caesar/Substitution

## 学习建议

- 理解数组下标从0开始
- 注意数组越界问题
- 熟悉字符串处理
- 掌握命令行参数的使用
