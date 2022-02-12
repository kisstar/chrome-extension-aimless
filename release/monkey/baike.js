// ==UserScript==
// @name         百度百科
// @namespace    https://kisstar.xyz/
// @version      0.0.1
// @description  支持视频播放器的快捷操作。
// @author       Kisstar
// @match        https://baike.baidu.com/item/*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @license      MIT License
// ==/UserScript==

(function () {
  'use strict';

  /**
   * Simple map of keyboard codes.
   * See: https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/code
   */
  const KEY_CODE = {
    TAB: 'Tab',
    SPACE: 'Space',
    ENTER: 'Enter',
    SHIFT_LEFT: 'ShiftLeft',
    SHIFT_RIGHT: 'ShiftRight',
    ARROW_UP: 'ArrowUp',
    ARROW_RIGHT: 'ArrowRight',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    KEY_K: 'KeyK',
    KEY_V: 'KeyV',
  };
  const COMBINED_KEY = {
    SHIFTKEY: 'SHIFTKEY',
    CTRLKEY: 'CTRLKEY',
  };

  const connector = '_';
  const config$1 = {
    // 快捷键
    shortcutKey: {
      playToggle: KEY_CODE.SPACE,
      volumeUp: KEY_CODE.ARROW_UP,
      volumeDown: KEY_CODE.ARROW_DOWN,
      timeIncrease: KEY_CODE.ARROW_RIGHT,
      timeDecrease: KEY_CODE.ARROW_LEFT,
      rateUp: `${COMBINED_KEY.SHIFTKEY}${connector}${KEY_CODE.ARROW_UP}`,
      rateDown: `${COMBINED_KEY.SHIFTKEY}${connector}${KEY_CODE.ARROW_DOWN}`,
      muted: KEY_CODE.SHIFT_RIGHT,
      fullscreen: KEY_CODE.ENTER,
    },
    // 选项
    volumeStep: 0.1,
    timeStep: 5,
    rateStep: 0.25,
  };

  /**
   * DOM related
   */
  const $ = document.querySelector.bind(document);
  document.createElement.bind(document);

  // log, debug, warn, error
  const logger = console;

  class Player {
    constructor() {}
    static getInstance() {
      if (!this.instance) {
        this.instance = new Player();
      }
      return this.instance;
    }
    get palyer() {
      if ($('video')) {
        return $('video');
      } else {
        logger.error('获取播放器失败');
      }
    }
    el() {
      // 如果播放器元素不存在则静默处理
      return $('video');
    }
    isPaused() {
      return this.palyer.paused;
    }
    play() {
      if (this.isPaused()) {
        this.palyer.play();
      }
    }
    pause() {
      if (!this.isPaused()) {
        this.palyer.pause();
      }
    }
    muted(val) {
      if (typeof val === 'undefined') {
        return this.palyer.muted;
      }
      this.palyer.muted = val;
    }
    playbackRate(val) {
      if (typeof val === 'undefined') {
        return this.palyer.playbackRate;
      }
      if (val > 3) {
        val = 3;
      }
      if (val < 0.5) {
        val = 0.5;
      }
      this.palyer.playbackRate = val;
    }
    volume(val) {
      if (typeof val === 'undefined') {
        return this.palyer.volume;
      }
      if (val > 1) {
        val = 1;
      }
      if (val < 0) {
        val = 0;
      }
      this.palyer.volume = val;
    }
    duration() {
      return this.palyer.duration;
    }
    currentTime(val) {
      if (typeof val === 'undefined') {
        return this.palyer.currentTime;
      }
      if (val > this.duration()) {
        val = this.duration();
      }
      if (val < 0) {
        val = 0;
      }
      this.palyer.currentTime = val;
    }
    fullscreen() {
      const { fullscreenElement } = document;
      if (fullscreenElement) {
        document.exitFullscreen();
      } else {
        this.palyer.requestFullscreen();
      }
    }
  }

  function registerShortcuts$1(player, config) {
    const { shortcutKey } = config;
    // 采用 keyup 事件则无法及时阻止浏览器的默认行为
    addEventListener('keydown', event => {
      const { activeElement } = document;
      const { shiftKey } = event;
      // 只在播放器作为文档中当前获得焦点的元素时进行处理
      if (activeElement !== player.el()) {
        return;
      }
      const shiftList = [KEY_CODE.SHIFT_LEFT, KEY_CODE.SHIFT_RIGHT];
      const prefix = shiftKey && !shiftList.includes(event.code) ? COMBINED_KEY.SHIFTKEY : '';
      const code = `${prefix ? prefix + connector : ''}${event.code}`;
      switch (code) {
        case shortcutKey.playToggle:
          player.isPaused() ? player.play() : player.pause();
          event.preventDefault();
          break;
        case shortcutKey.muted:
          player.muted(!player.muted());
          event.preventDefault();
          break;
        case shortcutKey.volumeUp:
          player.volume(player.volume() + config.volumeStep);
          event.preventDefault();
          break;
        case shortcutKey.volumeDown:
          player.volume(player.volume() - config.volumeStep);
          event.preventDefault();
          break;
        case shortcutKey.timeDecrease:
          player.currentTime(player.currentTime() - config.timeStep);
          event.preventDefault();
          break;
        case shortcutKey.timeIncrease:
          player.currentTime(player.currentTime() + config.timeStep);
          event.preventDefault();
          break;
        case shortcutKey.rateUp:
          player.playbackRate(player.playbackRate() + config.rateStep);
          event.preventDefault();
          break;
        case shortcutKey.rateDown:
          player.playbackRate(player.playbackRate() - config.rateStep);
          event.preventDefault();
          break;
        case shortcutKey.fullscreen:
          player.fullscreen();
          event.preventDefault();
          break;
        // do nothing
      }
    });
  }

  const useVideo = (videoConfig = {}) => {
    const setting = Object.assign({}, config$1, videoConfig.config);
    const player = videoConfig.player || Player.getInstance();
    registerShortcuts$1(player, setting);
    return {
      player,
    };
  };

  const config = {
    shortcutKey: {
      focus: `${COMBINED_KEY.CTRLKEY}${connector}${KEY_CODE.KEY_V}`,
    },
  };

  function registerShortcuts(player) {
    addEventListener('keydown', event => {
      const { code, ctrlKey } = event;
      if (ctrlKey && code === KEY_CODE.KEY_K) {
        return;
      }
      const { shortcutKey } = config;
      const prefix = ctrlKey ? COMBINED_KEY.CTRLKEY : '';
      const combinationCode = `${prefix ? prefix + connector : ''}${event.code}`;
      switch (combinationCode) {
        case shortcutKey.focus:
          player.el() && player.el().focus();
          event.preventDefault();
          break;
      }
    });
  }

  const { player } = useVideo();
  registerShortcuts(player);
})();
