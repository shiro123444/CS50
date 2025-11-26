#include <cs50.h>
#include <stdio.h>

int main(void)
{
    // 1. 获取用户输入 (使用 CS50 库的 get_string)
    string name = get_string("What's your name? ");

    // 2. 打印输出
    // %s 是字符串的占位符
    printf("hello, %s\n", name);
}