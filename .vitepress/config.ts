import { defineConfig } from 'vitepress'

const homepage = 'https://www.verybugs.com'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Better Monitor",
  description: "JS SDK used to report data to server for better website monitoring",
  base: '/better-monitor',
  head: [
    [
      'script',
      {
        src: '/better-monitor/better-monitor.min.js',
        'data-project-id': '1',
      }
    ],
  ],
  rewrites: {
    'README.md': 'index.md',
    'README_en.md': 'index_en.md',
    'CHANGELOG.md': 'changelog.md',
    'CONTRIBUTING.md': 'contributing.md',
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outlineTitle: '目录/Table of Content',
    outline: [2, 5],
    nav: [
      { text: '首页/Home', link: homepage },
      { text: '更新记录/Change log', link: '/changelog' },
      // { text: 'Contributing', link: '/contributing' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Yakima-Teng/better-monitor' }
    ]
  }
})
