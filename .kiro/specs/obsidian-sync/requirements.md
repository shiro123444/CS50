# Requirements Document

## Introduction

本系统旨在实现从 Obsidian 笔记到 VitePress 项目的自动化同步，包括文档内容和图片资源的迁移，同时清理遗留的 GitBook 配置。

## Glossary

- **Obsidian**: 本地 Markdown 笔记应用
- **VitePress**: 基于 Vue 的静态站点生成器
- **Source Directory**: Obsidian 笔记目录 (D:\myobsidian\myobsidian\CS50)
- **Target Directory**: VitePress 课程目录 (docs/courses)
- **Attachment Directory**: Obsidian 附件目录 (D:\myobsidian\myobsidian\附件)
- **Image Directory**: VitePress 图片目录 (docs/public/images)
- **Sync System**: 文档和图片同步系统

## Requirements

### Requirement 1

**User Story:** 作为开发者，我希望清理所有 GitBook 相关配置和文档，以便项目只保留 VitePress 相关内容。

#### Acceptance Criteria

1. WHEN 系统执行清理操作 THEN Sync System SHALL 删除所有 GitBook 配置文件
2. WHEN 系统扫描 docs 目录 THEN Sync System SHALL 识别并删除所有 GitBook 教程文档
3. WHEN 清理完成 THEN Sync System SHALL 保留所有 VitePress 配置和用户课程内容
4. WHEN 删除文件 THEN Sync System SHALL 记录所有被删除的文件路径

### Requirement 2

**User Story:** 作为开发者，我希望自动同步 Obsidian 笔记到 VitePress 项目，以便无需手动复制文档。

#### Acceptance Criteria

1. WHEN 系统读取 Source Directory THEN Sync System SHALL 扫描所有 Markdown 文件
2. WHEN 发现新文档或更新的文档 THEN Sync System SHALL 复制到 Target Directory
3. WHEN 文档包含图片引用 THEN Sync System SHALL 解析所有图片路径
4. WHEN 目录结构不同 THEN Sync System SHALL 根据映射规则转换目录结构
5. WHEN 同步完成 THEN Sync System SHALL 报告同步的文件数量和状态

### Requirement 3

**User Story:** 作为开发者，我希望自动迁移 Obsidian 附件中的图片到 VitePress 图片目录，以便文档中的图片正确显示。

#### Acceptance Criteria

1. WHEN 解析文档中的图片引用 THEN Sync System SHALL 提取所有图片文件名
2. WHEN 图片存在于 Attachment Directory THEN Sync System SHALL 复制到 Image Directory
3. WHEN 复制图片 THEN Sync System SHALL 更新文档中的图片路径为 VitePress 格式
4. WHEN 图片已存在于目标目录 THEN Sync System SHALL 跳过重复复制
5. WHEN 图片不存在于源目录 THEN Sync System SHALL 记录警告信息

### Requirement 4

**User Story:** 作为开发者，我希望同步脚本可以重复执行，以便每次更新笔记后都能同步。

#### Acceptance Criteria

1. WHEN 脚本执行多次 THEN Sync System SHALL 仅同步有变化的文件
2. WHEN 检测文件变化 THEN Sync System SHALL 比较文件修改时间或内容哈希
3. WHEN 源文件被删除 THEN Sync System SHALL 保留目标文件不删除
4. WHEN 脚本执行 THEN Sync System SHALL 提供详细的同步日志
5. WHEN 发生错误 THEN Sync System SHALL 继续处理其他文件并报告错误

### Requirement 5

**User Story:** 作为开发者，我希望有一个配置文件来管理同步规则，以便灵活调整同步行为。

#### Acceptance Criteria

1. WHEN 系统启动 THEN Sync System SHALL 读取配置文件中的路径映射
2. WHEN 配置文件不存在 THEN Sync System SHALL 使用默认配置
3. WHERE 配置文件存在 THEN Sync System SHALL 允许自定义源目录、目标目录和忽略规则
4. WHEN 配置无效 THEN Sync System SHALL 报告错误并使用默认值
5. WHEN 用户修改配置 THEN Sync System SHALL 在下次执行时应用新配置
