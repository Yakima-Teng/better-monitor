import { defineConfig } from 'vitepress'

const homepage = 'https://www.verybugs.com'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "SDK使用说明",
  description: "SDK使用说明",
  base: '/better-monitor',
  head: [
    [
      'script',
      {
        src: '/better-monitor/better-monitor.min.js',
        'data-project-id': '22',
      }
    ],
    [
      'script',
      {},
      `var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?19ded09de8a8d5f9e3405ed5f6aab365";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();`
    ]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outlineTitle: 'Table of Content',
    outline: [2, 6],
    nav: [
      { text: 'Home', link: homepage },
      { text: 'Change log', link: '/changelog' },
      { text: 'Contributing', link: '/contributing' },
    ],

    sidebar: [
      {
        text: '基础使用',
        items: [
          { text: 'SDK使用说明', link: '/install' },
          { text: 'API文档', link: '/api' },
        ]
      },
      {
        text: '其他说明',
        items: [
          { text: 'Typescript支持', link: '/typescript-support' },
          { text: '功能特性', link: '/feature' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Yakima-Teng/better-monitor' }
    ]
  }
})
