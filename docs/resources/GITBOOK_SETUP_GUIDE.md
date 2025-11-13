# GitBook 平台配置指南

本指南将帮助你完成 GitBook 平台的配置和 Git Sync 设置，实现课程内容的自动同步和发布。

## 前置条件

在开始之前，请确保：
- ✅ 已创建 GitHub 仓库并推送了所有课程内容
- ✅ 已完成 `.gitbook.yaml`、`README.md`、`SUMMARY.md` 等配置文件
- ✅ 已创建示例课程内容
- ✅ 拥有有效的 GitHub 账号

## 步骤 1: 创建 GitBook 账号

### 1.1 注册 GitBook 账号

1. 访问 [GitBook 官网](https://www.gitbook.com/)
2. 点击右上角的 **Sign Up** 按钮
3. 选择注册方式：
   - **推荐**: 使用 GitHub 账号登录（可以直接关联仓库）
   - 或使用 Google 账号
   - 或使用邮箱注册

### 1.2 选择计划

- **免费计划**: 适合个人和小型团队
  - 公开内容无限制
  - 基础功能完整
  - 适合本项目使用
- **付费计划**: 提供私有内容、自定义域名等高级功能

**建议**: 先使用免费计划，后续根据需要升级

---

## 步骤 2: 创建 GitBook 空间

### 2.1 创建新空间

1. 登录 GitBook 后，点击 **Create a new space**
2. 选择创建方式：**Import from Git**（从 Git 导入）
3. 填写空间信息：
   - **Space name**: 例如 "社团课程学习平台"
   - **Visibility**: 选择 **Public**（公开）

### 2.2 空间设置

创建空间后，你可以在设置中配置：
- 空间图标和封面
- 空间描述
- 访问权限
- 自定义域名（可选）

---

## 步骤 3: 连接 GitHub 仓库

### 3.1 授权 GitBook 访问 GitHub

1. 在空间设置中，找到 **Integrations** 或 **Git Sync** 选项
2. 点击 **Connect to GitHub**
3. 授权 GitBook 访问你的 GitHub 账号
4. 选择要授权的仓库范围：
   - **推荐**: 仅授权特定仓库（更安全）
   - 或授权所有仓库

### 3.2 选择要同步的仓库

1. 在 Git Sync 设置页面，点击 **Select a repository**
2. 从列表中选择你的课程仓库
3. 确认仓库路径正确

### 3.3 配置同步设置

配置以下选项：

#### 分支选择
- **Branch**: 选择 `main`（或 `master`，取决于你的默认分支）
- 这是 GitBook 将要同步的分支

#### 同步方向
- **Bi-directional sync**: 双向同步（GitBook 和 GitHub 都可以编辑）
- **GitHub → GitBook only**: 单向同步（推荐，仅从 GitHub 同步到 GitBook）

**建议**: 选择单向同步，所有内容编辑在 GitHub 完成，GitBook 仅用于展示

#### 根目录配置
- **Root path**: 保持默认 `/`（根目录）
- GitBook 会自动读取 `.gitbook.yaml` 配置

---

## 步骤 4: 配置 Git Sync 自动同步

### 4.1 启用自动同步

1. 在 Git Sync 设置中，确保 **Auto-sync** 已启用
2. 配置同步触发条件：
   - ✅ **On push to branch**: 当推送到 main 分支时自动同步
   - ✅ **On pull request merge**: 当 PR 合并时自动同步

### 4.2 验证配置

检查以下配置是否正确：

```yaml
# .gitbook.yaml 文件内容
root: ./
structure:
  readme: README.md
  summary: SUMMARY.md
```

确保：
- `README.md` 存在于根目录
- `SUMMARY.md` 存在于根目录
- 所有在 `SUMMARY.md` 中引用的文件都存在

### 4.3 首次同步

1. 点击 **Sync now** 或 **Import** 按钮
2. 等待 GitBook 导入内容（可能需要几分钟）
3. 查看同步日志，确认没有错误

---

## 步骤 5: 测试内容推送和自动构建

### 5.1 测试场景 1: 修改现有内容

1. 在本地修改一个课程文件，例如 `courses/chapter-01/lesson-01.md`
2. 提交并推送到 GitHub:
   ```bash
   git add courses/chapter-01/lesson-01.md
   git commit -m "更新课程内容：第一章第一课"
   git push origin main
   ```
3. 等待 1-2 分钟
4. 刷新 GitBook 页面，验证内容已更新

### 5.2 测试场景 2: 添加新课程

1. 创建新的课程文件 `courses/chapter-01/lesson-03.md`
2. 更新 `SUMMARY.md`，添加新课程链接：
   ```markdown
   * [第一章：基础知识](courses/chapter-01/README.md)
     * [第一课：入门](courses/chapter-01/lesson-01.md)
     * [第二课：进阶](courses/chapter-01/lesson-02.md)
     * [第三课：实践](courses/chapter-01/lesson-03.md)
   ```
3. 提交并推送：
   ```bash
   git add courses/chapter-01/lesson-03.md SUMMARY.md
   git commit -m "添加新课程：第一章第三课"
   git push origin main
   ```
4. 验证 GitBook 导航菜单中出现新课程

### 5.3 测试场景 3: 添加图片资源

1. 添加图片到 `resources/images/` 目录
2. 在课程中引用图片：
   ```markdown
   ![示例图片](../../resources/images/example.png)
   ```
3. 提交并推送
4. 验证 GitBook 中图片正常显示

### 5.4 检查同步状态

在 GitBook 的 Git Sync 页面，你可以看到：
- 最近的同步记录
- 同步状态（成功/失败）
- 同步日志和错误信息

---

## 步骤 6: 验证部署和访问

### 6.1 获取 GitBook 访问链接

1. 在 GitBook 空间设置中，找到 **Published URL**
2. 默认格式: `https://your-org.gitbook.io/your-space/`
3. 复制链接并在浏览器中打开

### 6.2 验证功能清单

访问 GitBook 站点，逐一验证以下功能：

- [ ] 首页（README.md）正常显示
- [ ] 左侧导航菜单显示所有章节和课程
- [ ] 点击导航链接可以正常跳转
- [ ] 课程内容格式正确（标题、列表、代码块等）
- [ ] 图片资源正常加载
- [ ] 搜索功能可用（在顶部搜索框测试）
- [ ] 响应式布局（在手机上测试）
- [ ] Giscus 评论组件正常显示（如果已配置）
- [ ] "提交问题"链接指向正确的 GitHub Issues 页面

### 6.3 性能测试

- 测试页面加载速度（应在 3 秒内）
- 测试搜索响应速度
- 测试图片加载速度

---

## 常见问题和解决方案

### 问题 1: 同步失败

**症状**: GitBook 显示同步错误，内容未更新

**可能原因**:
- `.gitbook.yaml` 配置错误
- `SUMMARY.md` 中引用的文件不存在
- Markdown 语法错误

**解决方案**:
1. 检查 GitBook 同步日志，查看具体错误信息
2. 验证 `.gitbook.yaml` 配置正确
3. 确保 `SUMMARY.md` 中的所有链接都有效
4. 使用 Markdown linter 检查语法错误
5. 手动触发重新同步

### 问题 2: 图片无法显示

**症状**: 课程中的图片显示为损坏图标

**可能原因**:
- 图片路径错误
- 图片文件未提交到 Git
- 图片格式不支持

**解决方案**:
1. 检查图片相对路径是否正确
2. 确认图片文件已提交并推送到 GitHub
3. 使用支持的图片格式（PNG, JPG, GIF, WebP）
4. 检查图片文件大小（建议 < 1MB）

### 问题 3: 导航菜单不显示

**症状**: 左侧导航菜单为空或不完整

**可能原因**:
- `SUMMARY.md` 格式错误
- `.gitbook.yaml` 中 `summary` 路径配置错误

**解决方案**:
1. 检查 `SUMMARY.md` 格式是否符合 GitBook 规范
2. 确保使用正确的 Markdown 列表语法
3. 验证 `.gitbook.yaml` 中的 `structure.summary` 配置
4. 参考本项目的 `SUMMARY.md` 示例

### 问题 4: 搜索功能不工作

**症状**: 搜索框无法搜索或搜索结果不准确

**可能原因**:
- GitBook 索引未完成
- 内容刚刚更新，索引未刷新

**解决方案**:
1. 等待几分钟，让 GitBook 完成索引
2. 清除浏览器缓存并刷新
3. 在内容中添加更多关键词和描述

### 问题 5: 自动同步延迟

**症状**: 推送到 GitHub 后，GitBook 内容更新缓慢

**可能原因**:
- GitBook 服务器负载高
- 内容量大，构建时间长

**解决方案**:
1. 正常情况下，同步需要 1-5 分钟
2. 可以在 Git Sync 页面手动触发同步
3. 优化内容大小，压缩图片
4. 如果长时间未同步，检查同步日志

---

## 配置检查清单

完成配置后，使用此清单进行最终检查：

### GitBook 账号和空间
- [ ] 已创建 GitBook 账号
- [ ] 已创建公开空间
- [ ] 空间名称和描述已设置

### Git Sync 配置
- [ ] 已授权 GitBook 访问 GitHub
- [ ] 已连接正确的 GitHub 仓库
- [ ] 已选择 main 分支
- [ ] 已启用自动同步
- [ ] 首次同步成功完成

### 内容验证
- [ ] 首页内容正确显示
- [ ] 导航菜单完整
- [ ] 所有课程页面可访问
- [ ] 图片资源正常加载
- [ ] 代码块语法高亮正常

### 功能测试
- [ ] 搜索功能正常工作
- [ ] 响应式布局正常
- [ ] Giscus 评论组件已集成
- [ ] GitHub Issues 链接正确

### 自动化测试
- [ ] 测试修改现有内容的同步
- [ ] 测试添加新内容的同步
- [ ] 测试添加图片的同步
- [ ] 验证同步时间在可接受范围内

---

## 下一步

完成 GitBook 配置后，你可以：

1. **优化内容展示**（任务 7）
   - 添加搜索关键词
   - 优化图片
   - 改进导航

2. **创建使用文档**（任务 8）
   - 编写贡献指南
   - 编写维护文档

3. **邀请团队成员**
   - 分享 GitBook 链接
   - 收集反馈
   - 持续改进

---

## 参考资源

- [GitBook 官方文档](https://docs.gitbook.com/)
- [Git Sync 配置指南](https://docs.gitbook.com/integrations/git-sync)
- [GitBook Markdown 语法](https://docs.gitbook.com/content-creation/editor/markdown)
- [本项目 GitHub 仓库](https://github.com/your-org/your-repo)

---

## 技术支持

如果遇到问题：
1. 查看 GitBook 同步日志
2. 参考本文档的"常见问题"部分
3. 访问 [GitBook 社区](https://github.com/GitbookIO/community)
4. 在项目仓库提交 Issue

---

**配置完成后，请在任务列表中标记任务 6 为已完成！** ✅
