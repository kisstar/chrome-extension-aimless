import config from './config';
import Player from './player';
import registerShortcuts from './shortcut-key';
import type IPlayer from './player';
import type { Config } from './config';

export type IConfig = Partial<Config>;

export interface VideoConfig {
  player?: IPlayer;
  config?: IConfig;
}

const useVideo = (videoConfig: VideoConfig = {}) => {
  const setting = Object.assign({}, config, videoConfig.config);
  const player = videoConfig.player || Player.getInstance();

  registerShortcuts(player, setting);
};

export default useVideo;
