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
;
(function(){"use strict";const l=document.querySelector.bind(document);document.querySelectorAll.bind(document);function d(t,e,n,y){const a=document.createElement(t);return e&&Object.getOwnPropertyNames(e).forEach(c=>{const u=e[c];a[c]=u}),a}function o(t,e={}){const n=d("style",e);return n.type="text/css",n.innerHTML=t,l("head")?.appendChild(n),n}const s={signModalSelector:".signFlowModal .Modal-closeButton",styleClassName:"ks-monkey-zhihu"},i=`
  .Modal-wrapper {
    display: none;
  }
`.trim();function r(){const t=l(s.signModalSelector);t&&t.click();const e=l(s.styleClassName);e&&l("head")?.removeChild(e)}o(i,{className:s.styleClassName}),window.addEventListener("load",r);const m=`
  img[alt="广告"] {
    display: none;
  }
`.trim();o(m,{className:s.styleClassName})})();
