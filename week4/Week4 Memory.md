# Week 4 笔记：内存 (Memory)

## 1. 十六进制 (Hexadecimal)

十六进制常用于表示图像颜色（例如 `#000000` 为黑色，`#FFFFFF` 为白色）以及在编程中表示内存地址。
其基础形式为 `0-9` 和 `A-F`，逢 16 进 1。

---

## 2. 指针与地址 (& 和 *)

- `&`：取地址运算符，用于获取变量的内存地址。
- `*`：解引用运算符，用于访问指针所指向地址上的值。

**基础形式：**

```c
int n = 50;
int *p = &n;
```

- 可以把 `p` 视为一个地址（在 64 位系统中通常占 8 个字节），它指向 `n` 的存储位置。
- 指针变量 `p` 本身也有自己的地址。

**字符串与指针：**
- 字符串中的字符在内存中是连续存储的，每个字符占用 1 个字节。
- `string` 类型实际上存储的是字符串第一个字符的地址。
- 字符串以 `\0` (空字符) 结尾，作为结束标志。

因此，`string` 类型在 C 语言中实际上是 `char *`。
`s[1]` 和 `*(s + 1)` 的意思是一样的，都是访问字符串的第二个字符。
而 `s + 1` 则是指向字符串第二个字符的指针（即忽略第一个字符，从第二个字符开始）。

---

## 3. 字符串比较

**错误的比较方式：**

```c
#include <stdio.h>
#include <cs50.h>

int main(void)
{
    string i = get_string("i: ");
    string j = get_string("j: ");

    if (i == j)
    {
        printf("i and j are the same\n");
    }
    else
    {
        printf("i and j are different\n");
    }
}
```

此时我们发现，即使输入相同的字符串，程序依旧显示不同。这是因为 `i` 和 `j` 存储的是**地址**，而两个字符串在内存中被分配到了不同的位置，所以它们的地址是不一样的。

**正确的比较方式：**

使用 `strcmp` 函数进行比较。

```c
#include <stdio.h>
#include <cs50.h>
#include <string.h>

int main(void)
{
    string i = get_string("i: ");
    string j = get_string("j: ");

    if (strcmp(i, j) == 0)
    {
        printf("i and j are the same\n");
    }
    else
    {
        printf("i and j are different\n");
    }
}
```

我们不需要关心字符串的具体地址，`strcmp` 会比较两个地址所指向的字符串内容是否相等。

---

## 4. 动态内存分配 (malloc)

`malloc` 用于申请一块可用内存，返回该内存块第一个字节的地址。
- 如果申请失败，会返回 `NULL`（地址 0）。
- 使用 `malloc` 申请的内存，在使用完毕后必须用 `free` 释放。

**Tip: 我们要培养防御型编程思维，多用 `if` 检查返回值，防止程序崩溃。**

`strcpy` 可以将一个字符串的内容复制到另一个字符串中。标准格式：`strcpy(dest, src)`。

**课程示范代码：**

```c
#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <stdlib.h>
#include <cs50.h>

int main(void)
{
    string s = get_string("Input: ");
    if (s == NULL)
    {
        return 1;
    }

    int length = strlen(s);
    // 申请内存：长度 + 1 (为了存储结束符 \0)
    char *t = malloc(length + 1);
    if (t == NULL)
    {
        return 1;
    }

    strcpy(t, s);

    for (int i = 0; i < length; i++)
    {
        t[i] = toupper(s[i]);
    }

    t[length] = '\0'; // 确保字符串以 \0 结尾

    printf("Output: %s\n", t);

    free(t); // 释放内存
    return 0;
}
```

---

## 5. 内存检查工具 (valgrind)

`valgrind` 可以检查程序中的内存错误。
**注意：** 这是 Linux 环境中使用的工具（CS50 Codespace 中可用）。

常见错误包括：
- `malloc` 后没有 `free`（内存泄漏）。
- 访问越界（例如数组越界）。
- 使用未初始化的内存。

在 Windows 中可以使用 `less` 来进行管道输出分页查看（按空格翻页，按 `q` 退出）。

---

## 6. 交换函数 (swap)

课程中用 Binky 的小视频告诉我们，直接在一个函数中交换两个变量的值，如果只是传值调用，是不会影响原变量的。
如果要交换两个变量的值，需要使用指针（地址）。

**错误的 Swap（传值）：**

```c
void swap(int a, int b)
{
    int tmp = a;
    a = b;
    b = tmp;
}
```
缺陷：作用域只在这个函数内，`main` 函数中的变量不会改变。

**正确的 Swap（传址）：**

```c
#include <stdio.h>

void swap(int *a, int *b);

int main()
{
    int x = 1;
    int y = 2;
    printf("Before swap: x = %d, y = %d\n", x, y);
    swap(&x, &y); // 传递地址
    printf("After swap: x = %d, y = %d\n", x, y);
    return 0;
}

void swap(int *a, int *b)
{
    int temp = *a;
    *a = *b;
    *b = temp;
}
```

在这里 `a` 和 `b` 是 `x` 和 `y` 的地址，通过解引用 `*a` 和 `*b` 可以直接修改 `x` 和 `y` 的值。

