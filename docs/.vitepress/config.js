export default {
  title: 'CS50 学习平台',
  description: 'CS50 课程学习和讨论平台',
  lang: 'zh-CN',
  base: '/CS50/',
  
  // 忽略死链检查（用于文档中的示例链接）
  ignoreDeadLinks: [
    /^http:\/\/localhost/,
    /\.\.\/\.\.\/\.github\/ISSUE_GUIDE/,
    /\.\.\/chapter-03\/README/
  ],
  
  head: [
    ['link', { rel: 'icon', href: '/CS50/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],
  
  themeConfig: {
    logo: '/logo.png',
    
    nav: [
      { text: '首页', link: '/' },
      { text: '课程', link: '/courses/' },
      { 
        text: '资源', 
        items: [
          { text: '学习资源', link: '/resources/' },
          { text: 'GitBook 配置', link: '/resources/GITBOOK_SETUP_GUIDE' },
          { text: 'GitHub Pages 配置', link: '/resources/GITHUB_PAGES_SETUP' }
        ]
      },
      { text: 'GitHub', link: 'https://github.com/shiro123444/CS50' }
    ],
    
    sidebar: {
      '/courses/': [
        {
          text: 'Week 0: Scratch - 计算思维入门',
          collapsed: false,
          items: [
            { text: '章节概览', link: '/courses/chapter-01/' },
            { text: 'CS50 课程介绍', link: '/courses/chapter-01/lesson-01' },
            { text: 'Scratch 编程基础', link: '/courses/chapter-01/lesson-02' }
          ]
        },
        {
          text: 'Week 1: C 语言基础',
          collapsed: false,
          items: [
            { text: '章节概览', link: '/courses/chapter-02/' },
            { text: '从 Scratch 到 C', link: '/courses/chapter-02/lesson-01' },
            { text: 'C 语言基础语法', link: '/courses/chapter-02/lesson-02' }
          ]
        }
      ],
      '/resources/': [
        {
          text: '配置指南',
          items: [
            { text: 'GitHub Pages 配置', link: '/resources/GITHUB_PAGES_SETUP' },
            { text: 'GitHub Actions 部署', link: '/resources/GITHUB_ACTIONS_SETUP' },
            { text: '启用 GitHub Pages', link: '/resources/ENABLE_GITHUB_PAGES' },
            { text: '部署测试清单', link: '/resources/DEPLOYMENT_TEST_CHECKLIST' },
            { text: 'GitBook 配置', link: '/resources/GITBOOK_SETUP_GUIDE' },
            { text: 'Giscus 配置', link: '/resources/GISCUS_SETUP' },
            { text: '启用 Discussions', link: '/resources/ENABLE_DISCUSSIONS' }
          ]
        }
      ]
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/shiro123444/CS50' }
    ],
    
    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2025 CS50 学习社区'
    },
    
    // 本地搜索
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    },
    
    // 编辑链接
    editLink: {
      pattern: 'https://github.com/shiro123444/CS50/edit/master/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    
    // 最后更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },
    
    // 文档页脚
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    
    // 大纲配置
    outline: {
      level: [2, 3],
      label: '页面导航'
    },
    
    // 返回顶部
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  },
  
  // Markdown 配置
  markdown: {
    lineNumbers: true,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  }
}
