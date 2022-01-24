import type Player from './player';
import type { Config } from './config';

function bindEvents(player: Player, config: Config) {
  const { shortcutKey } = config;

  // 采用 keyup 事件则无法及时阻止浏览器的默认行为
  addEventListener('keydown', event => {
    const { activeElement } = document;
    const { shiftKey } = event;

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
        shiftKey
          ? player.volume(player.volume() + config.volumeStep)
          : player.playbackRate(player.playbackRate() + config.rateStep);
        event.preventDefault();
        break;
      case shortcutKey.volumeDown:
        shiftKey
          ? player.volume(player.volume() - config.volumeStep)
          : player.playbackRate(player.playbackRate() - config.rateStep);
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
