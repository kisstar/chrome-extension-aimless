import { dirname, resolve as stlResolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
function resolve(...paths: string[]) {
  return stlResolve(__dirname, '../../', ...paths)
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/toolbox/',
  build: {
    outDir: resolve('.output/chrome-mv3/toolbox'),
  },
})
