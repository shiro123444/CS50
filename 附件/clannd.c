#include <cs50.h>
#include <stdio.h>

int main(void)
{
    int height;
    do
    {
        height = get_int("Height: ");
    }
    while (height < 1 || height > 8);

    for (int i = 0; i < height; i++)
    {
        // 打印空格
        for (int j = 0; j < height - i - 1; j++)
        {
            printf(" ");
        }

        // 打印井号
        for (int k = 0; k <= i; k++)
        {
            printf("#");
        }

        printf("\n");
    }
}