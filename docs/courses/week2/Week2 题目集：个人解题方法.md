# 一.拼字游戏
| A   | B   | C   | D   | E   | F   | G   | H   | I   | J   | K   | L   | M   | N   | O   | P   | Q   | R   | S   | T   | U   | V   | W   | X   | Y   | Z   |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1   | 3   | 3   | 2   | 1   | 4   | 2   | 4   | 1   | 8   | 5   | 1   | 3   | 1   | 1   | 3   | 10  | 1   | 1   | 1   | 1   | 4   | 4   | 8   | 4   | 10  |
在拼字游戏中，玩家创造单词得分，得分是单词中每个字母分数的总和。
实现一个用 C 语言实现的程序，决定一个类似拼字游戏的获胜者。你的程序应该会提示输入两次：“玩家 1”输入词语“一次，”玩家 2“输入词语一次。然后，根据得分最高的玩家，你的程序应打印“玩家 1 获胜！”、“玩家 2 获胜！”或“平局！”（如果两名玩家得分相等，则为 2 名玩家。）、

## 读题
- 每个字母存在得分.
- 结合数组和字符串，我们可以每个字母的得分放到一个数组储存，把字符串（单词）挨个匹对，求出总分.
- 恭喜你，如果你也是这么想的，那么这就是一种遍历的思想.
- 计算机如何知道你是什么字母呢，通过前文，我们知道ASCII码表，在 C 语言中，字符其实是数字（ASCII 码）。例如 'A' 是 65，'C' 是 67。当我们计算 `'C' - 'A'` 时，实际上是 `67 - 65 = 2`。这正好对应数组 `POINTS` 中 C 的索引（第 3 个元素）。
- 因为没说大小写，我们可以使用<ctype.h>中的topper函数升为大写，strlen函数遍历单词.


## 伪代码
```
常量 POINTS[] = {1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10}

主程序 Main:
    // 1. 获取输入
    打印 "Player 1: "
    读取字符串 -> 存入 word1
    
    打印 "Player 2: "
    读取字符串 -> 存入 word2

    // 2. 计算得分 (调用计算函数)
    整数 score1 = 调用 ComputeScore(word1)
    整数 score2 = 调用 ComputeScore(word2)

    // 3. 比较并输出结果
    如果 (score1 > score2):
        打印 "玩家 1 获胜！"
    否则 如果 (score2 > score1):
        打印 "玩家 2 获胜！"
    否则:
        打印 "平局！"

// ---------------------------------------------------------

函数 ComputeScore(输入字符串 word):
    初始化 total_score = 0

    // 遍历单词中的每一个字符
    对于 word 中的每一个字符 char:
        
        // 过滤：只处理字母，忽略标点和数字
        如果 (char 是字母):
            
            // 统一转换逻辑：无论原先是大小写，都转为大写
            字符 upper_char = 转大写(char)
            
            // 核心映射逻辑：计算在数组中的下标
            // 在 ASCII 中，'A' - 'A' = 0, 'B' - 'A' = 1...
            整数 index = upper_char - 'A'
            
            // 累加分数
            total_score = total_score + POINTS[index]
            
    返回 total_score
```

- oka,现在已经有了伪代码了，只需要翻译过来就好了



```c
#include <ctype.h>
#include <stdio.h>
#include <string.h>

// 对应 A 到 Z 的分值
int POINTS[] = {1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10};

int compute_score(char *word);

int main(void)
{
    char word1[100];
    char word2[100];

    printf("Player 1: ");
    scanf("%s", word1);

    printf("Player 2: ");
    scanf("%s", word2);

    int score1 = compute_score(word1);
    int score2 = compute_score(word2);

    if (score1 > score2)
    {
        printf("player1 wins！\n");
    }
    else if (score2 > score1)
    {
        printf("palyer2 wins！\n");
    }
    else
    {
        printf("Tie！\n");
    }

    return 0;
}

// 计算函数：统一转为大写处理
int compute_score(char *word)
{
    int score = 0;
    
    for (int i = 0, n = strlen(word); i < n; i++)
    {
        //  检查是否为字母（如果不检查，标点符号可能会导致负数索引或越界）
        if (isalpha(word[i]))
        {
            // toupper(word[i]) 会把小写转大写，如果是大写则不变
            // 然后统一减去 'A' 得到数组下标
            score += POINTS[toupper(word[i]) - 'A'];
        }
    }
    
    return score;
}
```

