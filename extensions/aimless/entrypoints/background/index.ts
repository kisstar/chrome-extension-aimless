import { registerContextMenu } from '@/entrypoints/background/context-menu'

export default defineBackground(() => {
  registerContextMenu()
})
