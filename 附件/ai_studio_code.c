long number = get_long("Number: ");
// 你需要保留原始 number 用于判断开头，建议复制一份变量用来做计算
long temp = number; 

int sum = 0;
int count = 0; // 记录位数

while (temp > 0)
{
    // 取出最后一位
    int last_digit = temp % 10;
    
    // 这里的逻辑：
    // 如果是倒数第1, 3, 5...位 (奇数位)，直接加
    // 如果是倒数第2, 4, 6...位 (偶数位)，乘以2后处理再加
    // 提示：可以用 count % 2 来判断当前是奇数位还是偶数位
    
    // ...处理加法逻辑...

    // 去掉最后一位，继续循环
    temp = temp / 10;
    count++;
}

// 校验是否合法
if (sum % 10 != 0)
{
    printf("INVALID\n");
    return 0;
}

// 如果合法，根据 number 的前两位和 count (长度) 判断银行
// 提示：怎么取前两位？可以用循环或者除法把 number 缩小到只剩2位