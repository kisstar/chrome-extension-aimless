import { readFileSync } from 'node:fs'
import { dirname, resolve as stlResolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'
import banner from '../plugins/vite-plugin-banner/index.mjs'
import { discoverUserscripts } from './discover-userscripts.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const resolve = (...paths) => stlResolve(__dirname, '../', ...paths)

// 是否开启监听
const isWatchMode = process.argv.includes('--watch')

async function buildUserscripts() {
  const userscripts = await discoverUserscripts()

  for (const userscript of userscripts) {
    const metaHeader = readFileSync(userscript.metadata, 'utf-8')

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
          entry: userscript.entry,
          name: userscript.name,
          formats: ['iife'],
          fileName: () => userscript.fileName,
        },
        outDir: resolve(`.output/docs/scripts`),
      },
    })
  }
}

buildUserscripts()
