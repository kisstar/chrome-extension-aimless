import type Player from './player';
import { Config, connector } from './config';
import { COMBINED_KEY, KEY_CODE } from '../../../utils';

function registerShortcuts(player: Player, config: Config) {
  const { shortcutKey } = config;

  // 采用 keyup 事件则无法及时阻止浏览器的默认行为
  window.addEventListener('keydown', event => {
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
        if (player.isPaused()) {
          player.play();
        } else {
          player.pause();
        }
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
      default:
      // do nothing
    }
  });
}

export default registerShortcuts;
