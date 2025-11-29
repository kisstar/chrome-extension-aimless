import fs from 'node:fs'
import { resolve } from 'node:path'

// Extends the config from `vite.config.ts`
let viteConfig

/**
 * Add banner comments to files
 *
 * @param pluginOptions - A comment content or An option
 */
export default function (pluginOptions) {
  // Get the plugin config

  // Handle files
  return {
    name: 'banner',
    apply: 'build',
    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig
    },
    async writeBundle(_, bundle) {
      for (const file of Object.entries(bundle)) {
        // Get the full path of file
        const root = viteConfig.root
        const outDir = viteConfig.build.outDir
        const fileName = file[0].endsWith('.js-lean')
          ? file[0].replace(/\.js-lean/, '.lean.js')
          : file[0]
        const filePath = resolve(root, outDir, fileName)

        let data = fs.readFileSync(filePath, {
          encoding: 'utf8',
        })
        const { content: setContent } = pluginOptions

        data = `${setContent}\n${data}`
        fs.writeFileSync(filePath, data)
      }
    },
  }
}