**总结：字符串->ASCII->数字


# 凯撒密码
我去了兄弟，这翻译真不说人话，看了半天才看懂
想了半天才把题目浓缩出来


## 题目要求
编写一个 C 语言程序 `caesar.c`，实现凯撒密码加密。

**核心要求**：

1. **启动方式**：必须在命令行提供密钥 $k$（非负整数），例如 `./caesar 13`。
    
2. **参数校验**：
    
    - 如果未提供密钥、提供了多个参数、或密钥包含非数字字符，打印错误用法提示并退出（返回 1）。
        
3. **输入输出**：
    
    - 提示用户输入**明文**。
        
    - 输出加密后的**密文**。
        
4. **加密规则**：
    
    - **位移**：将每个字母在字母表中向后移动 $k$ 位。
        
    - **循环**：如果移出 'Z'，则回到 'A' 继续（使用 `% 26`）。
        
    - **格式**：保持大小写不变，非字母字符（如标点、空格）原样保留。
        

数学公式：

$$c_i = (p_i + k) \% 26$$
## 最想说人话的一集
结合题意，是在bash中输入密钥，密钥是每个字母向后移动的位数
密钥可以通过取余的手段（模运算）
**1 和 27 在凯撒密码中是完全等价的
- 既然题目中说了要交互，那我们的命令行参数是必须要有的
-  然后我们要用这个公式 (c - 'A' + k) % 26 + 'A'
- 好麻烦的题
 - 特别是搭配翻译也好难看

## 依旧伪代码

```
主程序 (输入: 命令行参数 args):

    // 1. 验证钥匙 (Validation)
    如果 (参数数量 不等于 2):
        打印 "用法错误: ./caesar key"
        退出程序 (返回 1)

    获取 密钥字符串 = args[1]

    对于 密钥字符串 中的每一个字符 char:
        如果 (char 不是数字):
            打印 "用法错误: ./caesar key"
            退出程序 (返回 1)

    // 2. 准备钥匙 (Preparation)
    将 密钥字符串 转换为 整数 k

    // 3. 获取输入 (Input)
    打印 "plaintext: "
    获取用户输入的字符串 plaintext

    // 4. 加密逻辑 (Encryption)
    打印 "ciphertext: "

    对于 plaintext 中的每一个字符 c:
        
        如果 (c 是 大写字母):
            // 公式: (当前字符 - 'A' + 密钥) % 26 + 'A'
            计算 p = c - 'A'
            计算 result = (p + k) % 26
            打印字符 (result + 'A')
            
        否则 如果 (c 是 小写字母):
            // 公式: (当前字符 - 'a' + 密钥) % 26 + 'a'
            计算 p = c - 'a'
            计算 result = (p + k) % 26
            打印字符 (result + 'a')
            
        否则 (即标点符号、空格、数字等):
            // 不加密，直接原样输出
            直接打印 c

    // 5. 收尾 (Finish)
    打印 换行符
    退出程序 (返回 0)
```


## 看看我的
```c
#include <stdio.h>

#include <stdlib.h>

#include <string.h>

#include <ctype.h>

  

int main(int argc, char *argv[])

{

    // 1. 验证参数数量

    if (argc != 2)

    {

        printf("Usage: ./caesar key\n");

        return 1;

    }

  

    // 2. 验证是否为纯数字

    for (int i = 0, n = strlen(argv[1]); i < n; i++)

    {

        if (!isdigit(argv[1][i]))

        {

            printf("Usage: ./caesar key\n");

            return 1;

        }

    }

  

    // 转换密钥

    int k = atoi(argv[1]);

  

    // 3. 获取输入 (标准 C 方式)

    char plaintext[1000]; // 定义一个足够大的缓冲区

    printf("plaintext:  ");

    // fgets 会读取整行输入，包括空格

    if (fgets(plaintext, sizeof(plaintext), stdin) == NULL)

    {

        return 1;

    }

  

    // 4. 加密逻辑

    printf("ciphertext: ");

    for (int i = 0, n = strlen(plaintext); i < n; i++)

    {

        char c = plaintext[i];

  

        if (isupper(c))

        {

            printf("%c", (c - 'A' + k) % 26 + 'A');

        }

        else if (islower(c))

        {

            printf("%c", (c - 'a' + k) % 26 + 'a');

        }

        else

        {

            // 注意：fgets 会把换行符 '\n' 也读进来，这里直接原样输出即可

            printf("%c", c);

        }

    }

    // 如果 fgets 读取的字符串最后不是换行符，我们需要手动补一个

    // 但通常不需要，为了保险起见，这里不再额外添加 '\n'，除非你需要完美的格式控制

    if (plaintext[strlen(plaintext)-1] != '\n') {

        printf("\n");

    }

  

    return 0;

}
```


