import { access, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

async function verifyExtensionArtifacts() {
  const rootDir = resolve(import.meta.dirname, '..')
  const targets = ['chrome-mv3', 'firefox-mv2']

  for (const target of targets) {
    const outputDir = resolve(rootDir, '.output', target)
    await access(resolve(outputDir, 'toolbox/index.html'))

    const manifest = JSON.parse(
      await readFile(resolve(outputDir, 'manifest.json'), 'utf8'),
    )

    if (!manifest.background) {
      throw new Error(`${target}: manifest is missing a background entry`)
    }

    const expectedPermissions = ['contextMenus', 'scripting']
    if (JSON.stringify(manifest.permissions) !== JSON.stringify(expectedPermissions)) {
      throw new Error(`${target}: unexpected permissions ${manifest.permissions}`)
    }

    const [contentScript] = manifest.content_scripts ?? []
    if (JSON.stringify(contentScript?.matches) !== JSON.stringify(['http://*/*', 'https://*/*'])) {
      throw new Error(`${target}: content script has unexpected matches`)
    }
    if (contentScript.all_frames) {
      throw new Error(`${target}: content script must only run in the top frame`)
    }

    const resources = manifest.web_accessible_resources ?? []
    const resourceNames = resources.flatMap(resource =>
      typeof resource === 'string' ? [resource] : resource.resources,
    )
    if (JSON.stringify(resourceNames) !== JSON.stringify(['json-content.js'])) {
      throw new Error(`${target}: unexpected web-accessible resources ${resourceNames}`)
    }
  }
}

verifyExtensionArtifacts()
