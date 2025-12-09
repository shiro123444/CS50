**这周的学习感觉是一种过渡式的学习，学习编译(Compiling)和调试(Debugging)为了下周week3的Algorithmic（算法）理解,数组(Array)和字符串（String)则是算法内容的主体部分,让我们来看看这周我的笔记吧 


# Compiling(编译)
在 Week 1 中，我们使用 `make hello` 来编译代码。实际上 `make` 只是一个自动化工具，它调用了编译器（如 `clang`）。编译并不是一步完成的，它包含**四个 distinct 的阶段**：

## 四个阶段详解：

1. **预处理 (Preprocessing):**
    
    - 处理以 `#` 开头的指令（如 `#include <stdio.h>`）。
        
    - 预处理器将头文件的内容直接**复制粘贴**到你的源代码中，替换掉 `#include` 行。
        
2. **编译 (Compiling):**
    
    - 将预处理后的 C 代码转换为**汇编语言 (Assembly Code)**。
        
    - 汇编语言更接近底层硬件，但人类仍勉强可读。
        
3. **汇编 (Assembling):**
    
    - 将汇编代码转换为**机器码 (Machine Code)**，即二进制的 0 和 1。
        
    - 生成的也是目标文件（object file），通常以 `.o` 结尾。
        
4. **链接 (Linking):**
    
    - 将你的机器码与库文件（如 `cs50.c`, `printf` 的实现）的机器码合并。
        
    - 最终生成可执行文件（如 `a.out` 或 `hello`）。
        

> **关键点：** 当你遇到 "undefined reference" 错误时，通常是**链接**阶段出了问题（例如，你使用了函数但没有链接包含该函数定义的库，如 `-lcs50`）。




**下面是拓展部分（在马兰牢师的基础上的一些延申）**
## 常用编译命令与标志（Flags）

- 基本编译：

```sh
clang hello.c -o hello
```

- 多文件与分步编译：

```sh
clang -c util.c -o util.o
clang -c main.c -o main.o
clang util.o main.o -o app
```

- 选择标准与开启警告：

```sh
clang -std=c11 -Wall -Wextra -Wpedantic hello.c -o hello
```

- 调试信息与优化级别：

```sh
clang -g -O0 hello.c -o hello   # 调试优先，禁优化
clang -O2 hello.c -o hello      # 常用优化
clang -O3 hello.c -o hello      # 更激进优化
```

- 运行期错误检测（Sanitizer）：

```sh
clang -g -fsanitize=address -fsanitize=undefined hello.c -o hello
```

- 头文件与库路径：

```sh
clang -Iinclude -Llib main.c -o app -lcs50 -lm
```

要点：
- `-I` 告诉编译器到哪个目录找头文件；`-L` 告诉链接器到哪个目录找库。
- `-l<name>` 链接名为 `lib<name>.a` 或 `lib<name>.so` 的库（顺序通常放在目标文件之后）。
- 警告应视为错误处理（`-Werror`），可提升代码质量，但会提高编译严格度。

## 对象文件与链接顺序（Link Order）

- `.o` 是中间产物，包含单个翻译单元的机器码与符号表。
- 链接时库的顺序可能影响符号解析（静态库尤其明显）：

```sh
clang main.o -lutil -o app   # 若未解析符号，尝试将库放末尾
clang main.o util.o -o app   # 直接与对象文件链接更稳妥
```

## 条件编译与宏（Preprocessor）

```c
#define DEBUG 1
#if DEBUG
printf("debug on\n");
#endif
```

- 使用 `#ifdef / #ifndef / #if / #else / #endif` 控制是否编译某段代码。
- 使用 `-DNAME=VALUE` 在命令行定义宏：`clang -DDEBUG=1 main.c -o app`。

## Makefile 基础与增量构建（Incremental Build）

一个最小可用示例：

```make
CC = clang
CFLAGS = -std=c11 -Wall -Wextra -O2
LDFLAGS =
LDLIBS = -lm

all: app

app: main.o util.o
	$(CC) $(LDFLAGS) -o $@ $^ $(LDLIBS)

main.o: main.c util.h
util.o: util.c util.h

.PHONY: clean
clean:
	rm -f *.o app
```