**内存模型理解：**
- **Machine Code**: 机器码
- **Globals**: 全局变量
- **Heap**: 堆（`malloc` 分配的内存）
- **Stack**: 栈（函数调用、局部变量）

函数调用时，参数和局部变量压入栈中。函数返回后，栈帧释放。
**小故事：** CrowdStrike 曾因 Stack Overflow 导致系统崩溃，造成大量损失。C 语言中如果不注意内存限制，很容易出现这种情况。

---

## 7. 输入函数 (get_string vs scanf)

在 `cs50.h` 的 `get_string` 出现之前，我们可能这样写：

```c
char *s;
printf("Input: ");
scanf("%s", s);
```

这样非常危险，因为 `s` 没有初始化，指向未知的内存地址（野指针），写入数据会导致程序崩溃或安全漏洞。
正确的做法是先分配内存：

```c
char s[100]; // 分配栈内存
// 或者
char *s = malloc(100); // 分配堆内存
scanf("%s", s);
```

---

## 8. 文件操作 (File I/O)

### 8.1 基本概念

- **文件 (File)**：存储在外部介质（如硬盘）上的数据集合。
- **流 (Stream)**：C 语言把文件看作是一个字符（字节）的序列。
- **文件指针**：`FILE *fp;` 是操作文件的核心。`FILE` 是在 `stdio.h` 中定义的结构体。

### 8.2 文件的打开与关闭

#### 打开文件：`fopen()`

```c
FILE *fopen(const char *filename, const char *mode);
```

- **常用模式 (mode)**：
    - `"r"`: 只读（文件必须存在）。
    - `"w"`: 只写（文件不存在则创建；存在则清空内容）。
    - `"a"`: 追加（在文件末尾写入；不存在则创建）。
    - `"rb"`, `"wb"`, `"ab"`: 二进制模式。

#### 关闭文件：`fclose()`

```c
int fclose(FILE *stream);
```
**注意**：操作完文件必须关闭，否则可能导致数据丢失或资源泄露。

### 8.3 文件的读写操作

#### 字符读写
- `fputc(ch, fp)`：写入一个字符。
- `ch = fgetc(fp)`：读取一个字符。返回 `EOF` 表示文件结束或出错。

#### 字符串读写
- `fputs(str, fp)`：写入字符串。
- `fgets(buffer, n, fp)`：读取字符串。读取 `n-1` 个字符或遇到换行符为止。**(比 `gets` 安全)**

#### 格式化读写
- `fprintf(fp, "format", ...)`：写入格式化数据。
- `fscanf(fp, "format", ...)`：读取格式化数据。

#### 二进制块读写
- `fwrite(ptr, size, count, fp)`：写入数据。
- `fread(ptr, size, count, fp)`：读取数据。

### 8.4 文件的定位

- `fseek(fp, offset, whence)`：移动文件指针。
    - `SEEK_SET`: 文件开头
    - `SEEK_CUR`: 当前位置
    - `SEEK_END`: 文件末尾
- `ftell(fp)`：获取当前位置。
- `rewind(fp)`：重置到文件开头。

### 8.5 状态检测

- `feof(fp)`：判断是否到达文件末尾。
- `ferror(fp)`：检查是否出错。

### 8.6 代码示例：文件复制

```c
#include <stdio.h>
#include <stdint.h>

typedef uint8_t BYTE;

int main(int argc, char *argv[])
{
    if (argc != 3)
    {
        printf("Usage: ./copy source destination\n");
        return 1;
    }

    FILE *src = fopen(argv[1], "rb");
    if (src == NULL)
    {
        return 1;
    }

    FILE *dst = fopen(argv[2], "wb");
    if (dst == NULL)
    {
        fclose(src);
        return 1;
    }

    BYTE b;
    while (fread(&b, sizeof(b), 1, src) == 1)
    {
        fwrite(&b, sizeof(b), 1, dst);
    }

    fclose(src);
    fclose(dst);
    return 0;
}
```

---

## 9. 作业

使用学习的文件知识对图片进行多种操作（如滤镜、恢复等）。

---

## 附录：stdint.h 与 inttypes.h

### 1. `stdint.h` 定义的类型

引入了跨平台的固定宽度整数类型：
- **固定宽度整数**：`int8_t`, `uint8_t`, `int32_t`, `uint64_t` 等。
- **指针兼容类型**：`intptr_t`, `uintptr_t`。

### 2. `stdint.h` 定义的宏

- **极限值**：`INT8_MAX`, `UINT32_MAX` 等。

### 3. `inttypes.h`

包含了 `stdint.h` 并提供了格式化宏和转换函数。
- **格式化宏**：用于 `printf` 和 `scanf`。
    - `PRId64`: 打印 64 位有符号整数。
    - `SCNd64`: 读取 64 位有符号整数。

```c
#include <stdio.h>
#include <stdint.h>
#include <inttypes.h>

int main() {
    int64_t val = 123456789012345;
    printf("Value: %" PRId64 "\n", val);
    return 0;
}
```

**总结：** 建议使用 `stdint.h` 中的类型来保证代码的可移植性。
