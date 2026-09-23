import { resolve } from 'node:path'
import { build } from 'vite'
import { addPublicAssets, defineWxtModule } from 'wxt/modules'

const toolboxDir = resolve(import.meta.dirname, '../../../apps/toolbox')
const toolboxOutputDir = resolve(toolboxDir, 'dist')

export default defineWxtModule((wxt) => {
  if (wxt.config.command === 'build') {
    wxt.hooks.hook('build:before', async () => {
      await build({ root: toolboxDir })
    })
  }

  addPublicAssets(wxt, toolboxOutputDir)

  wxt.hooks.hook('build:publicAssets', (_, files) => {
    for (const file of files) {
      if ('absoluteSrc' in file && file.absoluteSrc.startsWith(toolboxOutputDir)) {
        file.relativeDest = `toolbox/${file.relativeDest}`
      }
    }
  })
})
