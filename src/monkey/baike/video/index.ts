import Player from './player';
import bindEvents from './events';

const player = Player.getInstance();

bindEvents(player);
