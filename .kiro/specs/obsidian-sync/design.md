# Design Document

## Overview

本系统设计一个 Node.js 脚本来实现 Obsidian 笔记到 VitePress 项目的自动化同步。系统包括三个主要功能模块：GitBook 清理模块、文档同步模块和图片迁移模块。

## Architecture

系统采用模块化设计，主要组件包括：

1. **Cleanup Module**: 负责识别和删除 GitBook 相关文件
2. **Document Sync Module**: 负责同步 Markdown 文档
3. **Image Migration Module**: 负责迁移图片并更新引用
4. **Configuration Manager**: 负责读取和管理配置
5. **File System Utilities**: 提供文件操作的通用功能

```
┌─────────────────────────────────────────┐
│         Main Sync Script                │
└─────────────────┬───────────────────────┘
                  │
        ┌─────────┼─────────┐
        │         │         │
        ▼         ▼         ▼
   ┌────────┐ ┌──────┐ ┌────────┐
   │Cleanup │ │ Doc  │ │ Image  │
   │ Module │ │ Sync │ │Migration│
   └────────┘ └──────┘ └────────┘
        │         │         │
        └─────────┼─────────┘
                  ▼
          ┌──────────────┐
          │ Config Mgr   │
          └──────────────┘
                  │
                  ▼
          ┌──────────────┐
          │ FS Utilities │
          └──────────────┘
```

## Components and Interfaces

### Configuration Manager

```javascript
interface SyncConfig {
  obsidianDir: string;           // D:\myobsidian\myobsidian\CS50
  attachmentDir: string;         // D:\myobsidian\myobsidian\附件
  targetDocsDir: string;         // docs/courses
  targetImagesDir: string;       // docs/public/images
  ignorePatterns: string[];      // 忽略的文件模式
  directoryMapping: Record<string, string>; // 目录映射规则
}

function loadConfig(): SyncConfig
function validateConfig(config: SyncConfig): boolean
```

### Cleanup Module

```javascript
interface CleanupResult {
  deletedFiles: string[];
  errors: string[];
}

function identifyGitbookFiles(docsDir: string): string[]
function cleanupGitbookFiles(files: string[]): CleanupResult
```

### Document Sync Module

```javascript
interface SyncResult {
  synced: string[];
  skipped: string[];
  errors: string[];
}

function scanMarkdownFiles(sourceDir: string): string[]
function shouldSync(sourceFile: string, targetFile: string): boolean
function syncDocument(sourcePath: string, targetPath: string): void
```

### Image Migration Module

```javascript
interface ImageReference {
  originalPath: string;
  fileName: string;
  newPath: string;
}

function extractImageReferences(content: string): ImageReference[]
function copyImage(sourcePath: string, targetPath: string): boolean
function updateImagePaths(content: string, references: ImageReference[]): string
```

## Data Models

### File Metadata

```javascript
interface FileMetadata {
  path: string;
  lastModified: Date;
  size: number;
  hash?: string;
}
```

### Sync Report

```javascript
interface SyncReport {
  timestamp: Date;
  cleanup: CleanupResult;
  documents: SyncResult;
  images: {
    copied: string[];
    skipped: string[];
    errors: string[];
  };
  summary: {
    totalFiles: number;
    successCount: number;
    errorCount: number;
  };
}
```

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

### Property 1: GitBook file deletion completeness

_For any_ directory containing GitBook configuration files, after cleanup execution, no GitBook files should remain in the directory. **Validates: Requirements 1.1**

### Property 2: Selective deletion accuracy

_For any_ directory containing both GitBook and non-GitBook files, cleanup should only delete GitBook files while preserving all other files. **Validates: Requirements 1.2, 1.3**

### Property 3: Deletion logging completeness

_For any_ set of deleted files, the cleanup result should contain the paths of all deleted files. **Validates: Requirements 1.4**

### Property 4: Markdown scanning completeness

_For any_ directory tree, scanning should return all files with .md extension. **Validates: Requirements 2.1**

### Property 5: Document sync preservation

_For any_ Markdown file in the source directory, after sync execution, an equivalent file should exist in the target directory. **Validates: Requirements 2.2**

### Property 6: Image reference extraction completeness

_For any_ Markdown document, parsing should extract all image references regardless of format ( or ). **Validates: Requirements 2.3, 3.1**

### Property 7: Path transformation consistency

_For any_ source path and directory mapping rules, the transformed target path should follow the mapping rules consistently. **Validates: Requirements 2.4**

### Property 8: Sync report accuracy

_For any_ sync operation, the reported file count should equal the actual number of files processed. **Validates: Requirements 2.5**

### Property 9: Image copy completeness

_For any_ image file that exists in the attachment directory, after migration, the image should exist in the target images directory. **Validates: Requirements 3.2**

### Property 10: Image path update correctness

_For any_ Markdown document with image references, after path update, all image paths should use the VitePress format (/images/filename). **Validates: Requirements 3.3**

### Property 11: Image copy idempotence

