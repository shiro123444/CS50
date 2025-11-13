# GitBook 配置前置检查清单

在开始配置 GitBook 之前，请使用此清单确保您的仓库已准备就绪。

## 📋 必需文件检查

### 核心配置文件

- [ ] `.gitbook.yaml` - GitBook 配置文件
  - 位置: 项目根目录
  - 必须包含: `root` 和 `structure` 配置
  
- [ ] `README.md` - 平台首页
  - 位置: 项目根目录
  - 内容: 平台介绍和使用指南
  
- [ ] `SUMMARY.md` - 目录结构
  - 位置: 项目根目录
  - 内容: 所有章节和课程的导航链接

### 课程内容文件

- [ ] `courses/` 目录存在
- [ ] 至少有一个章节目录（如 `courses/chapter-01/`）
- [ ] 每个章节至少有一个课程文件（`.md` 格式）
- [ ] 章节 README.md 文件存在

### 资源文件

- [ ] `resources/` 目录存在
- [ ] `resources/images/` 目录存在（如果使用图片）
- [ ] 所有引用的图片文件都已上传

### GitHub 配置

- [ ] `.github/` 目录存在
- [ ] `.github/ISSUE_TEMPLATE/` 目录存在
- [ ] Issue 模板文件已创建

---

## 🔍 配置文件验证

### 检查 .gitbook.yaml

打开 `.gitbook.yaml` 文件，确认内容类似：

```yaml
root: ./
structure:
  readme: README.md
  summary: SUMMARY.md
```

**验证要点**:
- ✅ `root` 指向正确的目录（通常是 `./`）
- ✅ `readme` 路径正确
- ✅ `summary` 路径正确
- ✅ YAML 语法正确（注意缩进）

### 检查 SUMMARY.md

打开 `SUMMARY.md` 文件，确认格式类似：

```markdown
# Table of contents

* [首页](README.md)

## 课程内容

* [第一章：基础知识](courses/chapter-01/README.md)
  * [第一课：入门](courses/chapter-01/lesson-01.md)
  * [第二课：进阶](courses/chapter-01/lesson-02.md)
```

**验证要点**:
- ✅ 使用正确的 Markdown 列表语法（`*` 或 `-`）
- ✅ 所有链接路径正确（相对于根目录）
- ✅ 所有链接的文件都存在
- ✅ 缩进正确（子项目使用 2 个空格缩进）

### 检查课程文件

随机打开几个课程文件，确认：

**验证要点**:
- ✅ 文件使用 UTF-8 编码
- ✅ 包含一级标题（`# 标题`）
- ✅ Markdown 语法正确
- ✅ 图片链接使用相对路径
- ✅ 代码块使用正确的语法高亮标记

---

## 🔗 链接有效性检查

### 内部链接检查

在 `SUMMARY.md` 中列出的每个链接：

1. 复制文件路径
2. 确认文件存在于仓库中
3. 打开文件验证内容正确

### 图片链接检查

在课程文件中搜索图片引用（`![`）：

1. 找到所有图片引用
2. 确认图片文件存在于 `resources/images/` 目录
3. 验证路径正确（相对路径）

**常见图片路径格式**:
```markdown
# 从 courses/chapter-01/lesson-01.md 引用图片
![示例](../../resources/images/example.png)

# 从 courses/chapter-01/README.md 引用图片
![示例](../../resources/images/example.png)

# 从根目录 README.md 引用图片
![示例](resources/images/example.png)
```

---

## 📦 Git 仓库检查

### 确认所有文件已提交

```bash
# 检查未提交的文件
git status

# 应该显示: nothing to commit, working tree clean
```

### 确认已推送到远程仓库

```bash
# 检查远程仓库状态
git remote -v

# 推送所有更改
git push origin main
```

### 确认分支名称

```bash
# 查看当前分支
git branch

# 确认主分支名称是 main 或 master
```

---

## ✅ 最终检查清单

在开始 GitBook 配置之前，确认以下所有项目：

### 文件结构
- [ ] 所有必需文件都存在
- [ ] 目录结构正确
- [ ] 文件命名规范（小写，使用连字符）

### 配置文件
- [ ] `.gitbook.yaml` 配置正确
- [ ] `SUMMARY.md` 格式正确
- [ ] `README.md` 内容完整

### 内容质量
- [ ] 至少有 2 个章节
- [ ] 每个章节至少有 2 个课程
- [ ] 所有课程内容完整
- [ ] Markdown 格式正确

### 链接和资源
- [ ] 所有内部链接有效
- [ ] 所有图片链接有效
- [ ] 图片文件大小合理（< 1MB）

### Git 仓库
- [ ] 所有文件已提交
- [ ] 已推送到 GitHub
- [ ] 仓库是公开的（或 GitBook 有访问权限）
- [ ] 确认主分支名称（main 或 master）

### GitHub 设置
- [ ] 仓库 Issues 功能已启用
- [ ] 仓库 Discussions 功能已启用（用于 Giscus）
- [ ] Issue 模板已配置

---

## 🚀 准备就绪！

如果以上所有检查项都已完成，您的仓库已准备好进行 GitBook 配置！

**下一步**: 
1. 打开 [GitBook 配置完整指南](GITBOOK_SETUP_GUIDE.md)
2. 或使用 [GitBook 快速参考](GITBOOK_QUICK_REFERENCE.md) 进行快速配置

---

## 🔧 常见问题修复

### 问题: SUMMARY.md 中的链接无效

**解决方案**:
```bash
# 检查文件是否存在
ls -la courses/chapter-01/lesson-01.md

# 如果文件不存在，创建它
touch courses/chapter-01/lesson-01.md
echo "# 课程标题" > courses/chapter-01/lesson-01.md
```

### 问题: 图片路径错误

**解决方案**:
1. 确认图片文件位置
2. 计算相对路径
3. 更新 Markdown 中的图片链接

**路径计算示例**:
```
当前文件: courses/chapter-01/lesson-01.md
图片位置: resources/images/example.png

相对路径: ../../resources/images/example.png
```

### 问题: Git 推送失败

**解决方案**:
```bash
# 拉取最新更改
git pull origin main

# 解决冲突（如果有）
# 然后重新推送
git push origin main
```

---

**准备好了吗？开始配置 GitBook！** 🎉
