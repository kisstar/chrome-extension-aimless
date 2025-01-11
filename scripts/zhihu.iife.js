// ==UserScript==
// @name         知乎
// @namespace    https://kisstar.github.io/
// @version      0.0.2
// @description  支持登录模态框隐藏。
// @author       Kisstar
// @match        https://www.zhihu.com/*
// @match        https://zhuanlan.zhihu.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @license      MIT License
// ==/UserScript==

(function(){"use strict";const l=document.querySelector.bind(document);document.querySelectorAll.bind(document);function i(n,e,t,o){const a=document.createElement(n);return e&&Object.getOwnPropertyNames(e).forEach(function(d){const m=e[d];a[d]=m}),a}function c(n,e={}){var o;const t=i("style",e);return t.type="text/css",t.innerHTML=n,(o=l("head"))==null||o.appendChild(t),t}const s={signModalSelector:".signFlowModal .Modal-closeButton",styleClassName:"ks-monkey-zhihu"},r=`
  .Modal-wrapper {
    display: none;
  }
`.trim();function u(){var t;const n=l(s.signModalSelector);n&&n.click();const e=l(s.styleClassName);e&&((t=l("head"))==null||t.removeChild(e))}c(r,{className:s.styleClassName}),window.addEventListener("load",u);const y=`
  img[alt="广告"] {
    display: none;
  }
`.trim();c(y,{className:s.styleClassName})})();
