import { readFileSync } from 'node:fs'
import { dirname, resolve as stlResolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'
import banner from '../plugins/vite-plugin-banner/index.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const resolve = (...paths) => stlResolve(__dirname, '../', ...paths)

// 是否开启监听
const isWatchMode = process.argv.includes('--watch')

// 模块打包配置
const monkeyScripts = ['csdn', 'dlink', 'zhihu', 'netdisk']
const libraries = monkeyScripts.map((name) => {
  return {
    entry: resolve(`monkey-scripts/${name}/index.ts`),
    name,
    formats: ['iife'],
    fileName: format => `${name}.${format}.js`,
  }
})

for (const lib of libraries) {
  const metaHeader = readFileSync(
    resolve(`monkey-scripts/${lib.name}/manifests.ts`),
    'utf-8',
  )

  // eslint-disable-next-line antfu/no-top-level-await
  await build({
    configFile: false,
    plugins: [
      banner({
        content: `${metaHeader};`,
      }),
    ],
    build: {
      watch: isWatchMode
        ? {
            include: ['monkey-scripts/**/*.ts'],
          }
        : null,
      emptyOutDir: false,
      lib: {
        ...lib,
      },
      outDir: resolve(`.output/docs/scripts`),
    },
  })
}
