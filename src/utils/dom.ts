import { isString } from './type-is';

/**
 * DOM related
 */

interface StyleOptions {
  className?: string;
}

export const $: typeof document.querySelector = document.querySelector.bind(document);

export const $$: typeof document.querySelectorAll = document.querySelectorAll.bind(document);

/**
 * 向元素中追加内容
 * @param el 追加目标
 * @param content 追加的内容
 * @returns {void}
 */
export function appendContent<T extends Node>(el: HTMLElement, content: T | string) {
  const target = el;

  if (isString(content)) {
    target.textContent = content;
    return;
  }

  target.appendChild(content);
}

/**
 * 创建元素并设置熟悉、插入内容
 * @param tagName 元素标签
 * @param properties 元素 properties
 * @param attributes 元素 attributes
 * @param content 插入的内容
 */
export function createEl<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  properties?: object,
  attributes?: object,
  content?: HTMLElement | string,
): HTMLElementTagNameMap[K];
export function createEl(
  tagName: string,
  properties?: object,
  attributes?: object,
  content?: HTMLElement | string,
): HTMLElement;
export function createEl(
  tagName: string,
  properties: object = {},
  attributes: object = {},
  content: HTMLElement | string = '',
) {
  const el = document.createElement(tagName);

  Object.getOwnPropertyNames(properties).forEach(function setProperty(propName) {
    const val = properties[propName];

    if (el[propName] !== val) {
      el[propName] = val;
    }
  });

  Object.getOwnPropertyNames(attributes).forEach(function setAttribute(attrName) {
    el.setAttribute(attrName, attributes[attrName]);
  });

  appendContent(el, content);

  return el;
}

/**
 * 将指定的样式文本通过 style 添加到文档中
 * @param styleContent 样式内容
 * @returns {HTMLStyleElement}
 */
export function appnedStyle(styleContent: string, options: StyleOptions = {}) {
  const styleEl = createEl('style', options);

  styleEl.type = 'text/css';
  styleEl.innerHTML = styleContent;
  $('head').appendChild(styleEl);

  return styleEl;
}
