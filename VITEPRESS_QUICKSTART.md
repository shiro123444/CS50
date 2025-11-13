# VitePress 快速开始指南

## 🎉 已完成的工作

✅ VitePress 项目结构已创建  
✅ Giscus 评论组件已集成  
✅ GitHub Actions 自动部署已配置  
✅ 所有课程内容已迁移到 `docs/` 目录  
✅ 任务列表已更新

## 📋 下一步操作

### 1. 安装依赖

在项目根目录运行：

```bash
npm install
```

这会安装 VitePress 和 Vue 3。

### 2. 本地预览

启动开发服务器：

```bash
npm run docs:dev
```

然后访问 http://localhost:5173 查看效果。

你会看到：
- ✅ 美观的首页
- ✅ 完整的课程导航
- ✅ 工作的 Giscus 评论系统（需要 GitHub Discussions 启用）
- ✅ 本地搜索功能
- ✅ 深色/浅色主题切换

### 3. 启用 GitHub Pages

1. 访问 https://github.com/shiro123444/CS50/settings/pages
2. 在 **Source** 下拉菜单中选择 **GitHub Actions**
3. 保存

### 4. 触发首次部署

代码已经推送，GitHub Actions 会自动开始构建。你可以：

1. 访问 https://github.com/shiro123444/CS50/actions
2. 查看 "Deploy to GitHub Pages" 工作流
3. 等待构建完成（约 2-3 分钟）

### 5. 访问你的网站

构建完成后，你的网站将在以下地址可用：

**https://shiro123444.github.io/CS50/**

## 🎨 功能特性

### Giscus 评论系统

每个课程页面底部都有评论区，完全支持：
- 💬 发布评论和回复
- 👍 点赞和表情反应
- 🌓 自动适配深色/浅色主题
- 🔗 与 GitHub Discussions 完美集成

### 本地搜索

按 `/` 或点击搜索框即可搜索所有内容，支持中文。

### 响应式设计

完美支持手机、平板和电脑，自动适配屏幕大小。

### 代码高亮

所有代码块都有语法高亮和行号显示。

## 🔧 常用命令

```bash
# 启动开发服务器
npm run docs:dev

# 构建生产版本
npm run docs:build

# 预览构建结果
npm run docs:preview
```

## 📝 添加新课程

1. 在 `docs/courses/` 下创建新的章节目录
2. 添加 Markdown 文件
3. 在 `docs/.vitepress/config.js` 的 `sidebar` 中添加导航链接
4. 在课程页面底部添加 `<Giscus />` 组件

示例：

```markdown
# 新课程标题

课程内容...

---

<Giscus />
```

## 🎯 与 GitBook 的对比

| 功能 | GitBook | VitePress |
|------|---------|-----------|
| Giscus 评论 | ❌ 不支持 | ✅ 完美支持 |
| 加载速度 | 🐢 较慢 | 🚀 极快 |
| 自定义能力 | ⚠️ 有限 | ✅ 完全控制 |
| 本地搜索 | ✅ 支持 | ✅ 支持 |
| 费用 | 💰 免费版有限制 | ✅ 完全免费 |
| 部署 | 🔄 自动 | 🔄 自动 |

## 🐛 故障排除

### 问题：npm install 失败

**解决方案**：
```bash
# 清除缓存
npm cache clean --force

# 重新安装
npm install
```

### 问题：本地开发服务器启动失败

**解决方案**：
```bash
# 检查 Node.js 版本（需要 18+）
node --version

# 删除 node_modules 重新安装
rm -rf node_modules package-lock.json
npm install
```

### 问题：GitHub Actions 构建失败

**解决方案**：
1. 检查 GitHub Pages 是否已启用
2. 确认 Source 设置为 "GitHub Actions"
3. 查看 Actions 日志获取详细错误信息

### 问题：Giscus 评论不显示

**解决方案**：
1. 确认 GitHub Discussions 已启用
2. 检查 `Giscus.vue` 中的 `data-repo` 和 `data-repo-id` 是否正确
3. 确认仓库是公开的

## 📚 参考资源

- [VitePress 官方文档](https://vitepress.dev/)
- [Giscus 官网](https://giscus.app/)
- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [GitHub Actions 文档](https://docs.github.com/en/actions)

## ✅ 检查清单

完成以下步骤后，你的平台就完全可用了：

- [ ] 运行 `npm install` 安装依赖
- [ ] 运行 `npm run docs:dev` 本地预览
- [ ] 在 GitHub 仓库设置中启用 Pages
- [ ] 等待 GitHub Actions 构建完成
- [ ] 访问 https://shiro123444.github.io/CS50/ 查看网站
- [ ] 测试 Giscus 评论功能
- [ ] 测试搜索功能
- [ ] 在手机上测试响应式布局

## 🎊 完成！

恭喜！你现在有了一个功能完整、性能优秀的学习平台，并且 Giscus 评论系统可以完美工作！

有任何问题随时问我！
