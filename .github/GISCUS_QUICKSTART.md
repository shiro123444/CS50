# Giscus 快速启动指南

本指南帮助你快速完成 Giscus 评论系统的配置。

## ⚡ 快速步骤

### 1️⃣ 启用 GitHub Discussions（1 分钟）

1. 进入你的 GitHub 仓库
2. 点击 **Settings** → 找到 **Features** 部分
3. ✅ 勾选 **Discussions**

### 2️⃣ 安装 Giscus App（1 分钟）

1. 访问：https://github.com/apps/giscus
2. 点击 **Install**
3. 选择你的仓库并授权

### 3️⃣ 获取配置参数（2 分钟）

1. 访问：https://giscus.app/zh-CN
2. 输入你的仓库：`你的用户名/你的仓库名`
3. 等待验证通过（显示绿色 ✅）
4. 配置选项：
   - **映射方式**：pathname（路径名）
   - **分类**：General 或自定义
   - **主题**：preferred_color_scheme
   - **语言**：zh-CN（简体中文）
5. 复制页面底部生成的配置代码

### 4️⃣ 更新配置（3 分钟）

需要替换以下文件中的配置参数：

#### 文件列表：
- `resources/components/giscus-comments.html`
- `courses/chapter-01/README.md`
- `courses/chapter-01/lesson-01.md`
- `courses/chapter-01/lesson-02.md`
- `courses/chapter-02/README.md`
- `courses/chapter-02/lesson-01.md`
- `courses/chapter-02/lesson-02.md`

#### 需要替换的参数：

在所有文件中查找并替换：

```html
data-repo="YOUR_USERNAME/YOUR_REPO"          → data-repo="你的用户名/你的仓库名"
data-repo-id="YOUR_REPO_ID"                  → data-repo-id="R_xxxxx"（从 giscus.app 获取）
data-category="General"                       → data-category="你选择的分类名"
data-category-id="YOUR_CATEGORY_ID"          → data-category-id="DIC_xxxxx"（从 giscus.app 获取）
```

#### 快速替换方法：

**使用 VS Code 或其他编辑器的全局搜索替换功能：**

1. 搜索：`YOUR_USERNAME/YOUR_REPO`
   - 替换为：`你的用户名/你的仓库名`

2. 搜索：`YOUR_REPO_ID`
   - 替换为：你的 `data-repo-id` 值（如 `R_kgDOL1234`）

3. 搜索：`YOUR_CATEGORY_ID`
   - 替换为：你的 `data-category-id` 值（如 `DIC_kwDOL1234`）

### 5️⃣ 提交并测试（2 分钟）

```bash
git add .
git commit -m "配置 Giscus 评论系统"
git push
```

等待 GitBook 自动同步后，访问任意课程页面，滚动到底部即可看到评论区！

## ✅ 验证清单

- [ ] GitHub Discussions 已启用
- [ ] Giscus App 已安装
- [ ] 所有文件中的配置参数已更新
- [ ] 代码已提交并推送到 GitHub
- [ ] GitBook 已自动同步
- [ ] 课程页面底部显示评论组件
- [ ] 可以使用 GitHub 账号登录并发表评论

## 🔧 故障排除

### 问题：评论组件不显示

**检查项**：
- ✅ 仓库是否为 **public**（公开）
- ✅ Discussions 功能是否已启用
- ✅ Giscus App 是否已正确安装
- ✅ 配置参数是否正确（特别是 repo-id 和 category-id）

### 问题：无法登录评论

**可能原因**：
- 浏览器阻止了第三方 cookies
- 网络连接问题

**解决方法**：
- 在浏览器设置中允许第三方 cookies
- 尝试使用其他浏览器
- 检查网络连接

### 问题：找不到配置参数

在 giscus.app 页面：
1. 确保仓库验证通过（显示绿色 ✅）
2. 向下滚动到 **启用 giscus** 部分
3. 复制 `<script>` 标签中的所有 `data-*` 属性值

## 📚 详细文档

需要更多帮助？查看完整的 [Giscus 配置指南](../resources/GISCUS_SETUP.md)

## 🎉 完成！

配置完成后，你的学习平台就拥有了功能强大的评论和讨论系统！

用户可以：
- 💬 在每个课程页面下发表评论
- 🔄 回复其他人的评论
- 👍 对评论点赞
- 📧 接收评论通知（如果订阅了讨论）

管理员可以：
- 📊 在 GitHub Discussions 中管理所有评论
- 🔒 锁定或关闭讨论
- 🗑️ 删除不当评论
- 📌 置顶重要讨论
