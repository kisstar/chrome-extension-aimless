import { $ } from '../../../utils/dom';
import config from './config';
import type Player from './player';

function bindEvents(player: Player) {
  const { shortcutKey } = config;

  // 采用 keyup 事件则无法及时阻止浏览器的默认行为
  addEventListener('keydown', event => {
    const { activeElement } = document;

    // 只在播放器作为文档中当前获得焦点的元素时进行处理
    if (activeElement !== player.el()) {
      return;
    }

    switch (event.code) {
      case shortcutKey.playToggle:
        player.isPaused() ? player.play() : player.pause();
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
      case shortcutKey.fullscreen:
        player.fullscreen();
        event.preventDefault();
        break;
      case shortcutKey.muted:
        player.muted(!player.muted());
        event.preventDefault();
        break;
      default:
      // do nothing
    }
  });
}

export default bindEvents;
