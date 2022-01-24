import { KEY_CODE } from '../../../utils/keycode';

const config = {
  // 快捷键
  shortcutKey: {
    playToggle: KEY_CODE.SPACE,
    volumeUp: KEY_CODE.ARROW_UP,
    volumeDown: KEY_CODE.ARROW_DOWN,
    timeIncrease: KEY_CODE.ARROW_RIGHT,
    timeDecrease: KEY_CODE.ARROW_LEFT,
    muted: KEY_CODE.SHIFT_RIGHT,
    fullscreen: KEY_CODE.ENTER,
  },

  // 选项
  volumeStep: 0.1,
  timeStep: 5,
  rateStep: 0.25,
};

export type Config = typeof config;

export default config;
