## 第七题 mario
![pyramid](/images/pyramid.png)
### 不太自在的版本
```c
//题目集1，marioless金字塔解

#include<stdio.h>

int main(){

    int height=0;//金字塔高度

    int input_brick=0;//输入的砖块数

    do{

        printf("Enter pyramid height:");

        input_brick=scanf("%d",&height);//输入高度

        while(getchar()!='\n');//处理输入缓冲区的换行符

    }while (input_brick!=1 || height<=0);//循环直到输入合法

    for (int i = 0;i<height;i++){//外层循环控制行数

        for(int j =0 ;j<height-i-1;j++){//内层循环控制空格数

            printf(" ");

        }

        for(int k=0;k<=i;k++){//内层循环控制#号数

            printf("#");

        }

        printf("\n");

    }

//下文原理同上，控制第二金字塔的高度

    int secondHeight=0;

    int inputStatus=0;

    do {

        printf("enter second height:");

            inputStatus= scanf("%d", &secondHeight);

        while(getchar() != '\n');

    } while (inputStatus!= 1 || secondHeight <= 0);

  
  
  

        for (int i = 0;i<secondHeight;i++){

            for(int j =0 ;j<secondHeight-i-1;j++){

            printf(" ");

        }

                for(int k=0;k<=i;k++){

                    printf("#");

        }

        printf("\n");

    }

    return 0;

}
```

### 更自在的版本
![pyramids](/images/pyramids.png)
```c
//题目集1，marioless对称金字塔一解

#include<stdio.h>

int main(){

    int height=0;//金字塔高度

    int input_brick=0;//输入的返回值

  

    // 只读取一个高度并校验

    do{

        printf("Enter pyramid height: ");

        input_brick = scanf("%d", &height);

        while (getchar() != '\n'); // 清除缓冲区换行

    } while (input_brick != 1 || height <= 0);

  

    // 打印两侧金字塔，中间两个空格

    for (int i = 0; i < height; i++) {

        // 左侧空格

        for (int j = 0; j < height - i - 1; j++) {

            printf(" ");

        }

        // 左侧#

        for (int k = 0; k <= i; k++) {

            printf("#");

        }

        // 中间两个空格

        printf("  ");

        // 右侧#

        for (int k = 0; k <= i; k++) {

            printf("#");

        }

        printf("\n");

    }

  

    return 0;

}
```

## 第八题
### coin
	假设你在商店工作，一位顾客给你$1.00（100 美分）买了价值 0.50 美元（50 美分）的糖果。你需要支付他们的“找零”，即支付糖果费用后剩余的金额。找零时，你很可能想尽量减少每位顾客发放的硬币数量，以免用完（或者惹恼顾客！）。在一个名为 `cash.c` 的文件中，文件夹名为 `cash`，用 C 语言实现一个程序，打印出兑换给定金额所需的最低硬币（以美分计）：


```c
//题目集一，现金的找零解

#include <stdio.h>

int main()

{

    int amount=0;

    int coin1=0,coin2=0,coin3=0,coin4=0;

    int coins=0;

    int result;

    do {

        printf("Change owed: ");

        result = scanf("%d", &amount);

        while (getchar() != '\n');

    } while (result != 1 || amount <= 0);

    //贪心算法的基础思想--每次选择的最优，实现局部最优解，从而达到全局最优解

    //每次都优先使用面值最大的硬币

    coin1=amount/25;

    coin2=(amount)%25/10;

    coin3=(amount)%25%10/5;

    coin4=(amount)%25%10%5/1;

    coins=coin1+coin2+coin3+coin4;

    printf("%d\n",coins);

    return 0;

}
```


### credit
前面背景讲解了卢恩算法，也叫**模10算法**，这里就略过了，直接看题
在`信用`目录中名为 `credit.c` 的文件中，编写一个程序，提示用户输入信用卡号，并通过 `printf` 报告该卡号是否有效，符合本文件格式的定义。
这里我们调用了几个内置函数来，简化操作desuwa.
```c
// 信用卡号验证程序
// 使用Luhn算法（模10算法）验证信用卡号的有效性

#include <stdio.h>  // 标准输入输出库，用于printf和scanf函数
#include <string.h> // 字符串处理库，用于strlen函数
#include <ctype.h>  // 字符类型处理库，用于isdigit函数

int main() {
    char cardNumber[20]; // 存储用户输入的信用卡号，最多19个字符+1个结束符
    int len, sum = 0, digit, isSecondDigit = 0; // len:号码长度, sum:校验和, digit:当前处理的数字, isSecondDigit:标记是否是第二位数字
    
    printf("card number: "); // 提示用户输入信用卡号
    scanf("%19s", cardNumber); // 读取用户输入，最多读取19个字符防止缓冲区溢出
    
    // 清除输入缓冲区中的剩余字符，防止后续输入受影响
    while (getchar() != '\n');
    
    len = strlen(cardNumber); // 获取信用卡号的长度
    
    // 从右到左处理每一位数字，这是Luhn算法的要求
    for (int i = len - 1; i >= 0; i--) {
        // 检查当前字符是否为数字
        if (!isdigit(cardNumber[i])) {
            printf("card:%s  is not a number\n", cardNumber); // 如果包含非数字字符，提示错误
            return 0; // 提前结束程序
        }
        
        digit = cardNumber[i] - '0'; // 将字符转换为对应的数字值
        
        // 每隔一位的数字乘以2（从右边数第二位开始）
        if (isSecondDigit) {
            digit *= 2; // 将当前数字乘以2
            
            // 如果乘以2后大于9，则将各位数字相加（例如：14变为1+4=5）
            if (digit > 9) {
                digit = (digit / 10) + (digit % 10); // 分离十位和个位数字并相加
            }
        }
        
        sum += digit; // 将处理后的数字累加到总和中
        isSecondDigit = !isSecondDigit; // 切换标记，为下一次循环做准备
    }
    
    // 如果总和能被10整除，则信用卡号有效（Luhn算法的核心判断条件）
    if ((sum % 10) == 0) {
        printf("card %s is valid\n", cardNumber); // 输出信用卡号有效的信息
    } else {
        printf("card %s is not valid\n", cardNumber); // 输出信用卡号无效的信息
    }
    
    return 0; // 程序正常结束
}
```