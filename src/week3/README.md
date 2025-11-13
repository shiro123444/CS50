# Week 3 - 算法

## 本周主题

学习算法的设计与分析，理解效率的重要性。

## 主要内容

### 搜索算法

#### 线性搜索（Linear Search）
- 时间复杂度：O(n)
- 从头到尾逐个检查

#### 二分搜索（Binary Search）
- 时间复杂度：O(log n)
- 要求：数组必须有序
- 每次将搜索范围减半

### 排序算法

#### 冒泡排序（Bubble Sort）
- 时间复杂度：O(n²)
- 反复交换相邻的逆序元素

#### 选择排序（Selection Sort）
- 时间复杂度：O(n²)
- 每次选择最小元素放到已排序部分

#### 插入排序（Insertion Sort）
- 时间复杂度：O(n²)
- 将元素插入到已排序部分的正确位置

#### 归并排序（Merge Sort）
- 时间复杂度：O(n log n)
- 分治法：分解、排序、合并

#### 快速排序（Quick Sort）
- 平均时间复杂度：O(n log n)
- 选择基准，分区，递归排序

## 算法复杂度

### 大O表示法

- O(1) - 常数时间
- O(log n) - 对数时间
- O(n) - 线性时间
- O(n log n) - 线性对数时间
- O(n²) - 平方时间
- O(2ⁿ) - 指数时间

### Ω（Omega）表示法

最好情况下的时间复杂度。

### Θ（Theta）表示法

平均情况下的时间复杂度。

## 递归

函数调用自己：

```c
int factorial(int n)
{
    if (n == 1)
        return 1;
    return n * factorial(n - 1);
}
```

## Problem Sets

- Sort
- Plurality
- Runoff/Tideman

## 学习要点

- 理解不同算法的权衡
- 学会分析时间复杂度
- 掌握递归的思想
- 选择合适的算法解决问题
