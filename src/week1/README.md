# Week 1 - C语言

## 本周主题

本周我们开始学习C语言，这是一门强大的编程语言，也是理解计算机底层工作原理的重要工具。

## 主要内容

### C语言基础

- **语法**：C语言的基本语法规则
- **变量与类型**：int, float, char, string等
- **运算符**：算术、比较、逻辑运算符
- **条件语句**：if, else if, else
- **循环**：while, for, do-while

### 编译过程

```bash
# 编译C程序
clang -o hello hello.c
./hello
```

或使用make：
```bash
make hello
./hello
```

## Hello, World!

第一个C程序：

```c
#include <stdio.h>

int main(void)
{
    printf("Hello, World!\n");
    return 0;
}
```

## 学习要点

- 理解编译和运行的区别
- 掌握基本的输入输出
- 学会使用CS50库
- 注意代码风格和缩进

## Problem Sets

- Hello
- Mario (Less/More)
- Cash/Credit

## 常见错误

- 忘记分号
- 括号不匹配
- 变量未声明
- 类型不匹配

## 调试技巧

使用`printf`调试：
```c
printf("Debug: x = %d\n", x);
```

使用`debug50`：
```bash
debug50 ./program
```