要点：
- `target: prerequisites` 与下一行的命令（以制表符开头）构成规则。
- 只重新编译发生变动的文件，显著提升构建效率。
- `$(CC) $(CFLAGS) -c file.c -o file.o` 是典型的对象文件构建命令。

 ## 常见错误与排查

 - `undefined reference to foo`：缺少库或对象文件；检查链接顺序与 `-l/-L`。
 - `fatal error: header.h: No such file or directory`：头文件路径错误；使用 `-I` 或修正相对路径。
 - `multiple definition of symbol`：在多个 `.c` 中重复定义；将可变全局放在单个 `.c` 中定义，其他文件用 `extern` 声明。
 - 隐式声明或原型不匹配：启用 `-Wall -Wextra -Wpedantic`，确保函数原型在使用前已声明。

 > 实践建议：从 `-std=c11 -Wall -Wextra -Wpedantic -Werror -g` 起步，开发时用 `-O0` 与 Sanitizer；发布时转为 `-O2/-O3` 并移除 Sanitizer。
 
 -------

 


# Debugging(调试)
 ## 调试的目标
 
 - 识别并定位运行期错误（崩溃、逻辑错误、内存越界/泄漏）。
 - 观察变量与调用栈，理解程序的真实执行路径。
 - 通过断点与单步执行缩小问题范围，复现实验性修复。
 
 ## 编译为可调试二进制
 
 ```sh
 clang -g -O0 main.c -o app                      # 启用调试符号，禁优化
 clang -g -O0 -fsanitize=address -fsanitize=undefined main.c -o app  # 开启 ASan/UBSan
 ```
 
 要点：
 - `-g` 让调试器能映射符号与源代码；`-O0` 便于逐行跟踪。
 - Sanitizer 在运行期捕捉内存错误与未定义行为，输出精确堆栈与源位置。
 
 ## gdb 入门
 
 启动与运行：
 
 ```sh
 gdb ./app
 (gdb) run                       # 或 r，开始运行
 ```
 
 设置断点：
 
 ```
 (gdb) break main                # 在函数入口断点
 (gdb) break foo                 # 在 foo() 断点
 (gdb) break file.c:42           # 在指定行断点
 (gdb) info breakpoints          # 查看断点列表
 (gdb) delete 1                  # 删除编号为 1 的断点
 ```
 
 单步与继续：
 
 ```
 (gdb) next                      # 单步，越过函数
 (gdb) step                      # 进入函数
 (gdb) finish                    # 运行至当前函数返回
 (gdb) continue                  # 继续执行到下一个断点
 ```
 
 检查状态：
 
 ```
 (gdb) print x                   # 打印变量/表达式
 (gdb) backtrace                 # 调用栈（bt）
 (gdb) frame 0                   # 切换到栈帧 0
 (gdb) up / down                 # 在栈帧中上下移动
 (gdb) info locals               # 查看当前帧局部变量
 (gdb) list                      # 查看源代码片段
 ```
 
 条件断点与监视：
 
 ```
 (gdb) break foo if x == 0       # 条件断点
 (gdb) watch arr[i]              # 监视表达式变化（硬件/软件断点）
 ```
 
 TUI 模式（源码视图）：
 
 ```
 (gdb) layout src                # 展示源码窗口
 Ctrl+X 然后 A                  # 切换 TUI 模式
 ```
 
 常见崩溃定位：
 
 ```
 Program received signal SIGSEGV, Segmentation fault.
 (gdb) backtrace                 # 定位调用栈顶层出错位置
 (gdb) frame 0; list             # 切到出错帧并查看源码
 (gdb) print ptr                 # 检查指针是否为 NULL 或野指针
 ```
 
 ## printf 调试与日志
 
 - 将关键变量用 `fprintf(stderr, "x=%d\n", x);` 打印到标准错误流，避免与正常输出混淆。
 - 为密集路径加入临时日志，再结合 gdb 断点聚焦问题区间。
 
 ## Valgrind（内存泄漏/非法访问）
 
 编译与运行：
 
 ```sh
 clang -g -O0 main.c -o app
 valgrind --leak-check=full --show-leak-kinds=all ./app
 ```
 
 输出解读：
 - Invalid read/write：越界、使用已释放内存或未初始化指针。
 - Definitely lost：确定泄漏（忘记 `free`）。
 - Indirectly lost：间接泄漏（结构中成员未释放）。
 
 修复建议：
 - 每个 `malloc/calloc/realloc` 都应有对应 `free`；约定所有权与释放点。
 - 避免返回指向栈内局部变量的指针；统一字符串与缓冲区长度管理。
 
 ## Sanitizer（运行期错误检测）
 
 常用配置：
 
 ```sh
 clang -g -O0 -fsanitize=address -fsanitize=undefined main.c -o app
 ASAN_OPTIONS=detect_leaks=1 ./app
 ```
 
 要点：
 - ASan 定位越界、UAF（Use-After-Free）、重叠写等；UBSan 捕捉未定义行为（如整数溢出/除零）。
 - 输出包含栈轨迹与源位置，适合与 gdb 联合使用。
 
 ## VS Code 调试（可选）
 
 简化的 `launch.json`（以 gdb 为例）：
 
 ```json
 {
   "version": "0.2.0",
   "configurations": [
     {
       "name": "Debug app",
       "type": "cppdbg",
       "request": "launch",
       "program": "${workspaceFolder}/app",
       "args": [],
       "stopAtEntry": false,
       "cwd": "${workspaceFolder}",
       "environment": [],
       "externalConsole": false,
       "MIMode": "gdb",
       "setupCommands": [{ "text": "-enable-pretty-printing" }]
     }
   ]
 }
 ```
 
 要点：
 - 使用 `-g -O0` 编译；在编辑器中设置断点并可视化变量与调用栈。
 - Windows 环境可使用 `lldb` 或 `gdb`（需安装对应扩展与工具链）。
