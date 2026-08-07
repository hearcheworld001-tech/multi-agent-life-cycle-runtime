import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Multi-Agent Life Cycle Runtime',
  description: '支持长期存在、恢复、学习与受控进化的多智能体生命运行时',
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '架构', link: '/guide/overview' },
      { text: '生命周期', link: '/guide/lifecycle' },
      { text: '记忆', link: '/guide/memory' }
    ],
    sidebar: [
      {
        text: '设计文档',
        items: [
          { text: '总体概览', link: '/guide/overview' },
          { text: 'Agent 生命周期', link: '/guide/lifecycle' },
          { text: 'Runtime 架构', link: '/guide/runtime' },
          { text: '记忆架构', link: '/guide/memory' },
          { text: '故障恢复与演化', link: '/guide/recovery-evolution' },
          { text: '多智能体协作', link: '/guide/society' },
          { text: '工程路线图', link: '/guide/roadmap' }
        ]
      }
    ],
    outline: 'deep',
    search: { provider: 'local' },
    footer: {
      message: 'Engine 提供生命环境，Agent 产生生命行为。',
      copyright: 'Copyright © 2026 Multi-Agent Life Cycle Runtime'
    }
  }
})