_For any_ image file, copying it multiple times should result in only one file in the target directory with the same content. **Validates: Requirements 3.4**

### Property 12: Missing image warning generation

_For any_ image reference where the source file doesn't exist, a warning should be recorded in the sync report. **Validates: Requirements 3.5**

### Property 13: Incremental sync efficiency

_For any_ unchanged file, running sync multiple times should not re-copy the file after the first sync. **Validates: Requirements 4.1**

### Property 14: Change detection accuracy

_For any_ file, if its content or modification time changes, it should be detected as modified. **Validates: Requirements 4.2**

### Property 15: Target file preservation on source deletion

_For any_ file that exists in the target directory, deleting the source file should not delete the target file. **Validates: Requirements 4.3**

### Property 16: Error isolation

_For any_ sync operation where one file fails, other files should continue to be processed successfully. **Validates: Requirements 4.5**

### Property 17: Configuration loading correctness

_For any_ valid configuration file, the system should load all specified settings correctly. **Validates: Requirements 5.1, 5.3**

### Property 18: Configuration override behavior

_For any_ custom configuration value, it should override the corresponding default value. **Validates: Requirements 5.3**

### Property 19: Invalid configuration fallback

_For any_ invalid configuration, the system should use default values and report the error. **Validates: Requirements 5.4**

### Property 20: Configuration reload behavior

_For any_ configuration change, the next execution should use the updated configuration values. **Validates: Requirements 5.5**

## Error Handling

### File System Errors

* **Permission Errors**: 当无法读取或写入文件时，记录错误并继续处理其他文件
* **Path Not Found**: 当源路径不存在时，使用默认配置或提示用户
* **Disk Space**: 在复制大量图片前检查磁盘空间

### Configuration Errors

* **Invalid Paths**: 验证所有配置的路径是否存在和可访问
* **Missing Config**: 使用合理的默认值
* **Malformed JSON**: 捕获解析错误并使用默认配置

### Content Processing Errors

* **Invalid Markdown**: 继续处理，但记录警告
* **Broken Image Links**: 记录警告但不中断同步
* **Encoding Issues**: 尝试多种编码方式读取文件

### Error Recovery Strategy

1. 所有错误都应该被捕获并记录
2. 单个文件的错误不应该中断整个同步过程
3. 提供详细的错误报告帮助用户诊断问题
4. 关键错误（如配置错误）应该在开始前验证

## Testing Strategy

### Unit Testing

使用 Jest 作为测试框架，重点测试：

* 配置加载和验证逻辑
* 文件路径转换函数
* 图片引用解析正则表达式
* Markdown 内容更新函数
* 特定的边界情况（空文件、特殊字符等）

### Property-Based Testing

使用 fast-check 库进行属性测试，每个测试运行至少 100 次迭代：

* 文件扫描的完整性
* 路径转换的一致性
* 图片复制的幂等性
* 增量同步的正确性
* 配置加载的健壮性

每个属性测试必须使用注释标记对应的设计文档属性：

```javascript
// Feature: obsidian-sync, Property 1: GitBook file deletion completeness
```

### Integration Testing

* 端到端测试完整的同步流程
* 使用临时目录模拟真实场景
* 验证文件系统的实际变化

### Test Data Generation

* 创建测试用的 Markdown 文件生成器
* 生成各种图片引用格式
* 模拟不同的目录结构

## Implementation Notes

### Technology Stack

* **Runtime**: Node.js (v18+)
* **Language**: JavaScript (ES modules)
* **Testing**: Jest + fast-check
* **File Operations**: Node.js fs/promises API
* **Path Handling**: Node.js path module

### Directory Structure

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
│       ├── cleanup.prop.test.js
│       ├── sync.prop.test.js
│       └── image.prop.test.js
├── sync-config.json        # 配置文件
└── package.json
```

### Configuration File Format

```json
{
  "obsidianDir": "D:\\myobsidian\\myobsidian\\CS50",
  "attachmentDir": "D:\\myobsidian\\myobsidian\\附件",
  "targetDocsDir": "docs/courses",
  "targetImagesDir": "docs/public/images",
  "ignorePatterns": [
    "*.tmp",
    ".obsidian",
    "node_modules"
  ],
  "directoryMapping": {
    "default": "chapter-{index}"
  }
}
```

### Image Path Transformation Rules

Obsidian 格式:

* `![[image.png]]`
* `![alt](../附件/image.png)`

VitePress 格式:

* `![alt](/images/image.png)`

### Execution Flow

1. 加载配置
2. 执行 GitBook 清理（仅首次或按需）
3. 扫描 Obsidian 目录
4. 对每个文档：
   * 检查是否需要同步
   * 解析图片引用
   * 复制所需图片
   * 更新图片路径
   * 复制文档到目标位置
5. 生成同步报告

### Performance Considerations

* 使用并发处理加速文件复制
* 缓存文件哈希避免重复计算
* 批量处理文件操作
* 对大文件使用流式处理
