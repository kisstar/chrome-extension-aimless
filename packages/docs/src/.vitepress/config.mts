import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Chrome Extension Aimless',
  description: '针对 Chrome 浏览器编写的一些插件和油猴脚本。',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: 'Monkey Scripts', link: '/monkey-scripts' }],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kisstar/knives' }
    ],

    footer: {
      message: 'Developed by Kisstar & Powered by VitePress.',
      copyright: 'Copyright © 2023-present Kisstar'
    }
  }
});
