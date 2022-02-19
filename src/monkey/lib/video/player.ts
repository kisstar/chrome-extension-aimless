import { $, isUndefined } from '../../../utils';

class Player {
  private static instance: Player | null;

  private constructor() {
    //
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Player();
    }

    return this.instance;
  }

  private get palyer(): HTMLVideoElement {
    return $('video');
  }

  el() {
    return this.palyer;
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

  muted(val?: boolean): boolean {
    if (isUndefined(val)) {
      return this.palyer.muted;
    }

    this.palyer.muted = val;

    return val;
  }

  playbackRate(val?: number): number {
    if (isUndefined(val)) {
      return this.palyer.playbackRate;
    }

    let playbackRate = val;

    if (val > 3) {
      playbackRate = 3;
    }
    if (val < 0.5) {
      playbackRate = 0.5;
    }

    this.palyer.playbackRate = playbackRate;

    return playbackRate;
  }

  volume(val?: number): number {
    if (isUndefined(val)) {
      return this.palyer.volume;
    }

    let volume = val;

    if (val > 1) {
      volume = 1;
    }
    if (val < 0) {
      volume = 0;
    }

    this.palyer.volume = volume;

    return volume;
  }

  duration() {
    return this.palyer.duration;
  }

  currentTime(val?: number): number {
    if (isUndefined(val)) {
      return this.palyer.currentTime;
    }

    let currentTime = val;

    if (val > this.duration()) {
      currentTime = this.duration();
    }
    if (val < 0) {
      currentTime = 0;
    }

    this.palyer.currentTime = currentTime;

    return currentTime;
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

export default Player;
