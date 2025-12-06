import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Chrome Extension Aimless',
  description: '针对 Chrome 浏览器编写的一些插件和油猴脚本。',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Extensions', link: '/chrome-extension' },
      { text: 'Scripts', link: '/monkey-scripts' },
    ],

    sidebar: {
      '/monkey-scripts/': {
        base: '/monkey-scripts/',
        items: [
          { text: '知乎', link: '/zhihu.md' },
          { text: 'CSDN', link: '/csdn.md' },
          { text: 'D Link', link: '/dlink.md' },
          { text: 'NetDisk', link: '/netdisk.md' },
        ],
      },
    },

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
