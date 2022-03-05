// ==UserScript==
// @name         CSDN
// @namespace    https://kisstar.xyz/
// @version      0.0.2
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
  const $$ = document.querySelectorAll.bind(document);
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
    signModalSelector: '.passport-login-container',
    signTipSelector: '#csdn-toolbar-profile-nologin',
    showMoreBtnSelector: '.hide-preCode-box .look-more-preCode',
    styleClassName: 'ks-monkey-csdn',
    copyrightReg: /\s————————————————\s版权声明(.|\s)*/,
  };

  /**
   * @description 隐藏登录提示和登陆模态框
   */
  // 通过追加样式隐藏默认展示的登录模态框
  const styleContent$1 = `
  ${config.signTipSelector} {
    display: none;
  }

  ${config.signModalSelector} {
    display: none;
  }
`.trim();
  // main()
  appnedStyle(styleContent$1, { className: config.styleClassName });

  /**
   * @description
   */
  function showMore() {
    Array.from($$(config.showMoreBtnSelector)).forEach(item => item.click());
  }
  // // main()
  showMore();

  /**
   * @deprecated 支持未登录复制
   */
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
  appnedStyle(styleContent, { className: config.styleClassName });
  window.addEventListener('copy', handleCopy);
})();
