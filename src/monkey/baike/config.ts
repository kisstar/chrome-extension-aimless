import { COMBINED_KEY, KEY_CODE } from '../../utils';
import { connector } from '../lib/video/config';

const config = {
  shortcutKey: {
    focus: `${COMBINED_KEY.CTRLKEY}${connector}${KEY_CODE.KEY_V}`,
  },
};

export default config;
