# GitHub Actions 自动部署配置指南

本文档介绍如何配置 GitHub Actions 自动构建和部署 VitePress 站点到 GitHub Pages。

## 前置条件

- GitHub 仓库已创建
- VitePress 项目已配置完成
- 本地代码已推送到 GitHub

## 配置步骤

### 1. 启用 GitHub Pages

1. 打开 GitHub 仓库页面
2. 点击 **Settings**（设置）
3. 在左侧菜单中找到 **Pages**
4. 在 **Source**（源）部分，选择 **GitHub Actions**

![GitHub Pages 设置](../resources/images/github-pages-settings.png)

### 2. 配置工作流文件

工作流文件已创建在 `.github/workflows/deploy.yml`，包含以下配置：

#### 触发条件
- 推送到 `master` 分支时自动触发
- 支持手动触发（workflow_dispatch）

#### 构建步骤
1. 检出代码（包含完整历史记录，用于 lastUpdated 功能）
2. 设置 Node.js 环境（版本 20）
3. 安装依赖（npm ci）
4. 构建 VitePress 站点
5. 上传构建产物

#### 部署步骤
- 将构建产物部署到 GitHub Pages

### 3. 权限配置

工作流需要以下权限：
- `contents: read` - 读取仓库内容
- `pages: write` - 写入 Pages
- `id-token: write` - 用于身份验证

这些权限已在工作流文件中配置。

### 4. 测试部署流程

#### 方法 1: 推送代码触发

```bash
# 提交更改
git add .
git commit -m "配置 GitHub Actions 自动部署"

# 推送到 master 分支
git push origin master
```

#### 方法 2: 手动触发

1. 打开 GitHub 仓库页面
2. 点击 **Actions** 标签
3. 选择 **Deploy VitePress site to Pages** 工作流
4. 点击 **Run workflow** 按钮
5. 选择分支（master）
6. 点击 **Run workflow** 确认

### 5. 监控部署状态

1. 在 **Actions** 标签页查看工作流运行状态
2. 点击具体的工作流运行查看详细日志
3. 构建和部署成功后，可以看到绿色的勾号 ✓

### 6. 访问部署的站点

部署成功后，站点将在以下地址可访问：

```
https://<username>.github.io/<repository>/
```

例如：`https://shiro123444.github.io/CS50/`

## 工作流配置说明

### 并发控制

```yaml
concurrency:
  group: pages
  cancel-in-progress: false
```

- 只允许一个部署同时进行
- 不取消正在进行的部署，确保生产部署完成

### 缓存优化

```yaml
- name: Setup Node
  uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: npm
```

- 使用 npm 缓存加速依赖安装
- 减少构建时间

### 构建产物路径

```yaml
- name: Upload artifact
  uses: actions/upload-pages-artifact@v3
  with:
    path: docs/.vitepress/dist
```

- VitePress 默认输出目录为 `docs/.vitepress/dist`
- 确保路径与 VitePress 配置一致

## 常见问题

### 1. 部署失败：权限错误

**问题**: `Error: Resource not accessible by integration`

**解决方案**:
1. 进入仓库 **Settings** > **Actions** > **General**
2. 在 **Workflow permissions** 部分
3. 选择 **Read and write permissions**
4. 勾选 **Allow GitHub Actions to create and approve pull requests**
5. 点击 **Save**

### 2. 部署成功但页面 404

**问题**: 访问站点显示 404 错误

**解决方案**:
1. 检查 VitePress 配置中的 `base` 路径是否正确
2. 确保 `base: '/repository-name/'` 与仓库名称匹配
3. 重新构建和部署

### 3. 样式或资源加载失败

**问题**: 页面显示但样式丢失或图片无法加载

**解决方案**:
1. 确认 `base` 配置正确
2. 检查资源路径是否使用相对路径
3. 在 VitePress 配置中正确设置 `head` 中的资源路径

### 4. 构建时间过长

**问题**: 每次构建需要很长时间

**解决方案**:
1. 确保使用 `npm ci` 而不是 `npm install`
2. 启用 npm 缓存（已在工作流中配置）
3. 考虑优化依赖项

### 5. lastUpdated 功能不工作

**问题**: 页面底部不显示最后更新时间

**解决方案**:
1. 确保 checkout 步骤包含 `fetch-depth: 0`
2. 这会获取完整的 Git 历史记录
3. VitePress 需要 Git 历史来计算更新时间

## 自定义配置

### 修改触发分支

如果你使用 `main` 而不是 `master` 分支：

```yaml
on:
  push:
    branches:
      - main  # 修改为 main
```

### 添加构建缓存

为了进一步加速构建，可以缓存 VitePress 构建缓存：

```yaml
- name: Cache VitePress
  uses: actions/cache@v3
  with:
    path: docs/.vitepress/cache
    key: ${{ runner.os }}-vitepress-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-vitepress-
```

### 添加构建通知

可以添加构建状态通知（例如发送到 Slack 或邮件）：

```yaml
- name: Notify on success
  if: success()
  run: echo "部署成功！"
  
- name: Notify on failure
  if: failure()
  run: echo "部署失败，请检查日志"
```

## 最佳实践

1. **使用语义化版本标签**: 为重要的发布创建 Git 标签
2. **保护 master 分支**: 设置分支保护规则，要求 PR 审核
3. **定期更新依赖**: 使用 Dependabot 自动更新依赖
4. **监控构建时间**: 优化构建流程，减少部署时间
5. **测试本地构建**: 在推送前本地运行 `npm run docs:build` 测试

## 验证清单

部署配置完成后，请验证以下项目：

- [ ] GitHub Pages 已启用并设置为 GitHub Actions
- [ ] 工作流文件已创建在 `.github/workflows/deploy.yml`
- [ ] 推送代码后工作流自动触发
- [ ] 构建任务成功完成（绿色勾号）
- [ ] 部署任务成功完成（绿色勾号）
- [ ] 站点可以通过 GitHub Pages URL 访问
- [ ] 所有页面链接正常工作
- [ ] 样式和资源正确加载
- [ ] 搜索功能正常工作
- [ ] Giscus 评论系统正常加载
- [ ] 移动端响应式布局正常

## 下一步

配置完成后，你可以：

1. 自定义工作流添加更多功能
2. 配置自定义域名（可选）
3. 设置构建状态徽章
4. 集成其他 CI/CD 工具

## 相关资源

- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [VitePress 部署指南](https://vitepress.dev/guide/deploy)
- [actions/deploy-pages](https://github.com/actions/deploy-pages)

## 故障排除

如果遇到问题，请检查：

1. **Actions 日志**: 查看详细的构建和部署日志
2. **仓库权限**: 确保工作流有足够的权限
3. **VitePress 配置**: 验证 `base` 路径和其他配置
4. **依赖版本**: 确保所有依赖版本兼容
5. **GitHub 状态**: 检查 GitHub 服务状态

如果问题仍然存在，可以：
- 查看 GitHub Actions 社区论坛
- 提交 Issue 到 VitePress 仓库
- 查看本仓库的 Issues 和 Discussions
