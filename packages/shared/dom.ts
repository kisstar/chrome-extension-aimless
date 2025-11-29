/**
 * DOM related
 */

import { isString } from './type-is'

export const $: typeof document.querySelector
  = document.querySelector.bind(document)

export const $$: typeof document.querySelectorAll
  = document.querySelectorAll.bind(document)

/**
 * 向元素中追加内容
 * @param el 追加目标
 * @param content 追加的内容
 * @returns {void}
 */
export function appendContent<T extends Node>(
  el: HTMLElement,
  content: T | string,
) {
  const target = el

  if (isString(content)) {
    target.textContent = content
    return
  }

  target.appendChild(content)
}

/**
 * 创建元素并设置熟悉、插入内容
 * @param tagName 元素标签
 * @param properties 元素 properties
 * @param attributes 元素 attributes
 * @param content 插入的内容
 */
export function createEl<T extends keyof HTMLElementTagNameMap>(
  tagName: T,
  properties?: Record<string, string>,
  attributes?: Record<string, string>,
  content?: HTMLElement | string,
): HTMLElementTagNameMap[T] {
  const el = document.createElement<T>(tagName)

  if (properties) {
    Object.getOwnPropertyNames(properties).forEach(
      (propName) => {
        const val = properties[propName];

        (el as any)[propName] = val
      },
    )
  }
  if (attributes) {
    Object.getOwnPropertyNames(attributes).forEach(
      (attrName) => {
        el.setAttribute(attrName, attributes[attrName])
      },
    )
  }
  if (content) {
    appendContent(el, content)
  }

  return el
}

/**
 * 将指定的样式文本通过 style 添加到文档中
 * @param styleContent 样式内容
 * @returns {HTMLStyleElement} DOM Style element
 */
export function appendStyle(
  styleContent: string,
  options: Record<string, string> = {},
) {
  const styleEl = createEl('style', options)

  styleEl.type = 'text/css'
  styleEl.innerHTML = styleContent
  $('head')?.appendChild(styleEl)

  return styleEl
}
