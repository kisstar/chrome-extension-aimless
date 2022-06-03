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

interface VideoResult {
  player: IPlayer;
}

const useVideo = (videoConfig: VideoConfig = {}): VideoResult => {
  const setting = { ...config, ...videoConfig.config };
  const player = videoConfig.player || Player.getInstance();

  registerShortcuts(player, setting);

  return {
    player,
  };
};

export default useVideo;
