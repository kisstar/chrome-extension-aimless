// ==UserScript==
// @name         netdisk
// @namespace    https://kisstar.github.io/
// @version      0.0.1
// @description  针对网盘提供的一些便捷能力。
// @author       Kisstar
// @match        https://*.pan.baidu.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @license      MIT License
// ==/UserScript==

/**
 * @type {NetDiskConfig}
 */

window.__csa_ms_config = {
  netdisk: {
    shareLink: true,
  },
}
;
(function(){"use strict";const p={all:["trace","debug","info","warn","error","fatal"],trace:["trace","debug","info","warn","error","fatal"],debug:["debug","info","warn","error","fatal"],info:["info","warn","error","fatal"],warn:["warn","error","fatal"],error:["error","fatal"],fatal:["fatal"],off:[]},w={trace:console.log.bind(console),debug:console.debug.bind(console),info:console.info.bind(console),warn:console.warn.bind(console),error:console.error.bind(console),fatal:console.error.bind(console)};function S(t=new Date){const e=t.getFullYear(),r=String(t.getMonth()+1).padStart(2,"0"),a=String(t.getDate()).padStart(2,"0"),i=String(t.getHours()).padStart(2,"0"),c=String(t.getMinutes()).padStart(2,"0"),o=String(t.getSeconds()).padStart(2,"0");return`${e}-${r}-${a} ${i}:${c}:${o}`}function h(t={}){return function(e,r,...a){const{name:i="default",logApi:c=w}=t,o=c[e],n=p[r];!o||!n.includes(e)||(a.unshift("-"),i&&a.unshift(`[${i}]`),a.unshift(`[${e.toUpperCase()}]`),a.unshift(`[${S()}]`),o.call(console,...a))}}function s(t={}){const e=new Map,r=h(t);let a="off";function i(n){a=n}function c(){return a}const o={trace:(...n)=>r("trace",a,...n),debug:(...n)=>r("debug",a,...n),info:(...n)=>r("info",a,...n),warn:(...n)=>r("warn",a,...n),error:(...n)=>r("error",a,...n),fatal:(...n)=>r("fatal",a,...n),setLevel:i,getLevel:c,get(n="default",k){if(e.has(n))return e.get(n);const b=s({name:n,parent:this,...k||{}});return e.set(n,b),b},getAll(){return Array.from(e.values())},parent(){return t.parent}};return e.set("default",o),o}const m=s();function u(){return window.__csa_ms_config?.netdisk?.shareLink??!0}const d=m.get("netdisk");function f(t){const e=/(https:\/\/pan\.baidu\.com\/s\/[^\s?]+(?:\?pwd=\S+)?)/,r=t.match(e);return r?r[1]:null}let l=null;async function g(){l&&clearTimeout(l),l=setTimeout(async()=>{try{const t=await navigator.clipboard.readText(),e=f(t);e&&e!==t&&await navigator.clipboard.writeText(e)}catch(t){d.error("无法访问剪贴板: ",t)}},300)}function L(){document.addEventListener("copy",t=>{if(!u())return;const e=window.getSelection()?.toString();if(e){const r=f(e);if(r){t.preventDefault(),t.clipboardData?.setData("text/plain",r),d.debug("通过复制事件清理链接:",r);return}}g()}),window.addEventListener("focus",()=>{u()&&g()})}L()})();
