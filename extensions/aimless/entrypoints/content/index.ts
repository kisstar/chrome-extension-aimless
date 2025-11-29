// for json module
import '@/entrypoints/content/modules/json/index.scss'

export default defineContentScript({
  matches: ['*://*/*', '<all_urls>'],
  runAt: 'document_start',
  allFrames: true,
  async main() {
    await injectScript('/json-content.js' as any)
  },
})
