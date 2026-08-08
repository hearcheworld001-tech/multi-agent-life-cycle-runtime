import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Multi-Agent Life Cycle Runtime',
  tagline: '多智能体生命运行时设计文档',
  favicon: 'img/favicon.ico',
  url: 'https://multi-agent-life-cycle-runtime.pages.dev',
  baseUrl: '/',
  organizationName: 'hearcheworld001-tech',
  projectName: 'multi-agent-life-cycle-runtime',
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          path: 'content/docs',
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/hearcheworld001-tech/multi-agent-life-cycle-runtime/tree/master/website/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: false,
          includeCurrentVersion: true,
          lastVersion: 'current',
          versions: {
            current: {label: '最新设计', path: ''},
            '1.0': {label: '1.0（冻结）', path: '1.0'},
          },
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Agent Life Runtime',
      items: [
        {type: 'docSidebar', sidebarId: 'designSidebar', position: 'left', label: '设计文档'},
        {type: 'docsVersionDropdown', position: 'left', dropdownActiveClassDisabled: true},
        {href: 'https://gitee.com/he-lizi_admin/multi-agent-life-cycle-runtime', label: 'Gitee', position: 'right'},
        {href: 'https://github.com/hearcheworld001-tech/multi-agent-life-cycle-runtime', label: 'GitHub', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            {label: '总体概览', to: '/guide/overview'},
            {label: '核心契约', to: '/guide/contracts'},
            {label: '版本说明', to: '/'},
          ],
        },
        {
          title: '仓库',
          items: [
            {label: 'Gitee（主仓库）', href: 'https://gitee.com/he-lizi_admin/multi-agent-life-cycle-runtime'},
            {label: 'GitHub（镜像）', href: 'https://github.com/hearcheworld001-tech/multi-agent-life-cycle-runtime'},
          ],
        },
      ],
      copyright: `Copyright ${new Date().getFullYear()} Multi-Agent Life Cycle Runtime.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
