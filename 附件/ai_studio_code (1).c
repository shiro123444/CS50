// 1. 使用 do-while 循环获取 1 到 8 之间的高度
int height;
do {
    height = get_int("Height: ");
} while (height < 1 || height > 8);

// 2. 外层循环：控制行 (i 从 1 到 height)
for (int i = 1; i <= height; i++)
{
    // 3. 内层循环 1：打印空格 (打印 height - i 个空格)
    for (int j = 0; j < height - i; j++)
    {
        printf(" ");
    }

    // 4. 内层循环 2：打印井号 (打印 i 个井号)
    for (int k = 0; k < i; k++)
    {
        printf("#");
    }

    // 5. 换行
    printf("\n");
}