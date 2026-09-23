import { access, readdir } from 'node:fs/promises'
import { resolve } from 'node:path'

const rootDir = resolve(import.meta.dirname, '..')
const userscriptDir = resolve(rootDir, 'monkey-scripts')

export async function discoverUserscripts() {
  const entries = await readdir(userscriptDir, { withFileTypes: true })
  const directories = entries
    .filter(entry => entry.isDirectory() && entry.name !== 'lib')
    .sort((left, right) => left.name.localeCompare(right.name))

  return Promise.all(directories.map(async ({ name }) => {
    const entry = resolve(userscriptDir, name, 'index.ts')
    const metadata = resolve(userscriptDir, name, 'manifests.ts')

    try {
      await Promise.all([access(entry), access(metadata)])
    }
    catch {
      throw new Error(
        `Userscript "${name}" must contain index.ts and manifests.ts`,
      )
    }

    return {
      name,
      entry,
      metadata,
      fileName: `${name}.user.js`,
    }
  }))
}
