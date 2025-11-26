# 启用 GitHub Pages 快速指南

本文档提供启用 GitHub Pages 的快速步骤清单。

## 快速步骤

### 1. 进入仓库设置

1. 打开你的 GitHub 仓库
2. 点击顶部的 **Settings**（设置）标签

### 2. 找到 Pages 设置

1. 在左侧菜单中向下滚动
2. 点击 **Pages**（在 "Code and automation" 部分）

### 3. 配置 Source

在 **Build and deployment** 部分：

1. **Source**: 选择 **GitHub Actions**
2. 不需要选择分支（因为使用 Actions）

### 4. 保存配置

配置会自动保存，无需点击保存按钮。

## 验证配置

### 检查 Actions 权限

1. 进入 **Settings** > **Actions** > **General**
2. 在 **Workflow permissions** 部分
3. 确保选择了 **Read and write permissions**
4. 勾选 **Allow GitHub Actions to create and approve pull requests**
5. 点击 **Save**

### 触发首次部署

```bash
# 推送代码触发部署
git add .
git commit -m "启用 GitHub Pages"
git push origin master
```

### 查看部署状态

1. 点击仓库顶部的 **Actions** 标签
2. 查看 "Deploy VitePress site to Pages" 工作流
3. 等待构建和部署完成（绿色勾号 ✓）

### 访问站点

部署成功后，在 **Settings** > **Pages** 页面会显示：

```
Your site is live at https://<username>.github.io/<repository>/
```

点击链接访问你的站点。

## 常见配置选项

### 自定义域名（可选）

如果你有自定义域名：

1. 在 **Custom domain** 输入框中输入域名
2. 点击 **Save**
3. 在域名提供商处配置 DNS 记录：
   - 添加 CNAME 记录指向 `<username>.github.io`
4. 勾选 **Enforce HTTPS**（推荐）

### 配置示例

**使用 GitHub Actions（推荐）**:
- ✅ Source: GitHub Actions
- ✅ 自动构建和部署
- ✅ 支持自定义构建流程

**使用分支部署（传统方式）**:
- Source: Deploy from a branch
- Branch: gh-pages / (root)
- 需要手动构建并推送到 gh-pages 分支

## 故障排除

### 问题 1: 找不到 Pages 选项

**原因**: 仓库可能是私有的（免费账户）

**解决方案**:
- 将仓库设置为公开
- 或升级到 GitHub Pro/Team

### 问题 2: 部署后显示 404

**原因**: VitePress base 配置不正确

**解决方案**:
1. 检查 `docs/.vitepress/config.js`
2. 确保 `base: '/repository-name/'` 正确
3. 重新部署

### 问题 3: Actions 权限错误

**原因**: 工作流没有足够的权限

**解决方案**:
1. Settings > Actions > General
2. Workflow permissions: Read and write permissions
3. 保存并重新运行工作流

## 完成清单

- [ ] 仓库设置中启用了 Pages
- [ ] Source 设置为 GitHub Actions
- [ ] Actions 权限配置正确
- [ ] 工作流文件已创建
- [ ] 推送代码触发了部署
- [ ] 部署成功完成
- [ ] 可以访问站点 URL
- [ ] 所有页面正常显示

## 下一步

- 配置自定义域名（可选）
- 添加 README 徽章显示部署状态
- 设置分支保护规则
- 配置 Dependabot 自动更新依赖

## 相关文档

- [GitHub Actions 配置指南](./GITHUB_ACTIONS_SETUP.md)
- [VitePress 快速开始](../VITEPRESS_QUICKSTART.md)
- [GitHub Pages 官方文档](https://docs.github.com/en/pages)
