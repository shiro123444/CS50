# C 语言基础语法

## 变量和数据类型

### 声明和初始化

在 C 语言中，使用变量前必须先声明其类型：

```c
int age;           // 声明
age = 25;          // 赋值

int score = 100;   // 声明并初始化
```

### 基本数据类型

```c
#include <cs50.h>
#include <stdio.h>

int main(void)
{
    int integer = 42;              // 整数
    float decimal = 3.14;          // 浮点数
    char letter = 'A';             // 字符
    string text = "Hello";         // 字符串（CS50）
    bool is_true = true;           // 布尔值（CS50）
    
    printf("Integer: %i\n", integer);
    printf("Float: %f\n", decimal);
    printf("Char: %c\n", letter);
    printf("String: %s\n", text);
}
```

### 格式化输出

| 占位符 | 类型 | 示例 |
|--------|------|------|
| `%i` 或 `%d` | 整数 | `printf("%i", 42);` |
| `%f` | 浮点数 | `printf("%f", 3.14);` |
| `%c` | 字符 | `printf("%c", 'A');` |
| `%s` | 字符串 | `printf("%s", "hello");` |

## 运算符

### 算术运算符

```c
int a = 10;
int b = 3;

int sum = a + b;        // 加法：13
int diff = a - b;       // 减法：7
int product = a * b;    // 乘法：30
int quotient = a / b;   // 除法：3（整数除法）
int remainder = a % b;  // 取模：1
```

### 整数除法的陷阱

```c
int x = 5;
int y = 2;
int result = x / y;     // 结果是 2，不是 2.5！

// 要得到浮点结果：
float result = (float) x / y;  // 结果是 2.5
```

### 复合赋值运算符

```c
int counter = 0;

counter = counter + 1;  // 传统方式
counter += 1;           // 复合赋值
counter++;              // 自增运算符
```

常用的复合运算符：
- `+=` 加法赋值
- `-=` 减法赋值
- `*=` 乘法赋值
- `/=` 除法赋值
- `%=` 取模赋值

### 比较运算符

```c
x < y   // 小于
x > y   // 大于
x <= y  // 小于等于
x >= y  // 大于等于
x == y  // 等于（注意是两个等号！）
x != y  // 不等于
```

### 逻辑运算符

```c
// AND（与）
if (x > 0 && x < 10)
{
    printf("x is between 0 and 10\n");
}

// OR（或）
if (x < 0 || x > 10)
{
    printf("x is outside the range\n");
}

// NOT（非）
if (!(x == 0))
{
    printf("x is not zero\n");
}
```

## 条件语句

### if 语句

```c
int score = 85;

if (score >= 90)
{
    printf("Grade: A\n");
}
else if (score >= 80)
{
    printf("Grade: B\n");
}
else if (score >= 70)
{
    printf("Grade: C\n");
}
else if (score >= 60)
{
    printf("Grade: D\n");
}
else
{
    printf("Grade: F\n");
}
```

### 三元运算符

简洁的条件表达式：

```c
int x = 10;
int y = 20;

int max = (x > y) ? x : y;  // 如果 x > y，则 max = x，否则 max = y
printf("Max: %i\n", max);
```

### switch 语句

```c
char grade = 'B';

switch (grade)
{
    case 'A':
        printf("Excellent!\n");
        break;
    case 'B':
        printf("Good!\n");
        break;
    case 'C':
        printf("Fair\n");
        break;
    default:
        printf("Invalid grade\n");
}
```

## 循环

### while 循环

```c
int i = 0;
while (i < 5)
{
    printf("%i\n", i);
    i++;
}
// 输出：0 1 2 3 4
```

### do-while 循环

至少执行一次：

```c
int n;
do
{
    n = get_int("Enter a positive number: ");
}
while (n <= 0);
```

### for 循环

```c
for (int i = 0; i < 5; i++)
{
    printf("%i\n", i);
}
// 输出：0 1 2 3 4
```

for 循环的结构：
```c
for (初始化; 条件; 更新)
{
    // 循环体
}
```

### 嵌套循环

```c
// 打印 3x3 的网格
for (int i = 0; i < 3; i++)
{
    for (int j = 0; j < 3; j++)
    {
        printf("# ");
    }
    printf("\n");
}
```

输出：
```
# # # 
# # # 
# # # 
```

## 实践示例

### 示例 1：计算器

```c
#include <cs50.h>
#include <stdio.h>

int main(void)
{
    int x = get_int("x: ");
    int y = get_int("y: ");
    
    printf("x + y = %i\n", x + y);
    printf("x - y = %i\n", x - y);
    printf("x * y = %i\n", x * y);
    printf("x / y = %i\n", x / y);
    printf("x %% y = %i\n", x % y);
}
```

