// ==UserScript==
// @name         dlink
// @namespace    https://kisstar.github.io/
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
;
(function(){"use strict";const l=document.querySelector.bind(document);document.querySelectorAll.bind(document);const i={csdn:"link.csdn.net",zhihu:"link.zhihu.com",juejin:"link.juejin.cn"},c=l("body"),a=Object.values(i);function d(){a.some(e=>window.location.href.includes(e))||!c||c.addEventListener("click",e=>{let t=e.target;for(;t!==c;){if(t.localName==="a"){const o=t.getAttribute("href");let n=o||"";n=n.replace(/https?:\/\/link.zhihu.com\/?\?target=/,""),n=n.replace(/https?:\/\/link\.juejin\.cn\/?\?target=/,""),n!==o&&(e.preventDefault(),window.open(decodeURIComponent(n)));break}t=t.parentElement}})}function s(){const r=[[i.csdn,"#apesar-loading"],[i.csdn,".link-page .loading-btn"],[i.zhihu,".wrapper .actions .button"],[i.juejin,".middle-page .content .btn"]];for(let e=0,t=r.length;e<t;e+=1){const[o,n]=r[e],u=l(n);if(window.location.href.includes(o)){if(u){u.click();break}setTimeout(s,500)}}}s(),d()})();
