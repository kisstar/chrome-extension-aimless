import { COMBINED_KEY, KEY_CODE } from '../../utils';
import { connector } from '../lib/video/config';
import config from './config';
import type Player from '../lib/video/player';

// 是否是组合按键
let combinationKey = false;

function registerShortcuts(player: Player) {
  addEventListener('keydown', event => {
    const { code, ctrlKey } = event;

    if (ctrlKey && code === KEY_CODE.KEY_K) {
      combinationKey = true;
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
      default:
    }

    combinationKey = false;
  });
}

export default registerShortcuts;
