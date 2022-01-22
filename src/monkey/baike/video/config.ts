import { KEY_CODE } from '../../../utils/keycode';

const config = {
  // 选择器
  fullscreenButton: '.lark-fullscreen-button', // 播放器全屏按钮

  // 快捷键
  shortcutKey: {
    playToggle: KEY_CODE.space,
    volumeUp: KEY_CODE.up,
    volumeDown: KEY_CODE.down,
    timeIncrease: KEY_CODE.right,
    timeDecrease: KEY_CODE.left,
    muted: KEY_CODE.shiftRight,
    fullscreen: KEY_CODE.enter,
  },

  // 选项
  volumeStep: 0.1,
  timeStep: 5,
};

export default config;
