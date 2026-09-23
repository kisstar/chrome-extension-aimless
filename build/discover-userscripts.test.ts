import { describe, expect, it } from 'vitest'
import { discoverUserscripts } from './discover-userscripts.mjs'

describe('discoverUserscripts', () => {
  it('discovers every userscript directory and assigns a .user.js output', async () => {
    const scripts = await discoverUserscripts()

    expect(scripts.map(script => script.name)).toEqual([
      'csdn',
      'dlink',
      'netdisk',
      'zhihu',
    ])
    expect(scripts.map(script => script.fileName)).toEqual([
      'csdn.user.js',
      'dlink.user.js',
      'netdisk.user.js',
      'zhihu.user.js',
    ])
  })
})