### 示例 2：判断奇偶数

```c
#include <cs50.h>
#include <stdio.h>

int main(void)
{
    int n = get_int("Enter a number: ");
    
    if (n % 2 == 0)
    {
        printf("%i is even\n", n);
    }
    else
    {
        printf("%i is odd\n", n);
    }
}
```

### 示例 3：打印金字塔

```c
#include <cs50.h>
#include <stdio.h>

int main(void)
{
    int height = get_int("Height: ");
    
    for (int i = 0; i < height; i++)
    {
        // 打印空格
        for (int j = 0; j < height - i - 1; j++)
        {
            printf(" ");
        }
        
        // 打印井号
        for (int j = 0; j <= i; j++)
        {
            printf("#");
        }
        
        printf("\n");
    }
}
```

输入 `4` 时的输出：
```
   #
  ##
 ###
####
```

### 示例 4：输入验证

```c
#include <cs50.h>
#include <stdio.h>

int main(void)
{
    int n;
    do
    {
        n = get_int("Enter a number between 1 and 10: ");
    }
    while (n < 1 || n > 10);
    
    printf("You entered: %i\n", n);
}
```

## 常量

使用 `const` 定义常量：

```c
const int MAX_SCORE = 100;
const float PI = 3.14159;

// 常量不能被修改
// MAX_SCORE = 200;  // 错误！
```

## 类型转换

### 隐式转换

```c
int x = 5;
float y = x;  // 自动转换为 5.0
```

### 显式转换（类型强制转换）

```c
float average = (float) sum / count;
int rounded = (int) 3.7;  // 结果是 3
```

## 作用域

变量的作用域是它可以被访问的范围：

```c
int main(void)
{
    int x = 10;  // x 在整个 main 函数中可见
    
    if (x > 5)
    {
        int y = 20;  // y 只在这个 if 块中可见
        printf("x = %i, y = %i\n", x, y);
    }
    
    // printf("%i", y);  // 错误！y 在这里不可见
}
```

## 常见错误和调试

### 1. 使用 = 而不是 ==

```c
int x = 5;

if (x = 10)  // 错误！这是赋值，不是比较
{
    printf("x is 10\n");
}

if (x == 10)  // 正确！这是比较
{
    printf("x is 10\n");
}
```

### 2. 无限循环

```c
int i = 0;
while (i < 10)
{
    printf("%i\n", i);
    // 忘记增加 i，导致无限循环！
}
```

### 3. 整数溢出

```c
int big = 2147483647;  // int 的最大值
big = big + 1;         // 溢出！结果是负数
```

### 4. 未初始化的变量

```c
int x;
printf("%i\n", x);  // 危险！x 的值是未定义的
```

## 调试技巧

### 使用 printf 调试

```c
int x = 5;
int y = 10;

printf("Before: x = %i, y = %i\n", x, y);
x = x + y;
printf("After: x = %i, y = %i\n", x, y);
```

### 使用 debug50

CS50 提供的调试工具：

```bash
debug50 ./program
```

可以设置断点、单步执行、查看变量值。

## 小结

本课我们学习了：

- ✅ C 语言的基本数据类型和变量
- ✅ 各种运算符（算术、比较、逻辑）
- ✅ 条件语句（if, else, switch）
- ✅ 循环结构（while, for, do-while）
- ✅ 常见错误和调试技巧

## 练习题

1. 编写程序计算两个数的平均值
2. 编写程序判断一个年份是否为闰年
3. 编写程序打印 1 到 100 之间所有 3 的倍数
4. 编写程序实现简单的猜数字游戏

## Week 1 作业提示

### Mario 问题

- 使用嵌套循环
- 外层循环控制行数
- 内层循环控制每行的空格和井号

### Cash/Credit 问题

- 使用 do-while 循环验证输入
- 使用取模运算符（%）获取数字
- 使用整数除法（/）移除数字

---

**上一课：** [从 Scratch 到 C](lesson-01.md) | **下一章：** [Week 2: Arrays](../chapter-03/README.md)

---

## 💬 遇到问题？

如果你在学习过程中遇到任何问题或疑问，欢迎：

- 📝 [提交学习问题](https://github.com/YOUR_USERNAME/YOUR_REPO/issues/new?template=question.md) - 获取帮助和解答
- 🐛 [报告错误](https://github.com/YOUR_USERNAME/YOUR_REPO/issues/new?template=bug.md) - 帮助我们改进内容
- 💡 [提出建议](https://github.com/YOUR_USERNAME/YOUR_REPO/issues/new?template=enhancement.md) - 分享你的想法

📖 不确定如何提交？查看 [Issue 提交指南](../../.github/ISSUE_GUIDE.md)

---

<Giscus />
