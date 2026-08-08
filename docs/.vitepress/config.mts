import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Multi-Agent Life Cycle Runtime',
  description: '支持长期存在、可靠恢复、经验积累与受控演化的多智能体生命运行时设计',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#176b55' }]
  ],
  themeConfig: {
    siteTitle: 'Agent Life Runtime',
    nav: [
      { text: '首页', link: '/' },
      { text: '设计', link: '/guide/overview' },
      { text: '契约', link: '/guide/contracts' },
      { text: '路线图', link: '/guide/roadmap' },
      {
        text: '仓库',
        items: [
          { text: 'Gitee（主仓库）', link: 'https://gitee.com/he-lizi_admin/multi-agent-life-cycle-runtime' },
          { text: 'GitHub（镜像）', link: 'https://github.com/hearcheworld001-tech/multi-agent-life-cycle-runtime' }
        ]
      }
    ],
    sidebar: [
      {
        text: '从这里开始',
        items: [
          { text: '总体概览', link: '/guide/overview' },
          { text: '术语表', link: '/guide/glossary' }
        ]
      },
      {
        text: '核心设计',
        items: [
          { text: 'Agent 生命周期', link: '/guide/lifecycle' },
          { text: 'Runtime 架构', link: '/guide/runtime' },
          { text: '记忆架构', link: '/guide/memory' },
          { text: '故障恢复与演化', link: '/guide/recovery-evolution' },
          { text: '多智能体协作', link: '/guide/society' }
        ]
      },
      {
        text: '工程落地',
        items: [
          { text: '核心契约', link: '/guide/contracts' },
          { text: '工程路线图', link: '/guide/roadmap' },
          { text: '发布与运维', link: '/guide/operations' },
          { text: '常见问题', link: '/guide/faq' }
        ]
      }
    ],
    outline: {
      level: [2, 4],
      label: '本页内容'
    },
    search: { provider: 'local' },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    lastUpdated: {
      text: '最后更新'
    },
    footer: {
      message: 'Engine 提供生命环境，Agent 产生生命行为。',
      copyright: 'Copyright © 2026 Multi-Agent Life Cycle Runtime'
    }
  }
})
