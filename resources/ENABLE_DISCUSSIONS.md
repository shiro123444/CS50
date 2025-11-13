# 启用 GitHub Discussions

## 为什么需要启用 Discussions？

由于 GitBook 不支持嵌入式评论系统（如 Giscus），我们改用 GitHub Discussions 作为课程讨论平台。这需要在你的 GitHub 仓库中启用 Discussions 功能。

## 启用步骤

### 1. 进入仓库设置

1. 访问你的 GitHub 仓库：https://github.com/shiro123444/CS50
2. 点击顶部的 **Settings**（设置）标签

### 2. 启用 Discussions

1. 在左侧菜单中找到 **General**（常规）部分
2. 向下滚动到 **Features**（功能）区域
3. 找到 **Discussions** 选项
4. 勾选 ✅ **Discussions** 复选框
5. 点击页面底部的 **Save changes**（保存更改）

### 3. 配置 Discussions 分类

启用后，GitHub 会自动创建一些默认分类。你可以自定义这些分类：

1. 点击仓库顶部的 **Discussions** 标签
2. 点击右侧的 ⚙️ 图标（设置）
3. 点击 **Categories**（分类）

#### 推荐的分类设置

| 分类名称 | Emoji | 说明 | 格式 |
|---------|-------|------|------|
| 📚 课程讨论 | 📚 | 讨论课程内容、分享学习心得 | Discussion |
| ❓ 问题求助 | ❓ | 提出学习中遇到的问题 | Q&A |
| 💡 学习心得 | 💡 | 分享学习经验和技巧 | Discussion |
| 🎯 作业讨论 | 🎯 | 讨论作业和项目 | Discussion |
| 📢 公告 | 📢 | 课程更新和重要通知 | Announcement |

### 4. 创建欢迎帖

创建第一个讨论帖，欢迎学习者：

1. 点击 **New discussion**（新建讨论）
2. 选择 **📢 公告** 分类
3. 标题：`欢迎来到 CS50 学习社区！`
4. 内容示例：

```markdown
# 欢迎来到 CS50 学习社区！🎉

欢迎各位学习者！这里是我们的课程讨论区，你可以：

## 📚 课程讨论
- 分享学习心得和经验
- 讨论课程内容
- 与其他学习者交流

## ❓ 提问求助
- 遇到问题？在"问题求助"分类中提问
- 看到别人的问题？帮忙解答吧！
- 所有问题都是好问题

## 💡 学习心得
- 完成了一个章节？分享你的收获
- 有学习技巧？告诉大家
- 推荐学习资源

## 🎯 作业讨论
- 讨论作业思路（但不要直接分享答案）
- 分享项目创意
- 互相学习，共同进步

## 📖 使用指南

- 使用 Markdown 格式编写内容
- 可以插入代码块、图片和链接
- 对有帮助的回复点赞 👍
- 保持友善和尊重

让我们一起学习，共同进步！💪
```

5. 点击 **Start discussion**（开始讨论）

### 5. 测试讨论功能

1. 访问 https://github.com/shiro123444/CS50/discussions
2. 确认可以看到讨论列表
3. 尝试创建一个测试讨论
4. 确认可以回复和点赞

## 验证配置

完成后，确认以下内容：

- [ ] Discussions 功能已启用
- [ ] 可以访问 https://github.com/shiro123444/CS50/discussions
- [ ] 已创建并配置讨论分类
- [ ] 已创建欢迎帖
- [ ] 测试创建讨论和回复功能正常

## 更新课程链接

启用 Discussions 后，课程页面中的讨论链接将正常工作：

```markdown
💭 [在 GitHub Discussions 中讨论本课内容](https://github.com/shiro123444/CS50/discussions)
```

## 下一步

1. **邀请学习者** - 分享 GitBook 链接和 Discussions 链接
2. **鼓励参与** - 在课程中提醒学习者使用讨论区
3. **积极回复** - 及时回复学习者的问题和讨论
4. **建立社区** - 培养互帮互助的学习氛围

## 常见问题

### Q: Discussions 和 Issues 有什么区别？

**Discussions（讨论）**：
- 用于开放式讨论和交流
- 适合学习心得、问题求助、经验分享
- 更像论坛或社区

**Issues（问题）**：
- 用于跟踪具体的问题和任务
- 适合报告错误、提出功能建议
- 更像任务管理工具

### Q: 可以关闭 Discussions 吗？

可以，但不建议。Discussions 是免费的，不会影响仓库性能，而且为学习者提供了很好的交流平台。

### Q: 如何管理不当内容？

作为仓库所有者，你可以：
- 编辑或删除不当评论
- 锁定讨论帖
- 标记垃圾内容
- 设置社区准则

### Q: Discussions 支持中文吗？

完全支持！GitHub Discussions 支持所有 Unicode 字符，包括中文。

## 参考资源

- [GitHub Discussions 官方文档](https://docs.github.com/en/discussions)
- [管理 Discussions](https://docs.github.com/en/discussions/managing-discussions-for-your-community)
- [Discussions 最佳实践](https://docs.github.com/en/discussions/guides/best-practices-for-community-conversations-on-github)

---

**准备好了吗？现在就去启用 Discussions 吧！** 🚀
