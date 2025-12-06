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
;
(function(){"use strict";const l=document.querySelector.bind(document),i=document.querySelectorAll.bind(document);function a(t,n,o,h){const c=document.createElement(t);return n&&Object.getOwnPropertyNames(n).forEach(r=>{const u=n[r];c[r]=u}),c}function s(t,n={}){const o=a("style",n);return o.type="text/css",o.innerHTML=t,l("head")?.appendChild(o),o}const e={signModalSelector:".passport-login-container",signTipSelector:"#csdn-toolbar-profile-nologin",showMoreBtnSelector:".hide-preCode-box .look-more-preCode",styleClassName:"ks-monkey-csdn",copyrightReg:/\s————————————————\s版权声明([\s\S])*/,copyEventSelector:"#content_views"},d=`
  ${e.signTipSelector} {
    display: none;
  }

  ${e.signModalSelector} {
    display: none;
  }
`.trim();s(d,{className:e.styleClassName});function y(){Array.from(i(e.showMoreBtnSelector)).forEach(t=>t.click())}y();const p=`
/* 代码块 */
html #content_views pre code {
  user-select: text;
}

/* 登录后复制 */
html .hljs-button.signin {
  display: none;
}
`.trim();function m(t){const n=document.getSelection();t.clipboardData?.setData("text/plain",n?.toString().replace(e.copyrightReg,"")||""),t.preventDefault()}s(p,{className:e.styleClassName}),l(e.copyEventSelector)?.addEventListener("copy",m),s(`/* 侧边栏广告（左） */
/* stylelint-disable-next-line selector-id-pattern */
#footerRightAds {
  display: none !important;
}
`,{className:e.styleClassName})})();
