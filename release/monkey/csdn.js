// ==UserScript==
// @name         CSDN
// @namespace    https://kisstar.xyz/
// @version      0.0.3
// @description  支持未登录复制。
// @author       Kisstar
// @match        https://blog.csdn.net/*/article/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @license      MIT License
// ==/UserScript==
!function(){"use strict";n="String";const r=function(e){var t=`[object ${n}]`;return Object.prototype.toString.call(e)===t};var n;const o=document.querySelector.bind(document),e=document.querySelectorAll.bind(document);function c(e,n={},t={},o=""){const c=document.createElement(e);Object.getOwnPropertyNames(n).forEach(function(e){var t=n[e];c[e]!==t&&(c[e]=t)}),Object.getOwnPropertyNames(t).forEach(function(e){c.setAttribute(e,t[e])});{const s=e=c;r(o)?s.textContent=o:s.appendChild(o)}return c}function t(e,t={}){const n=c("style",t);n.type="text/css",n.innerHTML=e,o("head").appendChild(n),n}const s={signModalSelector:".passport-login-container",signTipSelector:"#csdn-toolbar-profile-nologin",showMoreBtnSelector:".hide-preCode-box .look-more-preCode",styleClassName:"ks-monkey-csdn",copyrightReg:/\s————————————————\s版权声明(.|\s)*/,copyEventSelector:"#content_views"};t(`
  ${s.signTipSelector} {
    display: none;
  }

  ${s.signModalSelector} {
    display: none;
  }
`.trim(),{className:s.styleClassName}),Array.from(e(s.showMoreBtnSelector)).forEach(e=>e.click()),t(`
/* 代码块 */
html #content_views pre code {
  user-select: text;
}

/* 登录后复制 */
html .hljs-button.signin {
  display: none;
}
`.trim(),{className:s.styleClassName}),o(s.copyEventSelector)&&o(s.copyEventSelector).addEventListener("copy",function(e){const t=document.getSelection();e.clipboardData.setData("text/plain",t.toString().replace(s.copyrightReg,"")),e.preventDefault()});t("/* 侧边栏广告（左） */\n#footerRightAds {\n  display: none !important;\n}\n",{className:s.styleClassName})}();
