import { $, COMBINED_KEY, KEY_CODE } from '@utils';
import { connector } from '../lib/video/config';
import config from './config';
import type Player from '../lib/video/player';

// 是否是组合按键，使用时 Ctrl 键需要在组合键（如：Ctrl+x+y）按完后再释放
let combinationKey = false;

function registerShortcuts(player: Player) {
  window.addEventListener('keydown', event => {
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
        if (combinationKey && player.el()) {
          if ($('#suggestion')) {
            // 隐藏输入框的建议列表
            $<HTMLElement>('#suggestion').style.display = 'none';
          }
          player.el().focus();
        }
        event.preventDefault();
        break;
      default:
    }

    combinationKey = false;
  });
}

export default registerShortcuts;