- 差不多是这样的代码
- 记得在bash里面输入参数
- 可以不使用命令行参数，使用scanf问用户
- 但是如果你只是**自己写着玩**，或者想测试加密逻辑对不对，可以用上面这个“最简单方法”。
- 如果你是**为了交作业**，**必须**硬着头皮使用 `argc` 和 `argv` 的方法，即使它一开始看起来很麻烦。
- 这道题的核心目的**不仅仅是**让你写加密算法，更重要的是教会你**“如何处理命令行参数”**。这是通过 C 语言编写系统级工具（如 Linux 命令）的基础技能。


# 代餐说是
例如，一个密钥可能是字符串 `NQXPOMAFTRHLZGECYJIUWSKDVB`。这个 26 个字符的密钥意味着 `A`（字母表的第一个字母）应转换为 `N`（键的第一个字符），`B`（字母表的第二个字母）应转换为 `Q`（键的第二个字符），依此类推。
一个名为 `substitution` 的文件夹里，创建一个程序，允许你用替换密码加密消息。用户执行程序时，应通过命令行参数决定运行时密钥应包含的秘密消息。


## 其实这是第一个题和第二题的结合版，考了遍历字符和命令行参数说是
### 思路解析

1. **验证密钥 ：这是最繁琐的部分。
    
    - **数量**：必须只有 1 个参数。
        
    - **长度**：必须正好 26 个字符。
        
    - **内容**：必须全是字母。
        
    - **唯一性**：字母不能重复（例如不能有两个 'A'）。我们需要一个数组来记录哪个字母已经出现过。
        
2. **建立映射：
    
    - 我们不需要真的创建一个“字典”结构。
        
    - 利用数组下标：字母表第 0 个字母 ('A') 对应密钥的第 0 个字符 `key[0]`。
        
    - 字母表第 1 个字母 ('B') 对应 `key[1]`，以此类推。
        
3. **保持大小写 (Case Preservation)**：
    
    - 无论密钥本身是大写还是小写（比如 `N` 或 `n`），如果明文是 **大写**，密文就必须输出 **大写**。
        
    - 如果明文是 **小写**，密文就必须输出 **小写**。



## 还是伪代码
```
1. 检查命令行参数数量是否为 2 (程序名 + 密钥)。若不是，打印错误，返回 1。
2. 获取密钥字符串。
3. 验证密钥长度是否为 26。若不是，打印错误，返回 1。
4. 遍历密钥中的每个字符：
    a. 检查是否为字母。若不是，返回 1。
    b. 检查是否有重复字符 (利用一个 seen[26] 数组记录)。若重复，返回 1。
5. 获取用户输入的明文 (plaintext)。
6. 打印 "ciphertext: "。
7. 遍历明文中的每个字符：
    a. 如果是大写字母:
       计算索引 index = char - 'A'
       打印 toupper(key[index])
    b. 如果是小写字母:
       计算索引 index = char - 'a'
       打印 tolower(key[index])
    c. 其他字符:
       原样打印
8. 打印换行符，返回 0。
```

