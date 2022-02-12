// ==UserScript==
// @name         知乎
// @namespace    https://kisstar.xyz/
// @version      0.0.1
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

  /**
   * DOM related
   */
  const $ = document.querySelector.bind(document);
  const createEl = document.createElement.bind(document);

  const config = {
    signModalSelector: '.signFlowModal .Modal-closeButton',
  };

  // 动态创建的 Style 标签元素
  let styleEl = null;
  /**
   * 通过 style 标签追加样式隐藏默认展示的登录模态框
   * @returns {HTMLStyleElement}
   */
  function addModalStyle() {
    const styleText = `
  .Modal-wrapper {
    display: none;
  }
`.trim();
    const styleEl = createEl('style');
    styleEl.type = 'text/css';
    styleEl.innerHTML = styleText;
    $('head').appendChild(styleEl);
    return styleEl;
  }
  /**
   * 隐藏登录模态框并移除对应的隐藏样式以便后续点击登录时正常展示
   * @returns {void}
   */
  function handleModal() {
    const signModalCloseBtn = $(config.signModalSelector);
    signModalCloseBtn && signModalCloseBtn.click();
    styleEl && $('head').removeChild(styleEl);
  }
  // main()
  styleEl = addModalStyle();
  addEventListener('load', handleModal);
})();
