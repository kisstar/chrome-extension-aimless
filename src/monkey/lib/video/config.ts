import { KEY_CODE, COMBINED_KEY } from '../../../utils/keycode';

export const connector = '_';

const config = {
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

export type Config = typeof config;

export default config;
