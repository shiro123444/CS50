# Week 5 - 数据结构

## 本周主题

学习常用的数据结构及其应用。

## 主要内容

### 链表（Linked List）

节点包含数据和指向下一个节点的指针：

```c
typedef struct node
{
    int data;
    struct node *next;
}
node;
```

优点：
- 动态大小
- 容易插入和删除

缺点：
- 不支持随机访问
- 需要额外的指针空间

### 栈（Stack）

LIFO（后进先出）：
- push - 入栈
- pop - 出栈

### 队列（Queue）

FIFO（先进先出）：
- enqueue - 入队
- dequeue - 出队

### 树（Tree）

#### 二叉搜索树（BST）
每个节点最多两个子节点：
- 左子树 < 节点
- 右子树 > 节点

```c
typedef struct node
{
    int data;
    struct node *left;
    struct node *right;
}
node;
```

操作时间复杂度：
- 搜索：O(log n) 到 O(n)
- 插入：O(log n) 到 O(n)

### 哈希表（Hash Table）

使用哈希函数将键映射到数组索引：

```c
// 简单的哈希函数
int hash(char *word)
{
    return toupper(word[0]) - 'A';
}
```

处理冲突：
- 链表法（Chaining）
- 开放寻址法

时间复杂度：
- 平均：O(1)
- 最坏：O(n)

### 字典树（Trie）

专门用于存储字符串的树结构，每个节点代表一个字符。

优点：
- 快速查找
- 支持前缀匹配

缺点：
- 占用较多内存

## 抽象数据类型

- 队列（Queue）
- 栈（Stack）
- 字典（Dictionary）

## Problem Sets

- Inheritance
- Speller

## 性能对比

| 数据结构 | 搜索 | 插入 | 删除 |
|---------|-----|------|------|
| 数组    | O(n)| O(n) | O(n) |
| 链表    | O(n)| O(1) | O(1) |
| 二叉搜索树| O(log n)| O(log n)| O(log n)|
| 哈希表  | O(1)| O(1) | O(1) |

## 学习要点

- 理解不同数据结构的特点
- 根据场景选择合适的数据结构
- 掌握指针操作
- 注意内存管理
