// ==UserScript==
// @name         CSDN
// @namespace    https://kisstar.github.io/
// @version      0.0.3
// @description  支持未登录复制。
// @author       Kisstar
// @match        https://blog.csdn.net/*/article/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @license      MIT License
// ==/UserScript==

(function(){"use strict";var r;const c=document.querySelector.bind(document),d=document.querySelectorAll.bind(document);function y(n,e,o,l){const a=document.createElement(n);return e&&Object.getOwnPropertyNames(e).forEach(function(i){const h=e[i];a[i]=h}),a}function s(n,e={}){var l;const o=y("style",e);return o.type="text/css",o.innerHTML=n,(l=c("head"))==null||l.appendChild(o),o}const t={signModalSelector:".passport-login-container",signTipSelector:"#csdn-toolbar-profile-nologin",showMoreBtnSelector:".hide-preCode-box .look-more-preCode",styleClassName:"ks-monkey-csdn",copyrightReg:/\s————————————————\s版权声明(.|\s)*/,copyEventSelector:"#content_views"},p=`
  ${t.signTipSelector} {
    display: none;
  }

  ${t.signModalSelector} {
    display: none;
  }
`.trim();s(p,{className:t.styleClassName});function m(){Array.from(d(t.showMoreBtnSelector)).forEach(n=>n.click())}m();const u=`
/* 代码块 */
html #content_views pre code {
  user-select: text;
}

/* 登录后复制 */
html .hljs-button.signin {
  display: none;
}
`.trim();function g(n){var o;const e=document.getSelection();(o=n.clipboardData)==null||o.setData("text/plain",(e==null?void 0:e.toString().replace(t.copyrightReg,""))||""),n.preventDefault()}s(u,{className:t.styleClassName}),(r=c(t.copyEventSelector))==null||r.addEventListener("copy",g),s(`/* 侧边栏广告（左） */
/* stylelint-disable-next-line selector-id-pattern */
#footerRightAds {
  display: none !important;
}
`,{className:t.styleClassName})})();
