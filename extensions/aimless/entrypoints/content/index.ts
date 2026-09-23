// for json module
import '@/entrypoints/content/modules/json/index.scss'

export default defineContentScript({
  matches: ['http://*/*', 'https://*/*'],
  runAt: 'document_start',
  async main() {
    await injectScript('/json-content.js' as any)
  },
})
