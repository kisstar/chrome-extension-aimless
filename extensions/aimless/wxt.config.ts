import { dirname, resolve as stlResolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'wxt'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
function resolve(...paths: string[]) {
  return stlResolve(__dirname, '../../', ...paths)
}

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react', './modules/toolbox-assets.mjs'],
  outDir: resolve('.output'),
  manifest: {
    web_accessible_resources: [
      {
        resources: ['json-content.js'],
        matches: ['http://*/*', 'https://*/*'],
      },
    ],
    permissions: [
      'contextMenus',
      'scripting',
    ],
  },
})
