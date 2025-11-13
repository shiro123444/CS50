# 从 Scratch 到 C

## 编程语言的转换

在 Week 0，我们使用 Scratch 的积木块来编程。现在，我们将学习如何用文本来表达相同的编程概念。

![Scratch to C](../../resources/images/scratch-to-c.png)

## Scratch vs C：概念对比

### 1. Hello World

**Scratch:**
```
当绿旗被点击
说 "hello, world"
```

**C:**
```c
#include <stdio.h>

int main(void)
{
    printf("hello, world\n");
}
```

### 2. 变量

**Scratch:**
```
将 counter 设为 0
将 counter 增加 1
```

**C:**
```c
int counter = 0;
counter = counter + 1;
// 或简写为
counter++;
```

### 3. 条件判断

**Scratch:**
```
如果 <x < y> 那么
  说 "x is less than y"
```

**C:**
```c
if (x < y)
{
    printf("x is less than y\n");
}
```

### 4. 条件分支

**Scratch:**
```
如果 <x < y> 那么
  说 "x is less than y"
否则
  说 "x is not less than y"
```

**C:**
```c
if (x < y)
{
    printf("x is less than y\n");
}
else
{
    printf("x is not less than y\n");
}
```

### 5. 多重条件

**Scratch:**
```
如果 <x < y> 那么
  说 "x is less than y"
否则
  如果 <x > y> 那么
    说 "x is greater than y"
  否则
    说 "x is equal to y"
```

**C:**
```c
if (x < y)
{
    printf("x is less than y\n");
}
else if (x > y)
{
    printf("x is greater than y\n");
}
else
{
    printf("x is equal to y\n");
}
```

## 循环结构对比

### While 循环

**Scratch:**
```
重复直到 <not <条件>>
  执行动作
```

**C:**
```c
while (条件)
{
    // 执行动作
}
```

### 计数循环

**Scratch:**
```
重复 50 次
  说 "hello, world"
```

**C:**
```c
for (int i = 0; i < 50; i++)
{
    printf("hello, world\n");
}
```

### 永远循环

**Scratch:**
```
重复执行
  执行动作
```

**C:**
```c
while (true)
{
    // 执行动作
}
```

## C 语言的新概念

### 1. 编译（Compilation）

C 语言是编译型语言，需要先编译再运行：

```bash
# 编译程序
make hello

# 运行程序
./hello
```

编译过程：
```
源代码 (hello.c) → 编译器 → 机器码 (hello)
```

### 2. 数据类型

C 语言需要明确指定变量的类型：

| 类型 | 说明 | 示例 |
|------|------|------|
| `int` | 整数 | `int age = 25;` |
| `float` | 浮点数 | `float price = 9.99;` |
| `char` | 字符 | `char grade = 'A';` |
| `string` | 字符串 | `string name = "Alice";` |
| `bool` | 布尔值 | `bool is_student = true;` |

### 3. 函数

在 C 语言中，所有代码都必须在函数内：

```c
#include <stdio.h>

int main(void)
{
    // 你的代码写在这里
    return 0;
}
```

- `main` 是程序的入口点
- `void` 表示不接受参数
- `return 0` 表示程序正常结束

### 4. 头文件

使用库函数前需要包含头文件：

```c
#include <stdio.h>   // 标准输入输出
#include <cs50.h>    // CS50 库
#include <string.h>  // 字符串操作
#include <math.h>    // 数学函数
```

### 5. 语句结束符

C 语言的每条语句必须以分号结束：

```c
printf("hello, world\n");
int x = 5;
x = x + 1;
```

## CS50 库

CS50 提供了一些简化输入的函数：

```c
#include <cs50.h>

int main(void)
{
    string name = get_string("What's your name? ");
    printf("hello, %s\n", name);
}
```

常用的 CS50 函数：

| 函数 | 说明 |
|------|------|
| `get_int()` | 获取整数输入 |
| `get_float()` | 获取浮点数输入 |
| `get_string()` | 获取字符串输入 |
| `get_char()` | 获取字符输入 |

## 第一个 C 程序

让我们编写一个简单的程序：

```c
#include <cs50.h>
#include <stdio.h>

int main(void)
{
    // 获取用户名字
    string name = get_string("What's your name? ");
    
    // 打印问候
    printf("hello, %s\n", name);
}
```

### 程序分析

1. **包含头文件**
   ```c
   #include <cs50.h>
   #include <stdio.h>
   ```

2. **定义主函数**
   ```c
   int main(void)
   {
   ```

3. **获取输入**
   ```c
   string name = get_string("What's your name? ");
   ```

4. **输出结果**
   ```c
   printf("hello, %s\n", name);
   ```
   - `%s` 是字符串的占位符
   - `\n` 是换行符

## 编译和运行

### 使用 make 命令

```bash
$ make hello
$ ./hello
What's your name? David
hello, David
```

### 使用 clang 编译器

```bash
$ clang -o hello hello.c -lcs50
$ ./hello
```

参数说明：
- `-o hello` 指定输出文件名
- `hello.c` 源代码文件
- `-lcs50` 链接 CS50 库

## 常见错误

### 1. 忘记分号

```c
printf("hello, world\n")  // 错误：缺少分号
```

### 2. 忘记包含头文件

```c
int main(void)
{
    printf("hello\n");  // 错误：未包含 stdio.h
}
```

### 3. 拼写错误

```c
printf("hello, world\n");  // 正确
Printf("hello, world\n");  // 错误：大小写敏感
```

### 4. 括号不匹配

```c
if (x < y)
{
    printf("x is less\n");
// 错误：缺少右花括号
```

## 调试技巧

### 1. 使用 printf 调试

```c
int x = 5;
printf("x = %i\n", x);  // 打印变量值
```

### 2. 阅读错误信息

编译器会告诉你错误的位置：

```
hello.c:5:5: error: expected ';' after expression
    printf("hello\n")
                     ^
                     ;
```

### 3. 逐步测试

一次添加一小段代码，确保每部分都能工作。

## 小结

本课我们学习了：

- ✅ Scratch 和 C 语言的概念对应关系
- ✅ C 语言的基本结构和语法
- ✅ 编译和运行 C 程序的方法
- ✅ 常见错误和调试技巧

## 练习

1. 编写一个程序，询问用户的年龄并打印出来
2. 修改程序，计算用户出生的年份
3. 尝试故意制造一些错误，观察编译器的错误信息

---

**上一课：** [Week 0 总结](../chapter-01/lesson-02.md) | **下一课：** [C 语言基础语法](lesson-02.md)

---

<Giscus />
