# Giscus 评论系统配置指南

本指南将帮助你为 GitBook 学习平台配置 Giscus 评论系统。

## 前置要求

- GitHub 仓库必须是**公开的**（public）
- 拥有仓库的管理员权限
- 已安装 [Giscus app](https://github.com/apps/giscus)

## 配置步骤

### 1. 启用 GitHub Discussions

1. 进入你的 GitHub 仓库
2. 点击 **Settings**（设置）
3. 向下滚动找到 **Features**（功能）部分
4. 勾选 **Discussions**（讨论）选项

### 2. 安装 Giscus App

1. 访问 [Giscus GitHub App](https://github.com/apps/giscus)
2. 点击 **Install**（安装）
3. 选择要安装的仓库（选择你的学习平台仓库）
4. 授权访问权限

### 3. 配置 Giscus

1. 访问 [giscus.app](https://giscus.app/zh-CN)
2. 在 **仓库** 部分输入你的仓库地址：`用户名/仓库名`
3. 等待验证通过（会显示绿色的成功提示）

#### 页面 ↔️ discussion 映射关系

选择 **pathname**（路径名）：
- 这样每个课程页面会自动创建对应的讨论主题
- 推荐使用此选项

#### Discussion 分类

选择 **General** 或创建新的分类：
- 建议创建 "课程讨论" 分类
- 或使用默认的 General 分类

#### 特性

建议配置：
- ✅ 启用主评论区的反应（reactions）
- ✅ 将评论框放在评论上方（input position: top）或下方（bottom）
- ✅ 懒加载评论（lazy loading）

#### 主题

选择 **preferred_color_scheme**（首选配色方案）：
- 自动适配用户的系统主题（亮色/暗色）

#### 语言

选择 **zh-CN**（简体中文）

### 4. 获取配置代码

在 giscus.app 页面底部，你会看到生成的配置代码，类似：

```html
<script src="https://giscus.app/client.js"
        data-repo="你的用户名/你的仓库名"
        data-repo-id="R_xxxxx"
        data-category="General"
        data-category-id="DIC_xxxxx"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="preferred_color_scheme"
        data-lang="zh-CN"
        data-loading="lazy"
        crossorigin="anonymous"
        async>
</script>
```

### 5. 更新评论组件

1. 打开 `resources/components/giscus-comments.html`
2. 替换以下配置项：
   - `data-repo`: 改为你的 `用户名/仓库名`
   - `data-repo-id`: 改为你的仓库 ID（从 giscus.app 获取）
   - `data-category`: 改为你选择的分类名称
   - `data-category-id`: 改为你的分类 ID（从 giscus.app 获取）

### 6. 在课程页面中嵌入评论组件

有两种方式嵌入评论组件：

#### 方式 1：直接嵌入 HTML（推荐）

在 Markdown 文件底部添加：

```markdown
---

<div class="giscus-container">
  <h2>💬 讨论区</h2>
  <p>欢迎在下方分享你的学习心得、提出问题或参与讨论！</p>
  
  <script src="https://giscus.app/client.js"
          data-repo="你的用户名/你的仓库名"
          data-repo-id="你的仓库ID"
          data-category="General"
          data-category-id="你的分类ID"
          data-mapping="pathname"
          data-strict="0"
          data-reactions-enabled="1"
          data-emit-metadata="0"
          data-input-position="bottom"
          data-theme="preferred_color_scheme"
          data-lang="zh-CN"
          data-loading="lazy"
          crossorigin="anonymous"
          async>
  </script>
</div>
```

#### 方式 2：使用 GitBook 的自定义 HTML

如果 GitBook 支持自定义 HTML 块，可以直接复制 `giscus-comments.html` 的内容。

## 测试评论功能

1. 将更新推送到 GitHub
2. 等待 GitBook 自动同步
3. 访问课程页面
4. 滚动到页面底部
5. 使用 GitHub 账号登录并发表测试评论

## 常见问题

### Q: 评论组件不显示？

**可能原因**：
- 仓库不是公开的
- 未启用 Discussions 功能
- 未安装 Giscus app
- 配置参数错误（repo-id 或 category-id）

**解决方法**：
1. 检查仓库是否为 public
2. 确认 Discussions 已启用
3. 重新安装 Giscus app
4. 在 giscus.app 重新生成配置代码

### Q: 评论显示但无法登录？

**可能原因**：
- 浏览器阻止了第三方 cookies
- 网络问题

**解决方法**：
- 允许浏览器的第三方 cookies
- 尝试使用其他浏览器
- 检查网络连接

### Q: 如何管理评论？

评论实际上是 GitHub Discussions，你可以：
1. 进入仓库的 Discussions 标签
2. 查看、编辑、删除评论
3. 锁定或关闭讨论主题

### Q: 如何自定义评论样式？

可以在 Markdown 文件中添加自定义 CSS：

```html
<style>
  .giscus-container {
    margin-top: 3rem;
    padding: 2rem;
    background-color: #f9fafb;
    border-radius: 8px;
  }
</style>
```

## 进阶配置

### 自定义主题

可以创建自定义 Giscus 主题：
1. 参考 [Giscus 主题文档](https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md#data-theme)
2. 创建自定义 CSS 文件
3. 在 `data-theme` 中指定主题 URL

### 评论通知

作为仓库管理员，你会收到：
- 新评论的邮件通知
- GitHub 通知中心的提醒

可以在 GitHub 设置中调整通知偏好。

## 参考资源

- [Giscus 官方网站](https://giscus.app/zh-CN)
- [Giscus GitHub 仓库](https://github.com/giscus/giscus)
- [GitHub Discussions 文档](https://docs.github.com/en/discussions)

---

配置完成后，你的学习平台就拥有了强大的评论和讨论功能！