## 看看我的
```c
#include <stdio.h>  // 包含标准输入输出库，用于 printf, fgets 等函数

#include <string.h> // 包含字符串处理库，用于 strlen, strcspn 等函数

#include <ctype.h>  // 包含字符类型库，用于 isupper, islower, isalpha, toupper, tolower

#include <stdlib.h> // 包含标准库，虽然本例主要逻辑不需要，但习惯上作为标准C程序包含

  

// 主函数，接收命令行参数 count (argc) 和 vector (argv)

int main(int argc, char *argv[])

{

    // 检查命令行参数的数量是否不等于 2（程序名 + 密钥）

    if (argc != 2)

    {

        // 如果不是 2 个参数，打印正确的使用说明

        printf("Usage: ./substitution key\n");

        // 返回 1 表示程序出错退出

        return 1;

    }

  

    // 获取密钥字符串，将其指针保存到 key 变量中

    char *key = argv[1];

    // 计算密钥的长度

    int key_len = strlen(key);

  

    // 检查密钥长度是否不等于 26 个字符

    if (key_len != 26)

    {

        // 如果长度不对，打印错误信息

        printf("Key must contain 26 characters.\n");

        // 返回 1 表示出错

        return 1;

    }

  

    // 定义一个整数数组用于记录字母是否出现过，初始化全为 0

    int seen[26] = {0};

  

    // 遍历密钥中的每一个字符，进行有效性检查

    for (int i = 0; i < key_len; i++)

    {

        // 获取当前字符

        char c = key[i];

  

        // 检查当前字符是否不是字母

        if (!isalpha(c))

        {

            // 如果包含非字母，打印错误信息

            printf("Key must only contain alphabetic characters.\n");

            // 返回 1 表示出错

            return 1;

        }

  

        // 计算当前字母在字母表中的索引（统一转为大写计算，'A' 对应 0）

        int index = toupper(c) - 'A';

  

        // 检查该索引位置是否已经被标记为 1（即之前出现过）

        if (seen[index] == 1)

        {

            // 如果重复，打印错误信息

            printf("Key must not contain repeated characters.\n");

            // 返回 1 表示出错

            return 1;

        }

  

        // 将该字母对应的索引位置标记为 1，表示已出现

        seen[index] = 1;

    }

  

    // 定义一个字符数组（缓冲区）来存储用户输入的明文，大小设为 1024

    char plaintext[1024];

    // 打印提示信息，让用户输入明文

    printf("plaintext:  ");

    // 使用标准库函数 fgets 从标准输入 (stdin) 读取一行文本

    // fgets(buffer, size, stdin) 会读取最多 size-1 个字符

    if (fgets(plaintext, sizeof(plaintext), stdin) == NULL)

    {

        // 如果读取失败，返回 1

        return 1;

    }

  

    // fgets 会把换行符 '\n' 也读进去，通常我们需要去掉它

    // strcspn 计算从开头到第一个 '\n' 的长度，将该位置设为 '\0' (结束符)

    plaintext[strcspn(plaintext, "\n")] = '\0';

  

    // 打印密文的前缀标签，不换行

    printf("ciphertext: ");

  

    // 遍历明文中的每一个字符，直到遇到字符串结束符 '\0'

    for (int i = 0;plaintext[i] != '\0'; i++)

    {

        // 获取当前明文字符

        char c = plaintext[i];

  

        // 检查当前字符是否为大写字母

        if (isupper(c))

        {

            // 计算字母表索引（例如 'A' -> 0）

            int idx = c - 'A';

            // 根据索引从密钥中找到对应的替换字符，并强制转为大写

            char new_char = toupper(key[idx]);

            // 打印替换后的大写字符

            printf("%c", new_char);

        }

        // 检查当前字符是否为小写字母

        else if (islower(c))

        {

            // 计算字母表索引（例如 'a' -> 0）

            int idx = c - 'a';

            // 根据索引从密钥中找到对应的替换字符，并强制转为小写

            char new_char = tolower(key[idx]);

            // 打印替换后的小写字符

            printf("%c", new_char);

        }

        // 如果既不是大写也不是小写（如标点、空格、数字）

        else

        {

            // 直接原样打印该字符

            printf("%c", c);

        }

    }

  

    // 打印一个换行符，作为输出的结束

    printf("\n");

  

    // 程序执行成功，返回 0

    return 0;

}
```

### 关键点说明（关于标准 C 写法）

1. **`char *argv[]` 代替 `string argv[]`**：
    
    - 在 C 语言底层，字符串其实就是字符指针（或者字符数组）。`string` 只是 CS50 库定义的一个别名。
        
2. **`fgets` 代替 `get_string`**：
    
    - 标准 C 没有 `get_string`。最常用的替代品是 `fgets`。
        
    - `fgets(buffer, size, stdin)`：它会从键盘读取输入存入 `buffer`。
        
    - **注意**：`fgets` 会把你的回车键（换行符 `\n`）也读进去。
        
3. **去掉换行符**：
    
    - 代码行 `plaintext[strcspn(plaintext, "\n")] = '\0';` 是一个非常经典的标准 C 写法。它的作用是找到字符串里第一个换行符的位置，并把它改成“字符串结束符”，相当于切掉了多余的换行。


-----
**总结：终于写了一晚上写完了QAQ，好累喔，睡觉了，明天会更好desuwa