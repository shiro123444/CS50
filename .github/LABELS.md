# GitHub Labels 配置指南

本文档说明如何为仓库配置 Issue 标签，以便更好地分类和管理问题。

## 推荐的标签配置

以下是推荐的标签列表及其用途：

### 核心标签

| 标签名称 | 颜色代码 | 描述 | 用途 |
|---------|---------|------|------|
| `question` | `#0075ca` | 学习问题和疑问 | 用于标记学习者提出的问题 |
| `bug` | `#d73a4a` | 内容或平台错误 | 用于报告错误、错别字、失效链接等 |
| `enhancement` | `#a2eeef` | 功能建议和改进 | 用于新功能建议或内容改进建议 |
| `documentation` | `#0075ca` | 文档相关 | 用于文档更新或文档问题 |

### 辅助标签

| 标签名称 | 颜色代码 | 描述 | 用途 |
|---------|---------|------|------|
| `good first issue` | `#7057ff` | 适合新手的问题 | 标记简单的问题，适合新贡献者 |
| `help wanted` | `#008672` | 需要帮助 | 标记需要社区帮助的问题 |
| `duplicate` | `#cfd3d7` | 重复的问题 | 标记重复提交的问题 |
| `invalid` | `#e4e669` | 无效的问题 | 标记不符合要求的问题 |
| `wontfix` | `#ffffff` | 不会修复 | 标记不打算处理的问题 |

### 课程相关标签

| 标签名称 | 颜色代码 | 描述 | 用途 |
|---------|---------|------|------|
| `week-0` | `#fbca04` | Week 0 相关 | Scratch 相关问题 |
| `week-1` | `#fbca04` | Week 1 相关 | C 语言基础相关问题 |
| `week-2` | `#fbca04` | Week 2 相关 | 数组相关问题 |
| `content` | `#d4c5f9` | 内容相关 | 课程内容相关的问题 |
| `platform` | `#c5def5` | 平台相关 | GitBook 平台相关的问题 |

## 如何配置标签

### 方法 1: 通过 GitHub 网页界面

1. 访问你的仓库
2. 点击 "Issues" 标签页
3. 点击 "Labels" 按钮
4. 点击 "New label" 创建新标签
5. 输入标签名称、描述和颜色
6. 点击 "Create label"

### 方法 2: 使用 GitHub CLI

如果你安装了 GitHub CLI，可以使用命令行创建标签：

```bash
# 创建 question 标签
gh label create question --description "学习问题和疑问" --color "0075ca"

# 创建 bug 标签
gh label create bug --description "内容或平台错误" --color "d73a4a"

# 创建 enhancement 标签
gh label create enhancement --description "功能建议和改进" --color "a2eeef"

# 创建 documentation 标签
gh label create documentation --description "文档相关" --color "0075ca"

# 创建 good first issue 标签
gh label create "good first issue" --description "适合新手的问题" --color "7057ff"

# 创建 help wanted 标签
gh label create "help wanted" --description "需要帮助" --color "008672"

# 创建 duplicate 标签
gh label create duplicate --description "重复的问题" --color "cfd3d7"

# 创建 invalid 标签
gh label create invalid --description "无效的问题" --color "e4e669"

# 创建 wontfix 标签
gh label create wontfix --description "不会修复" --color "ffffff"
```

### 方法 3: 批量导入标签

创建一个 `labels.json` 文件：

```json
[
  {
    "name": "question",
    "description": "学习问题和疑问",
    "color": "0075ca"
  },
  {
    "name": "bug",
    "description": "内容或平台错误",
    "color": "d73a4a"
  },
  {
    "name": "enhancement",
    "description": "功能建议和改进",
    "color": "a2eeef"
  },
  {
    "name": "documentation",
    "description": "文档相关",
    "color": "0075ca"
  },
  {
    "name": "good first issue",
    "description": "适合新手的问题",
    "color": "7057ff"
  },
  {
    "name": "help wanted",
    "description": "需要帮助",
    "color": "008672"
  },
  {
    "name": "duplicate",
    "description": "重复的问题",
    "color": "cfd3d7"
  },
  {
    "name": "invalid",
    "description": "无效的问题",
    "color": "e4e669"
  },
  {
    "name": "wontfix",
    "description": "不会修复",
    "color": "ffffff"
  }
]
```

然后使用工具如 [github-label-sync](https://github.com/Financial-Times/github-label-sync) 批量导入。

## 标签使用指南

### 为 Issue 添加标签

1. **自动添加**：Issue 模板会自动添加相应的标签
2. **手动添加**：在 Issue 页面右侧的 "Labels" 区域选择标签
3. **批量添加**：在 Issues 列表页面选择多个 Issue，然后批量添加标签

### 标签使用建议

- **单个 Issue 可以有多个标签**：例如一个问题可以同时是 `question` 和 `week-1`
- **使用优先级标签**：对于重要的问题，可以添加 `help wanted` 标签
- **及时更新标签**：当问题状态改变时，更新相应的标签
- **保持标签一致性**：团队成员应该对标签的使用达成共识

### 标签筛选

使用标签筛选 Issues：

```
# 查看所有学习问题
label:question

# 查看 Week 1 的 bug
label:bug label:week-1

# 查看需要帮助的问题
label:"help wanted"

# 组合筛选
is:open label:question label:week-0
```

## 维护标签

### 定期审查

- 每月审查标签使用情况
- 删除不再使用的标签
- 合并相似的标签
- 更新标签描述

### 标签命名规范

- 使用小写字母
- 使用连字符分隔单词（kebab-case）
- 保持简洁明了
- 使用一致的命名模式

## 默认标签处理

GitHub 会为新仓库创建一些默认标签，你可以：

1. **保留有用的标签**：如 `bug`、`enhancement`、`documentation`
2. **删除不需要的标签**：如 `good first issue`（如果不需要）
3. **修改标签**：调整颜色和描述以符合你的需求

## 参考资源

- [GitHub Labels 官方文档](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels)
- [GitHub CLI 标签命令](https://cli.github.com/manual/gh_label)
- [标签颜色选择器](https://www.color-hex.com/)

---

**相关文档：**
- [Issue 提交指南](ISSUE_GUIDE.md)
- [Issue 模板](ISSUE_TEMPLATE/)
