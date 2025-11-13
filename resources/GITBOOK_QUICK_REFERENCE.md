# GitBook 配置快速参考

## 🚀 快速开始（5 分钟配置）

### 1️⃣ 创建账号
- 访问: https://www.gitbook.com/
- 使用 GitHub 账号登录（推荐）

### 2️⃣ 创建空间
- 点击 "Create a new space"
- 选择 "Import from Git"
- 空间名称: "社团课程学习平台"
- 可见性: Public（公开）

### 3️⃣ 连接仓库
- 进入空间设置 → Git Sync
- 点击 "Connect to GitHub"
- 授权并选择你的课程仓库
- 选择分支: `main`

### 4️⃣ 配置同步
- 同步方向: GitHub → GitBook only（单向）
- 启用 Auto-sync（自动同步）
- 点击 "Sync now" 开始首次同步

### 5️⃣ 验证部署
- 等待 2-3 分钟完成构建
- 访问你的 GitBook 链接
- 检查内容是否正确显示

---

## 📋 配置参数速查

| 配置项 | 推荐值 | 说明 |
|--------|--------|------|
| 分支 | `main` | 同步的 Git 分支 |
| 同步方向 | GitHub → GitBook | 单向同步，仅在 GitHub 编辑 |
| 根目录 | `/` | 项目根目录 |
| Auto-sync | ✅ 启用 | 推送时自动同步 |
| 可见性 | Public | 公开访问 |

---

## 🧪 测试命令

### 测试内容更新
```bash
# 修改文件
echo "新内容" >> courses/chapter-01/lesson-01.md

# 提交并推送
git add .
git commit -m "测试: 更新课程内容"
git push origin main

# 等待 1-2 分钟，刷新 GitBook 查看更新
```

### 测试添加新课程
```bash
# 创建新文件
echo "# 新课程" > courses/chapter-01/lesson-03.md

# 更新目录
# 编辑 SUMMARY.md，添加新课程链接

# 提交并推送
git add .
git commit -m "测试: 添加新课程"
git push origin main
```

---

## ⚠️ 常见错误速查

| 错误 | 原因 | 解决方案 |
|------|------|----------|
| 同步失败 | `.gitbook.yaml` 配置错误 | 检查配置文件格式 |
| 图片不显示 | 路径错误 | 使用相对路径 `../../resources/images/xxx.png` |
| 导航为空 | `SUMMARY.md` 格式错误 | 检查 Markdown 列表语法 |
| 搜索不工作 | 索引未完成 | 等待几分钟后重试 |

---

## 🔗 重要链接

- **GitBook 官网**: https://www.gitbook.com/
- **Git Sync 文档**: https://docs.gitbook.com/integrations/git-sync
- **详细配置指南**: 查看 `resources/GITBOOK_SETUP_GUIDE.md`

---

## ✅ 配置完成检查

- [ ] GitBook 账号已创建
- [ ] 空间已创建并连接仓库
- [ ] Git Sync 已配置并启用自动同步
- [ ] 首次同步成功完成
- [ ] 访问 GitBook 链接，内容正常显示
- [ ] 测试推送更新，自动同步正常工作

**全部完成后，标记任务 6 为已完成！** 🎉
