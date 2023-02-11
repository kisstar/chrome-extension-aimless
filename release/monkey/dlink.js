// ==UserScript==
// @name         dlink
// @namespace    https://kisstar.xyz/
// @version      0.0.1
// @description  针对知乎、CSDN 和掘金等网站提供内部链接直接跳转的功能。
// @author       Kisstar
// @match        https://zhuanlan.zhihu.com/*
// @match        https://link.zhihu.com/*
// @match        https://blog.csdn.net/*/article/*
// @match        https://link.csdn.net/*
// @match        https://juejin.cn/post/*
// @match        https://link.juejin.cn/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @license      MIT License
// ==/UserScript==
!function(){"use strict";const l=document.querySelector.bind(document),e=(document.querySelectorAll.bind(document),{csdn:"link.csdn.net",zhihu:"link.zhihu.com",juejin:"link.juejin.cn"}),c=l("body"),n=Object.values(e);const a=()=>{var t=[[e.csdn,"#apesar-loading"],[e.csdn,".link-page .loading-btn"],[e.zhihu,".wrapper .actions .button"],[e.juejin,".middle-page .content .btn"]];for(let e=0,n=t.length;e<n;e+=1){var[i,c]=t[e];const o=l(c);if(window.location.href.includes(i)){if(o){o.click();break}setTimeout(a,500)}}};a(),n.some(e=>window.location.href.includes(e))||c.addEventListener("click",n=>{let t=n.target;for(;t!==c;){if("a"===t.localName){var i=t.getAttribute("href");let e=i;(e=(e=e.replace(/https?:\/\/link.zhihu.com\/?\?target=/,"")).replace(/https?:\/\/link\.juejin\.cn\/?\?target=/,""))!==i&&(n.preventDefault(),window.open(decodeURIComponent(e)));break}t=t.parentElement}})}();
