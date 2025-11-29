import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Chrome Extension Aimless',
  description: '针对 Chrome 浏览器编写的一些插件和油猴脚本。',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: 'Monkey Scripts', link: '/monkey-scripts' }],

    sidebar: [
      {
        text: 'Monkey Scripts',
        items: [
          { text: '知乎', link: '/monkey-scripts/zhihu.md' },
          { text: 'CSDN', link: '/monkey-scripts/csdn.md' },
          { text: 'D Link', link: '/monkey-scripts/dlink.md' },
        ],
      },
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/kisstar/chrome-extension-aimless',
      },
    ],

    footer: {
      message: 'Developed by Kisstar & Powered by VitePress.',
      copyright: 'Copyright © 2025-present Kisstar',
    },
  },
  // 编译配置
  base: '/chrome-extension-aimless/',
  outDir: '../../../.output/docs',
})
