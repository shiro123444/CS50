# GitHub Actions 部署测试清单

本文档提供完整的部署测试清单，确保 GitHub Actions 自动部署功能正常工作。

## 前置条件检查

在开始测试前，确认以下条件已满足：

- [ ] GitHub 仓库已创建
- [ ] 本地代码已推送到 GitHub
- [ ] VitePress 项目配置完成
- [ ] `.github/workflows/deploy.yml` 文件已创建
- [ ] `package.json` 包含正确的构建脚本

## 第一部分：GitHub 仓库配置

### 1.1 启用 GitHub Pages

- [ ] 进入仓库 **Settings** > **Pages**
- [ ] **Source** 设置为 **GitHub Actions**
- [ ] 页面显示 "GitHub Pages is currently disabled"（首次配置时）或显示站点 URL

### 1.2 配置 Actions 权限

- [ ] 进入 **Settings** > **Actions** > **General**
- [ ] **Workflow permissions** 选择 **Read and write permissions**
- [ ] 勾选 **Allow GitHub Actions to create and approve pull requests**
- [ ] 点击 **Save**

### 1.3 验证工作流文件

- [ ] 文件路径正确：`.github/workflows/deploy.yml`
- [ ] 文件内容完整，包含 build 和 deploy 两个 job
- [ ] 触发条件配置正确（push to master）
- [ ] Node.js 版本设置为 20
- [ ] 构建命令为 `npm run docs:build`
- [ ] 上传路径为 `docs/.vitepress/dist`

## 第二部分：本地构建测试

在推送到 GitHub 前，先在本地测试构建：

### 2.1 安装依赖

```bash
npm install
```

- [ ] 依赖安装成功，无错误
- [ ] `node_modules` 目录已创建

### 2.2 本地构建

```bash
npm run docs:build
```

- [ ] 构建成功完成
- [ ] 无错误或警告（或仅有可接受的警告）
- [ ] 生成 `docs/.vitepress/dist` 目录
- [ ] dist 目录包含 `index.html` 和其他资源文件

### 2.3 本地预览

```bash
npm run docs:preview
```

- [ ] 预览服务器启动成功
- [ ] 可以在浏览器访问（通常是 http://localhost:4173）
- [ ] 首页正常显示
- [ ] 导航链接正常工作
- [ ] 样式正确加载
- [ ] 图片正确显示

## 第三部分：首次部署测试

### 3.1 推送代码触发部署

```bash
git add .
git commit -m "配置 GitHub Actions 自动部署"
git push origin master
```

- [ ] 代码成功推送到 GitHub
- [ ] 无推送错误

### 3.2 监控工作流执行

- [ ] 进入 GitHub 仓库的 **Actions** 标签
- [ ] 看到 "Deploy VitePress site to Pages" 工作流正在运行
- [ ] 工作流显示黄色圆圈（运行中）

### 3.3 检查构建任务

点击工作流运行，查看 **build** 任务：

- [ ] Checkout 步骤成功 ✓
- [ ] Setup Node 步骤成功 ✓
- [ ] Setup Pages 步骤成功 ✓
- [ ] Install dependencies 步骤成功 ✓
- [ ] Build with VitePress 步骤成功 ✓
- [ ] Upload artifact 步骤成功 ✓
- [ ] 整个 build 任务显示绿色勾号 ✓

### 3.4 检查部署任务

查看 **deploy** 任务：

- [ ] 等待 build 任务完成后自动开始
- [ ] Deploy to GitHub Pages 步骤成功 ✓
- [ ] 整个 deploy 任务显示绿色勾号 ✓
- [ ] 工作流整体显示绿色勾号 ✓

### 3.5 获取站点 URL

- [ ] 进入 **Settings** > **Pages**
- [ ] 页面顶部显示 "Your site is live at https://..."
- [ ] 复制站点 URL

## 第四部分：站点功能测试

### 4.1 访问站点

使用获取的 URL 访问站点：

- [ ] 站点可以正常访问（不是 404）
- [ ] 首页正确显示
- [ ] 页面标题正确
- [ ] Logo 和图标正确显示

### 4.2 导航测试

- [ ] 顶部导航栏正常显示
- [ ] 点击导航链接可以跳转
- [ ] 侧边栏正常显示
- [ ] 侧边栏可以展开/折叠
- [ ] 面包屑导航正确显示

### 4.3 内容测试

- [ ] 课程内容正确显示
- [ ] Markdown 格式正确渲染
- [ ] 代码块语法高亮正常
- [ ] 标题层级正确
- [ ] 列表格式正确

### 4.4 资源加载测试

- [ ] 所有图片正确加载
- [ ] CSS 样式正确应用
- [ ] JavaScript 功能正常
- [ ] 字体正确加载
- [ ] 无 404 错误（检查浏览器控制台）

### 4.5 搜索功能测试

