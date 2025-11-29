/**
 * @description 支持未登录复制
 */
import { $, appendStyle } from '@chrome-extension-aimless/shared'
import config from '../config'

const styleContent = `
/* 代码块 */
html #content_views pre code {
  user-select: text;
}

/* 登录后复制 */
html .hljs-button.signin {
  display: none;
}
`.trim()

function handleCopy(event: ClipboardEvent) {
  const selection = document.getSelection()

  event.clipboardData?.setData(
    'text/plain',
    selection?.toString().replace(config.copyrightReg, '') || '',
  )
  event.preventDefault()
}

// main
appendStyle(styleContent, { className: config.styleClassName })

$(config.copyEventSelector)?.addEventListener(
  'copy',
  handleCopy as EventListener,
)