------
# Array(数组)
**我们在week1的笔记中已经初步介绍了数组以及字符数组，现在来看下其他的内容

## 1. 声明与初始化

```c
int a[5];                      // 未初始化（局部变量为不确定值）
int b[5] = {1, 2, 3, 4, 5};    // 完整初始化
int c[5] = {1, 2};             // 其余元素置零
int d[]  = {10, 20, 30};       // 由初始化列表推断长度（3）

char s1[6] = {'H','e','l','l','o','\0'}; // 手动终止符
char s2[]  = "Hello";                     // 自动添加终止符
```

要点：
- 局部数组未初始化即为不确定值；可用初始化列表或 `memset` 清零。
- 字符串字面量以 `\0` 结尾；数组容量需包含终止符。

## 2. 边界与长度计算

```c
int x[5] = {0};
size_t n = sizeof(x) / sizeof(x[0]);   // 仅在同一作用域内成立
```

要点：
- 越界访问是未定义行为；常见错误为 `for (i = 0; i <= n; i++)`。
- 在函数中 `sizeof(arr)` 得到的是指针大小（非数组大小）。

## 3. 遍历与常见聚合运算

```c
int v[] = {7, 3, 9, 2, 5};
size_t n = sizeof(v) / sizeof(v[0]);
int sum = 0, mx = v[0];
for (size_t i = 0; i < n; i++) {
    sum += v[i];
    if (v[i] > mx) mx = v[i];
}
double avg = (double)sum / n;
```

线性查找：

```c
int find(const int *arr, size_t n, int target) {
    for (size_t i = 0; i < n; i++) if (arr[i] == target) return (int)i;
    return -1;
}
```

## 4. 多维数组（二维示例）

```c
int m[2][3] = {
    {1, 2, 3},
    {4, 5, 6}
};
for (int i = 0; i < 2; i++) {
    for (int j = 0; j < 3; j++) {
        printf("%d ", m[i][j]);
    }
    printf("\n");
}
```

要点：
- C 使用行优先（row-major）存储：`m[i][j]` 连续排布每行元素。
- 作为参数传入时需指定除第一维之外的长度：

```c
int row_sum(int (*mat)[3], int rows, int r) {
    int s = 0;
    for (int j = 0; j < 3; j++) s += mat[r][j];
    return s;
}
```

## 5. 数组参数与“衰减”

```c
int sum_arr(const int *arr, size_t n) {
    int s = 0; for (size_t i = 0; i < n; i++) s += arr[i]; return s;
}

int a5[] = {1,2,3};
printf("%d\n", sum_arr(a5, 3));
```

要点：
- 形参 `int arr[]` 与 `int *arr` 等价；数组在表达式中衰减为指向首元素的指针。
- 需显式传入长度或使用约定的终止符（如字符串的 `\0`）。

## 6. 字符数组与字符串

```c
char buf[8] = "CS50";               // 容量 8，内容含终止符
printf("%zu\n", strlen(buf));       // 4（不含终止符）
strcpy(buf, "Hi");                  // 复制字符串（确保容量足够）
strcat(buf, "!");                   // 追加（确保剩余空间）
```

要点：
- `strlen` 计算到 `\0` 之前的长度；避免使用未终止的字符数组。
- `strcpy/strcat` 不检查缓冲区长度；更安全的替代为 `strncpy/strncat` 或 `snprintf`。

## 7. 内存操作：`memcpy/memmove/memset`

```c
int arr1[5] = {1,2,3,4,5};
int arr2[5];
memcpy(arr2, arr1, sizeof(arr1));    // 复制字节块（区域不可重叠）

int arr3[6] = {1,2,3,4,5,6};
memmove(arr3 + 1, arr3, 5 * sizeof(int)); // 支持重叠移动

int arr4[4];
memset(arr4, 0, sizeof(arr4));       // 将字节置值（通常用于清零）
```

