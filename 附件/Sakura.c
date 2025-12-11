#include <cs50.h>
#include <stdio.h>

int main(void)
{
    long number = get_long("Number: ");
    
    // 计算校验和 (Luhn Algorithm)
    int sum = 0;
    int length = 0;
    long temp = number;
    
    // 遍历每一位
    while (temp > 0)
    {
        int digit = temp % 10;

        // 如果是倒数第偶数位 (从0开始计数，所以是奇数次循环)
        if (length % 2 == 1)
        {
            int product = digit * 2;
            // 如果乘积是两位数，把各位数字相加
            sum += (product > 9) ? (product - 9) : product;
        }
        else
        {
            sum += digit;
        }

        temp /= 10;
        length++;
    }

    // 如果校验和不合法，直接 INVALID
    if (sum % 10 != 0)
    {
        printf("INVALID\n");
        return 0;
    }

    // 获取前两位数字
    long start_digits = number;
    while (start_digits >= 100)
    {
        start_digits /= 10;
    }

    // 根据长度和前缀判断发卡行
    if ((start_digits == 34 || start_digits == 37) && length == 15)
    {
        printf("AMEX\n");
    }
    else if ((start_digits >= 51 && start_digits <= 55) && length == 16)
    {
        printf("MASTERCARD\n");
    }
    else if ((start_digits / 10 == 4) && (length == 13 || length == 16))
    {
        printf("VISA\n");
    }
    else
    {
        printf("INVALID\n");
    }
}