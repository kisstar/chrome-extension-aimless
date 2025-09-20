import { resolve as stlResolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'wxt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const resolve = (...paths: string[]) =>
  stlResolve(__dirname, '../../', ...paths);

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  outDir: resolve('.output'),
  manifest: {
    web_accessible_resources: [
      {
        resources: ['*'],
        matches: ['*://*/*', '<all_urls>']
      }
    ],
    permissions: [
      // 右键菜单
      'contextMenus',
      // 本地存储
      'storage',
      'unlimitedStorage',
      // 脚本注入
      'scripting',
      'activeTab'
    ]
  }
});
