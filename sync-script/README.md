# Obsidian to VitePress Sync Tool

自动同步 Obsidian 笔记到 VitePress 项目的工具。

## 功能

- 清理 GitBook 遗留配置和文档
- 自动同步 Markdown 文档
- 智能迁移图片并更新路径
- 增量同步（只同步变化的文件）
- 详细的同步报告

## 安装

```bash
cd sync-script
npm install
```

## 配置

编辑 `sync-config.json` 文件来配置同步路径：

```json
{
  "obsidianDir": "D:\\myobsidian\\myobsidian\\CS50",
  "attachmentDir": "D:\\myobsidian\\myobsidian\\附件",
  "targetDocsDir": "docs/courses",
  "targetImagesDir": "docs/public/images",
  "ignorePatterns": ["*.tmp", ".obsidian"],
  "directoryMapping": {
    "default": "chapter-{index}"
  }
}
```

## 使用

运行同步：

```bash
npm run sync
```

运行测试：

```bash
npm test
```

## 项目结构

```
sync-script/
├── src/
│   ├── cleanup.js          # GitBook 清理模块
│   ├── document-sync.js    # 文档同步模块
│   ├── image-migration.js  # 图片迁移模块
│   ├── config.js           # 配置管理
│   ├── fs-utils.js         # 文件系统工具
│   └── index.js            # 主入口
├── test/
│   ├── cleanup.test.js
│   ├── document-sync.test.js
│   ├── image-migration.test.js
│   ├── config.test.js
│   └── properties/         # 属性测试
├── sync-config.json        # 配置文件
└── package.json
```

## 开发

本项目使用 ES modules 和 Jest 进行测试。