- [ ] 搜索框正常显示
- [ ] 点击搜索框打开搜索面板
- [ ] 输入关键词显示搜索结果
- [ ] 点击搜索结果可以跳转
- [ ] 搜索结果准确

### 4.6 Giscus 评论测试

- [ ] 评论组件正常加载
- [ ] 可以看到评论区域
- [ ] 登录 GitHub 后可以发表评论
- [ ] 评论成功发布
- [ ] 可以回复评论
- [ ] 主题切换正常（浅色/深色）

### 4.7 响应式测试

桌面端（1920x1080）：
- [ ] 布局正常
- [ ] 侧边栏正常显示
- [ ] 内容区域宽度合适

平板端（768x1024）：
- [ ] 布局自适应
- [ ] 侧边栏可以切换
- [ ] 内容可读性良好

移动端（375x667）：
- [ ] 布局适配移动端
- [ ] 导航菜单可以展开
- [ ] 内容正常显示
- [ ] 触摸操作流畅

### 4.8 性能测试

- [ ] 首页加载时间 < 3 秒
- [ ] 页面切换流畅
- [ ] 无明显卡顿
- [ ] 图片加载优化（懒加载）

## 第五部分：更新部署测试

### 5.1 修改内容

修改一个课程文件，例如 `docs/courses/chapter-01/lesson-01.md`：

```bash
# 添加一行测试内容
echo "\n## 测试更新\n\n这是一个测试更新。" >> docs/courses/chapter-01/lesson-01.md
```

- [ ] 文件修改成功

### 5.2 推送更新

```bash
git add .
git commit -m "测试自动部署更新"
git push origin master
```

- [ ] 代码成功推送
- [ ] 工作流自动触发

### 5.3 验证自动部署

- [ ] 在 Actions 页面看到新的工作流运行
- [ ] 构建和部署成功完成
- [ ] 访问站点，刷新页面
- [ ] 看到更新的内容
- [ ] 更新时间正确显示（如果启用了 lastUpdated）

## 第六部分：手动触发测试

### 6.1 手动触发工作流

- [ ] 进入 **Actions** 标签
- [ ] 选择 "Deploy VitePress site to Pages" 工作流
- [ ] 点击 **Run workflow** 按钮
- [ ] 选择 master 分支
- [ ] 点击绿色的 **Run workflow** 按钮

### 6.2 验证手动部署

- [ ] 工作流开始运行
- [ ] 构建和部署成功完成
- [ ] 站点正常访问

## 第七部分：错误处理测试

### 7.1 构建错误测试

故意引入一个构建错误：

```bash
# 在 VitePress 配置中添加语法错误
echo "invalid syntax" >> docs/.vitepress/config.js
git add .
git commit -m "测试构建错误处理"
git push origin master
```

- [ ] 工作流运行
- [ ] 构建任务失败（红色 X）
- [ ] 可以查看错误日志
- [ ] 错误信息清晰

修复错误：

```bash
git revert HEAD
git push origin master
```

- [ ] 工作流重新运行
- [ ] 构建和部署成功

### 7.2 权限错误测试

如果遇到权限错误：

- [ ] 检查 Actions 权限设置
- [ ] 确认 workflow permissions 正确
- [ ] 重新运行工作流
- [ ] 问题解决

## 第八部分：文档和维护

### 8.1 文档完整性

- [ ] README.md 包含部署状态徽章
- [ ] 创建了 GITHUB_ACTIONS_SETUP.md 指南
- [ ] 创建了 ENABLE_GITHUB_PAGES.md 快速指南
- [ ] 创建了本测试清单

### 8.2 维护计划

- [ ] 定期检查工作流运行状态
- [ ] 监控构建时间
- [ ] 更新依赖版本
- [ ] 优化构建流程

## 测试结果总结

### 成功标准

所有以下项目都应该通过：

- ✅ GitHub Pages 配置正确
- ✅ 工作流文件配置正确
- ✅ 本地构建成功
- ✅ 自动部署成功
- ✅ 站点可以访问
- ✅ 所有功能正常工作
- ✅ 更新自动部署
- ✅ 手动触发正常
- ✅ 错误处理正确
- ✅ 文档完整

### 常见问题参考

如果测试中遇到问题，请参考：

- [GitHub Actions 配置指南](./GITHUB_ACTIONS_SETUP.md) - 详细的故障排除
- [启用 GitHub Pages 指南](./ENABLE_GITHUB_PAGES.md) - 快速配置步骤
- [VitePress 快速开始](../VITEPRESS_QUICKSTART.md) - VitePress 配置

## 完成确认

- [ ] 所有测试项目已完成
- [ ] 所有功能正常工作
- [ ] 文档已更新
- [ ] 团队成员已通知
- [ ] 部署流程已记录

---

**测试日期**: ___________  
**测试人员**: ___________  
**测试结果**: ⬜ 通过 / ⬜ 失败  
**备注**: ___________