要点：
- `memcpy` 区域不可重叠；若可能重叠，则使用 `memmove`。
- `memset` 按字节设置；对非 0 值的整型设置需谨慎。

## 8. 动态数组（堆分配）

```c
size_t n = 10;
int *dyn = malloc(n * sizeof(int));
if (!dyn) { /* 处理分配失败 */ }
for (size_t i = 0; i < n; i++) dyn[i] = (int)i;

// 扩容
n *= 2;
int *tmp = realloc(dyn, n * sizeof(int));
if (tmp) dyn = tmp; else { /* 处理失败并保留原指针 */ }

// 释放
free(dyn);
```

零初始化：

```c
int *zero = calloc(10, sizeof(int)); // 所有字节置零
free(zero);
```

要点：
- 每个 `malloc/calloc/realloc` 需对应 `free`；避免内存泄漏。
- `realloc` 失败时返回 `NULL` 且不释放原指针；用临时变量承接。

## 9. 典型错误与修复

- 越界访问：循环条件写为 `< n` 而非 `<= n`。
- 未终止字符串：末尾补 `\0`，或使用更安全的 `snprintf`。
- 悬垂指针：释放后置 `NULL`；不要返回指向局部数组的指针。
- 长度计算错误：在函数中不要使用 `sizeof(arr)` 获取元素个数。
------
# String(字符串)

## 1. CS50 的 `string` 与标准 C

```c
#include <cs50.h>
#include <stdio.h>
#include <string.h>

int main(void) {
    string name = get_string("Name: ");
    printf("Hello, %s\n", name);
    printf("len = %zu\n", strlen(name));
}
```

要点：
- CS50 的 `string` 本质是 `char*`。
- 长度计算使用 `strlen`，不包含终止符 `\0`。

## 2. 存储与终止

```c
char a[] = "CS50";
char *b = "CS50";
```

要点：
- 字符数组可修改内容；指向字面量的指针通常只读。
- 字符串以 `\0` 终止，容量需包含该字节。

## 3. 输入读取

CS50：

```c
#include <cs50.h>
string s = get_string("Input: ");
```

标准库：

```c
#include <stdio.h>
char buf[64];
fgets(buf, sizeof(buf), stdin);
```

`scanf` 宽度限定：

```c
char buf2[32];
scanf("%31s", buf2);
```

要点：
- `fgets` 可读取含空格的整行并保留换行。
- `scanf("%s")` 以空白为分隔，需加宽度避免溢出。

## 4. 遍历与大小写转换

```c
#include <ctype.h>
#include <string.h>

void to_upper(char *s) {
    size_t n = strlen(s);
    for (size_t i = 0; i < n; i++) {
        s[i] = (char)toupper((unsigned char)s[i]);
    }
}
```

要点：
- `toupper/tolower` 参数应转换为 `unsigned char` 再提升为 `int`。
- 避免在循环中反复调用 `strlen`，可预先保存长度。

## 5. 比较、复制与拼接

```c
#include <string.h>

int eq = strcmp("abc", "abc") == 0;
int prefix = strncmp("abcdef", "abc", 3) == 0;

char dst[16];
strncpy(dst, "hello", sizeof(dst) - 1);
dst[sizeof(dst) - 1] = '\0';

char msg[16] = "hi";
strncat(msg, "!", sizeof(msg) - strlen(msg) - 1);
```

要点：
- `strcmp` 返回负/零/正；`strncmp` 受限长度比较。
- 使用受限复制与拼接并确保手动终止。
- `snprintf` 是更安全的格式化拼接方式。

## 6. 查找与子串

```c
#include <string.h>

const char *p = strchr("banana", 'a');
const char *q = strstr("abracadabra", "cad");
```

要点：
- `strchr/strrchr` 查找字符首次/末次出现。
- `strstr` 查找子串起始位置。

*以下内容不打职业不用钻研说是*

## 7. 动态字符串

```c
#include <stdlib.h>
#include <string.h>

const char *src = "CS50";
char *copy = malloc(strlen(src) + 1);
strcpy(copy, src);
free(copy);
```

或：

```c
char *dup = strdup("hello");
free(dup);
```

要点：
- `malloc` 分配长度需加 1 以容纳终止符。
- `strdup` 分配并复制，需 `free`。

## 8. 多字节与 UTF-8 提醒

- 许多函数按字节处理，UTF-8 下单个字符可能占多个字节。
- 以字节为单位的截断可能破坏编码；处理国际化文本需使用专门库。

