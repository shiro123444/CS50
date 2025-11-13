# CS50 社团社区手册

欢迎来到CS50社团社区！这是一个使用mdBook构建的社区学习手册。

## 在线阅读

访问 [https://shiro123444.github.io/CS50/](https://shiro123444.github.io/CS50/) 在线阅读（部署后可用）

## 本地构建

### 安装mdBook

下载并安装mdBook：

```bash
# Linux/macOS
curl -sSL https://github.com/rust-lang/mdBook/releases/download/v0.4.40/mdbook-v0.4.40-x86_64-unknown-linux-gnu.tar.gz | tar -xz
sudo mv mdbook /usr/local/bin/

# 或使用cargo安装
cargo install mdbook
```

### 构建书籍

```bash
# 构建
mdbook build

# 本地预览（会自动打开浏览器）
mdbook serve
```

构建后的文件在`book/`目录下。

## 贡献内容

我们欢迎所有社团成员贡献内容！

1. Fork这个仓库
2. 在`src/`目录下编辑或添加Markdown文件
3. 在`src/SUMMARY.md`中添加新页面的链接
4. 提交Pull Request

## 项目结构

```
.
├── book.toml          # mdBook配置文件
├── src/               # 书籍源文件
│   ├── SUMMARY.md    # 目录结构
│   ├── introduction.md
│   ├── week0/        # Week 0内容
│   ├── week1/        # Week 1内容
│   └── ...
└── book/             # 构建输出（git忽略）
```

## 许可

本项目采用MIT许可证。

## 联系方式

- GitHub Issues: 报告问题或建议
- 社团群组: 加入我们的讨论群