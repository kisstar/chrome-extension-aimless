// 百度网盘提供了外链创建的功能，同时会将创建的结果写入剪切板，默认情况下结果中除了链接本身之外还会包含一些文案
// 所以，直接将结果粘贴到浏览器地址栏中无法直接使用，需要手动删除其中的文案部分
// 由于这个过程比繁琐，所以写这个脚本自动将结果中的文案部分去掉，并将处理后的内容写回到剪切板
// 示例：链接:https://pan.baidu.com/s/19BMOctghxJv_7NbYAhbczw?pwd=rq3a 提取码:rq3a 复制这段内容后打开百度网盘手机App，操作更方便哦
// 转换后：https://pan.baidu.com/s/19BMOctghxJv_7NbYAhbczw?pwd=rq3a

import { logger as defaultLogger } from '@lib-stack/logger'
import { shouldAdjustShareLink } from '../config'

const logger = defaultLogger.get('netdisk')

/**
 * 清理百度网盘链接中的文案部分
 * @param text 原始文本
 * @returns 清理后的纯链接
 */
function cleanBaiduNetdiskLink(text: string): string | null {
  // 匹配百度网盘链接格式：https://pan.baidu.com/s/xxxxx?pwd=xxxx
  const baiduLinkRegex = /(https:\/\/pan\.baidu\.com\/s\/[^\s?]+(?:\?pwd=\S+)?)/
  const match = text.match(baiduLinkRegex)

  return match ? match[1] : null
}

// 防抖定时器
let clipboardTimer: number | null = null

/**
 * 延迟清理剪贴板内容
 */
async function debouncedClipboardClean() {
  if (clipboardTimer) {
    clearTimeout(clipboardTimer)
  }

  clipboardTimer = setTimeout(async () => {
    try {
      // 使用 Clipboard API 读取剪贴板内容
      const text = await navigator.clipboard.readText()
      // 检查是否包含百度网盘链接
      const cleanedLink = cleanBaiduNetdiskLink(text)

      if (cleanedLink && cleanedLink !== text) {
        // 将清理后的链接写入剪贴板
        await navigator.clipboard.writeText(cleanedLink)
      }
    }
    catch (err) {
      // 无剪贴板权限时，这通常是正常现象
      logger.error('无法访问剪贴板: ', err)
    }
  }, 300) // 300ms延迟，减少不必要的剪贴板访问
}

function adjustShareLink() {
  // 主要方案：监听复制事件
  document.addEventListener('copy', (event) => {
    if (!shouldAdjustShareLink()) {
      return
    }

    // 获取选中的文本
    const selection = window.getSelection()?.toString()

    if (selection) {
      const cleanedLink = cleanBaiduNetdiskLink(selection)

      if (cleanedLink) {
        event.preventDefault()
        event.clipboardData?.setData('text/plain', cleanedLink)
        logger.debug('通过复制事件清理链接:', cleanedLink)
        return
      }
    }

    // 如果复制事件中没有选中文本，可能是通过API写入的，延迟检查剪贴板
    debouncedClipboardClean()
  })

  // 补充方案：监听页面焦点变化（用户可能从其他页面复制后切回）
  window.addEventListener('focus', () => {
    if (!shouldAdjustShareLink()) {
      return
    }

    debouncedClipboardClean()
  })
}

export { adjustShareLink }
