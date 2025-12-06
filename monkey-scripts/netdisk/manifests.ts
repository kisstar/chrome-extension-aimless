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
