# 第一题
```
#include <stdio.h>

#include <stdlib.h>

  

// 函数声明

void bubbleSort(int arr[], int n);

void selectionSort(int arr[], int n);

void mergeSort(int arr[], int l, int r);

void merge(int arr[], int l, int m, int r);

void printArray(int arr[], int size);

void copyArray(int src[], int dest[], int n);

  

int main() {

    int data[] = {64, 34, 25, 12, 22, 11, 90};

    int n = sizeof(data) / sizeof(data[0]);

    int *arr = (int *)malloc(n * sizeof(int));

  

    // 冒泡排序测试

    copyArray(data, arr, n);

    printf("原始数组: \n");

    printArray(arr, n);

    bubbleSort(arr, n);

    printf("冒泡排序后: \n");

    printArray(arr, n);

    printf("\n");

  

    // 选择排序测试

    copyArray(data, arr, n);

    printf("原始数组: \n");

    printArray(arr, n);

    selectionSort(arr, n);

    printf("选择排序后: \n");

    printArray(arr, n);

    printf("\n");

  

    // 合并排序测试

    copyArray(data, arr, n);

    printf("原始数组: \n");

    printArray(arr, n);

    mergeSort(arr, 0, n - 1);

    printf("合并排序后: \n");

    printArray(arr, n);

    printf("\n");

  

    free(arr);

    return 0;

}

  

// 冒泡排序

void bubbleSort(int arr[], int n) {

    int i, j;

    for (i = 0; i < n - 1; i++) {

        // 最后 i 个元素已经到位

        for (j = 0; j < n - i - 1; j++) {

            if (arr[j] > arr[j + 1]) {

                // 交换

                int temp = arr[j];

                arr[j] = arr[j + 1];

                arr[j + 1] = temp;

            }

        }

    }

}

  

// 选择排序

void selectionSort(int arr[], int n) {

    int i, j, min_idx;

    for (i = 0; i < n - 1; i++) {

        // 找到未排序部分的最小元素

        min_idx = i;

        for (j = i + 1; j < n; j++) {

            if (arr[j] < arr[min_idx])

                min_idx = j;

        }

        // 将找到的最小元素与第一个元素交换

        int temp = arr[min_idx];

        arr[min_idx] = arr[i];

        arr[i] = temp;

    }

}

  

// 合并两个子数组

void merge(int arr[], int l, int m, int r) {

    int i, j, k;

    int n1 = m - l + 1;

    int n2 = r - m;

  

    // 创建临时数组

    int *L = (int *)malloc(n1 * sizeof(int));

    int *R = (int *)malloc(n2 * sizeof(int));

  

    // 拷贝数据到临时数组 L[] 和 R[]

    for (i = 0; i < n1; i++)

        L[i] = arr[l + i];

    for (j = 0; j < n2; j++)

        R[j] = arr[m + 1 + j];

  

    // 合并临时数组回 arr[l..r]

    i = 0;

    j = 0;

    k = l;

    while (i < n1 && j < n2) {

        if (L[i] <= R[j]) {

            arr[k] = L[i];

            i++;

        } else {

            arr[k] = R[j];

            j++;

        }

        k++;

    }

  

    // 拷贝 L[] 的剩余元素

    while (i < n1) {

        arr[k] = L[i];

        i++;

        k++;

    }

  

    // 拷贝 R[] 的剩余元素

    while (j < n2) {

        arr[k] = R[j];

        j++;

        k++;

    }

  

    free(L);

    free(R);

}

  

// 合并排序

void mergeSort(int arr[], int l, int r) {

    if (l < r) {

        int m = l + (r - l) / 2;

  

        // 排序第一半和第二半

        mergeSort(arr, l, m);

        mergeSort(arr, m + 1, r);

  

        merge(arr, l, m, r);

    }

}

  

// 打印数组

void printArray(int arr[], int size) {

    int i;

    for (i = 0; i < size; i++)

        printf("%d ", arr[i]);

    printf("\n");

}

  

// 辅助函数：复制数组

void copyArray(int src[], int dest[], int n) {

    for (int i = 0; i < n; i++) {

        dest[i] = src[i];

    }

}
```



# 第二题
```
#include<stdio.h>

#include<string.h>

#include<cs50.h>

  

bool vote(string name);

void print_winner(void);

  

typedef struct

{

    string name;

    int votes;

} candidate;

  

#define MAX 9

candidate candidates[MAX];

int candidate_count;

  

int main(int argc, string argv[])

{

    if (argc < 2)

    {

        printf("Usage: plurality [candidate ...]\n");

        return 1;

    }

    candidate_count = argc - 1;

    if (candidate_count > MAX)

    {

        printf("Maximum number of candidates is %i\n", MAX);

        return 2;

    }

    for (int i = 0; i < candidate_count; i++)

    {

        candidates[i].name = argv[i + 1];

        candidates[i].votes = 0;

    }

    int voter_count = get_int("Number of voters: ");

    for (int i = 0; i < voter_count; i++)

    {

        string name = get_string("Vote:");

        if (!vote(name))

        {

            printf("Invalid vote.\n");

        }

    }

    print_winner();

    return 0;

}

  

bool vote(string name)

{

    for (int i = 0; i < candidate_count; i++)

    {

        if (strcmp(candidates[i].name, name) == 0)

        {

            candidates[i].votes++;

            return true;

        }

    }

    return false;

}

  

void print_winner(void)

{

    int max_votes = 0;

    for (int i = 0; i < candidate_count; i++)

    {

        if (candidates[i].votes > max_votes)

        {

            max_votes = candidates[i].votes;

        }

    }

    for (int i = 0; i < candidate_count; i++)

    {

        if (candidates[i].votes == max_votes)

        {

            printf("%s\n", candidates[i].name);

        }

    }

}
```