## 9. 常见错误与修复

- 未留终止符空间。
- 修改字符串字面量。
- 使用未限定宽度的 `scanf("%s")`。
- 迭代时越界或遗漏终止条件。

## 10. 去除换行与清理输入

```c
#include <string.h>
#include <stdio.h>
char buf[64];
if (fgets(buf, sizeof(buf), stdin)) {
    size_t n = strlen(buf);
    if (n && buf[n - 1] == '\n') buf[n - 1] = '\0';
}
```

要点：
- `fgets` 保留换行符；常在处理前去除末尾 `\n`。
- 输入前可将缓冲区清零或初始化为已知状态。

## 11. 分割与标记（Tokenize）

```c
#include <string.h>
char s[] = "a,b,c";
for (char *p = strtok(s, ","); p; p = strtok(NULL, ",")) {
    /* use p */
}
```

要点：
- `strtok` 会修改源字符串并使用内部静态状态；对多线程或多串并行使用可选 `strtok_r`（POSIX）。
- 先复制只读源再分割，避免破坏原内容。

## 12. 数值转换与校验

```c
#include <errno.h>
#include <stdlib.h>
errno = 0; char *end = NULL;
long v = strtol("123", &end, 10);
int ok = (errno == 0 && end && *end == '\0');
```

要点：
- 使用 `strtol/strtoul/strtod` 获取 `end` 指针与 `errno`，检测溢出与格式错误。
- 避免 `atoi/atof`，其错误不可检测。

## 13. 安全格式化输出

```c
#include <stdio.h>
char out[32];
int n = snprintf(out, sizeof(out), "%s-%d", "tag", 42);
int fits = (n >= 0 && (size_t)n < sizeof(out));
```

要点：
- `snprintf` 返回尝试写入的字符数；用它判断是否截断。
- 使用足够的缓冲区并统一格式化路径，降低溢出风险。

## 14. 不区分大小写比较

```c
#include <ctype.h>
#include <string.h>
int icmp(const char *a, const char *b) {
    while (*a && *b) {
        unsigned char ca = (unsigned char)*a;
        unsigned char cb = (unsigned char)*b;
        int da = tolower(ca);
        int db = tolower(cb);
        if (da != db) return da - db;
        a++; b++;
    }
    return (unsigned char)*a - (unsigned char)*b;
}
```

要点：
- 某些系统提供 `strcasecmp`（POSIX）；跨平台可用手写版本。

## 15. 动态构建与追加

```c
#include <stdlib.h>
#include <string.h>
char *s = NULL; size_t cap = 0; size_t len = 0;
const char *add = "hello";
size_t need = len + strlen(add) + 1;
if (need > cap) { size_t newcap = need * 2; char *tmp = realloc(s, newcap); if (tmp) { s = tmp; cap = newcap; } }
if (s) { memcpy(s + len, add, strlen(add) + 1); len += strlen(add); }
free(s);
```

要点：
- 采用“容量翻倍”策略减少重新分配次数；`realloc` 返回后再更新指针与容量。
- 统一维护 `len/cap`，确保结尾 `\0` 始终存在。

## 16. `const` 正确性与 API 设计

```c
int starts_with(const char *s, const char *prefix) {
    size_t n = strlen(prefix);
    return strncmp(s, prefix, n) == 0;
}
```

要点：
- 只读参数声明为 `const char*`，便于调用者传入字面量或只读缓冲区。
- 返回只读视图时也应使用 `const` 限定指针类型。

-----
#  Command-Line Arguments(命令行参数)

你可以在程序启动时向 `main` 函数传递参数。


```c
int main(int argc, string argv[])
{
    // ...
}
```

- **`argc` (Argument Count):** 参数的数量。
    
    - 注意：程序名称本身算作第一个参数。
        
    - 例如：执行 `./greet David`，`argc` 为 2。
        
- **`argv` (Argument Vector):** 参数数组（字符串数组）。
    
    - `argv[0]` = "./greet"
        
    - `argv[1]` = "David"
        

**应用场景:** 这让你的程序更像标准的 Linux 命令（如 `ls -l` 或 `mkdir foo`），不需要在程序运行后等待用户 `get_string`，而是直接在命令行处理输入。

---

# Exit Status  (退出现状)
程序结束的时候，计算机会得到一个返回值，通常是0或者1
- `return 0 `表示程序正常退出
- `return 1`  表示程序终止错误
- 你可以在终端输入 `echo $？`，查看最后一次运行命令的退出状态。


这在自动化脚本中很有用，其他程序可以检测你的程序是否成功运行。