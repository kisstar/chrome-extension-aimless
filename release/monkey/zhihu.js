// ==UserScript==
// @name         知乎
// @namespace    https://kisstar.xyz/
// @version      0.0.2
// @description  支持登录模态框隐藏。
// @author       Kisstar
// @match        https://www.zhihu.com/*
// @match        https://zhuanlan.zhihu.com/*
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
  document.querySelectorAll.bind(document);
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
    signModalSelector: '.signFlowModal .Modal-closeButton',
    styleClassName: 'ks-monkey-zhihu',
  };

  // 通过追加样式隐藏默认展示的登录模态框
  const styleContent$1 = `
  .Modal-wrapper {
    display: none;
  }
`.trim();
  /**
   * 隐藏登录模态框并移除对应的隐藏样式以便后续点击登录时正常展示
   * @returns {void}
   */
  function handleModal() {
    const signModalCloseBtn = $(config.signModalSelector);
    if (signModalCloseBtn) {
      signModalCloseBtn.click();
    }
    if ($(config.styleClassName)) {
      $('head').removeChild($(config.styleClassName));
    }
  }
  // main()
  appnedStyle(styleContent$1, { className: config.styleClassName });
  window.addEventListener('load', handleModal);

  // 通过追加样式隐藏图片广告
  const styleContent = `
  img[alt="广告"] {
    display: none;
  }
`.trim();
  // main()
  appnedStyle(styleContent, { className: config.styleClassName });
})();
