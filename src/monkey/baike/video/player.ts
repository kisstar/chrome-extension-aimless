import { $ } from '../../../utils/dom';
import logger from '../../../utils/log';

class Player {
  private static instance: Player | null;
  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new Player();
    }

    return this.instance;
  }

  private get palyer(): HTMLVideoElement {
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

  muted(val?: boolean) {
    if (typeof val === 'undefined') {
      return this.palyer.muted;
    }

    this.palyer.muted = val;
  }

  volume(val?: number) {
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

  currentTime(val?: number) {
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
}

export default Player;
