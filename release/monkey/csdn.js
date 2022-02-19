// ==UserScript==
// @name         CSDN
// @namespace    https://kisstar.xyz/
// @version      0.0.1
// @description  支持未登录复制。
// @author       Kisstar
// @match        https://blog.csdn.net/*/article/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @license      MIT License
// ==/UserScript==

(function () {
  'use strict';

  function is(className = 'Object') {
    return function typeChecker(value) {
      const type = `[object ${className}]`;
      return Object.prototype.toString.call(value) === type;
    };
  }
  const isString = is('String');

  /**
   * DOM related
   */
  const $ = document.querySelector.bind(document);
  /**
   * 向元素中追加内容
   * @param el 追加目标
   * @param content 追加的内容
   * @returns {void}
   */
  function appendContent(el, content) {
    const target = el;
    if (isString(content)) {
      target.textContent = content;
      return;
    }
    target.appendChild(content);
  }
  function createEl(tagName, properties = {}, attributes = {}, content = '') {
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
  function appnedStyle(styleContent, options = {}) {
    const styleEl = createEl('style', options);
    styleEl.type = 'text/css';
    styleEl.innerHTML = styleContent;
    $('head').appendChild(styleEl);
    return styleEl;
  }

  const config = {
    copyrightReg: /\s————————————————\s版权声明(.|\s)*/,
  };

  const styleContent = `
/* 代码块 */
html #content_views pre code {
  user-select: text;
}

/* 登录后复制 */
html .hljs-button.signin {
  display: none;
}
`.trim();
  function handleCopy(event) {
    const selection = document.getSelection();
    event.clipboardData.setData(
      'text/plain',
      selection.toString().replace(config.copyrightReg, ''),
    );
    event.preventDefault();
  }
  // main
  appnedStyle(styleContent);
  window.addEventListener('copy', handleCopy);
})();
