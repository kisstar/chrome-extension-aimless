import { render } from '@/entrypoints/content/modules/json'

export default defineUnlistedScript(() => {
  const existedPreEl = document.body?.querySelector('body > pre')
  const existedContainer = document.body?.querySelector(
    'body > div.json-formatter-container',
  )

  if (existedPreEl && existedContainer) {
    render()
  }
})
