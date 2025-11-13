# GitHub Pages 部署方案

## 为什么选择 GitHub Pages？

相比 GitBook 官方托管，GitHub Pages 有以下优势：

- ✅ **完全支持自定义 JavaScript** - Giscus 评论系统可以正常工作
- ✅ **完全免费** - 无任何限制
- ✅ **自动部署** - 推送代码即自动构建和发布
- ✅ **自定义域名** - 免费 HTTPS
- ✅ **更快的加载速度** - GitHub CDN
- ✅ **完全控制** - 可以自定义任何功能

## 推荐方案对比

### 方案 1：VitePress（推荐）

**优点**：
- 🚀 极快的构建和加载速度
- 🎨 现代化的 UI 设计
- 📝 完美的 Markdown 支持
- 🔧 配置简单
- 💡 Vue 3 驱动，可扩展性强

**适合**：技术文档、课程内容、知识库

### 方案 2：Docusaurus

**优点**：
- 📚 专为文档设计
- 🌍 强大的国际化支持
- 🔍 内置搜索功能
- 📱 优秀的移动端体验
- ⚛️ React 驱动

**适合**：大型文档项目、多语言文档

### 方案 3：MkDocs Material

**优点**：
- 🎨 Material Design 风格
- 🐍 Python 生态
- 📖 专注于文档
- 🔌 丰富的插件

**适合**：Python 项目文档、技术文档

## 推荐：VitePress

考虑到你的项目特点（CS50 课程学习平台），我推荐使用 **VitePress**。

### 为什么选择 VitePress？

1. **极快的速度** - 基于 Vite，开发和构建都很快
2. **简单易用** - 配置简单，上手快
3. **现代化** - UI 美观，用户体验好
4. **完美支持 Giscus** - 可以轻松集成评论系统
5. **中文支持好** - 官方文档有中文版

## 快速开始

### 步骤 1：初始化 VitePress 项目

在你的项目根目录运行：

```bash
# 安装 VitePress
npm install -D vitepress

# 初始化配置
npx vitepress init
```

初始化时的选项：
- **Where should VitePress initialize the config?** → `./docs`
- **Site title** → `CS50 学习平台`
- **Site description** → `CS50 课程学习和讨论平台`
- **Theme** → `Default Theme`
- **Use TypeScript for config?** → `No`
- **Add VitePress npm scripts?** → `Yes`

### 步骤 2：调整项目结构

将现有内容移动到 `docs` 目录：

```bash
# 创建 docs 目录
mkdir docs

# 移动课程内容
mv courses docs/
mv resources docs/

# 移动配置文件
mv README.md docs/index.md
```

### 步骤 3：配置 VitePress

创建 `docs/.vitepress/config.js`：

```javascript
export default {
  title: 'CS50 学习平台',
  description: 'CS50 课程学习和讨论平台',
  lang: 'zh-CN',
  
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '课程', link: '/courses/' },
      { text: 'GitHub', link: 'https://github.com/shiro123444/CS50' }
    ],
    
    sidebar: [
      {
        text: 'Week 0: Scratch',
        items: [
          { text: 'CS50 课程介绍', link: '/courses/chapter-01/lesson-01' },
          { text: 'Scratch 编程基础', link: '/courses/chapter-01/lesson-02' }
        ]
      },
      {
        text: 'Week 1: C 语言',
        items: [
          { text: '从 Scratch 到 C', link: '/courses/chapter-02/lesson-01' },
          { text: 'C 语言基础语法', link: '/courses/chapter-02/lesson-02' }
        ]
      }
    ],
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/shiro123444/CS50' }
    ],
    
    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2025 CS50 学习社区'
    },
    
    // 搜索
    search: {
      provider: 'local'
    }
  }
}
```

### 步骤 4：集成 Giscus 评论

创建 `docs/.vitepress/theme/index.js`：

```javascript
import DefaultTheme from 'vitepress/theme'
import Giscus from './components/Giscus.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Giscus', Giscus)
  }
}
```

创建 `docs/.vitepress/theme/components/Giscus.vue`：

```vue
<template>
  <div class="giscus-container">
    <h2>💬 讨论区</h2>
    <p>欢迎在下方分享你的学习心得、提出问题或参与讨论！</p>
    <div ref="giscusContainer"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const giscusContainer = ref(null)

onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', 'shiro123444/CS50')
  script.setAttribute('data-repo-id', 'R_kgDOQUrlZw')
  script.setAttribute('data-category', 'Announcements')
  script.setAttribute('data-category-id', 'DIC_kwDOQUrlZ84CxvUa')
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'bottom')
  script.setAttribute('data-theme', 'preferred_color_scheme')
  script.setAttribute('data-lang', 'zh-CN')
  script.setAttribute('crossorigin', 'anonymous')
  script.async = true
  
  giscusContainer.value.appendChild(script)
})
</script>

<style scoped>
.giscus-container {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
}

.giscus-container h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.giscus-container p {
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
}
</style>
```

### 步骤 5：在课程页面中使用 Giscus

在每个课程 Markdown 文件底部添加：

```markdown
---

<Giscus />
```

### 步骤 6：配置 GitHub Actions 自动部署

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - master

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build with VitePress
        run: npm run docs:build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 步骤 7：启用 GitHub Pages

1. 进入仓库 Settings → Pages
2. Source 选择 **GitHub Actions**
3. 保存

### 步骤 8：更新 package.json

添加脚本命令：

```json
{
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  },
  "devDependencies": {
    "vitepress": "^1.0.0"
  }
}
```

### 步骤 9：本地测试

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev
```

访问 http://localhost:5173 查看效果。

### 步骤 10：部署

```bash
# 提交所有更改
git add .
git commit -m "迁移到 VitePress + GitHub Pages"
git push origin master
```

GitHub Actions 会自动构建和部署，几分钟后你的网站就会在以下地址可用：

**https://shiro123444.github.io/CS50/**

## 完整的项目结构

```
CS50/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 配置
├── docs/
│   ├── .vitepress/
│   │   ├── config.js           # VitePress 配置
│   │   └── theme/
│   │       ├── index.js        # 主题配置
│   │       ├── components/
│   │       │   └── Giscus.vue  # Giscus 组件
│   │       └── custom.css      # 自定义样式
│   ├── courses/
│   │   ├── chapter-01/
│   │   │   ├── README.md
│   │   │   ├── lesson-01.md
│   │   │   └── lesson-02.md
│   │   └── chapter-02/
│   │       ├── README.md
│   │       ├── lesson-01.md
│   │       └── lesson-02.md
│   ├── resources/
│   │   └── images/
│   └── index.md                # 首页
├── package.json
└── README.md
```

## 优势总结

使用 VitePress + GitHub Pages 方案：

- ✅ **Giscus 评论完美工作** - 不再有 JavaScript 限制
- ✅ **完全免费** - GitHub Pages 免费托管
- ✅ **自动部署** - 推送即发布
- ✅ **更快的速度** - Vite 构建，加载飞快
- ✅ **更好的 SEO** - 静态 HTML，搜索引擎友好
- ✅ **完全控制** - 可以自定义任何功能
- ✅ **现代化 UI** - 美观的界面设计
- ✅ **内置搜索** - 无需第三方服务

## 下一步

我可以帮你：

1. **创建完整的 VitePress 配置**
2. **迁移现有内容到新结构**
3. **设置 GitHub Actions 自动部署**
4. **集成 Giscus 评论组件**
5. **测试和优化**

需要我现在开始实施吗？
