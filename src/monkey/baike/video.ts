import useVideo from '../lib/video';
import registerShortcuts from './shortcut-key';

const { player } = useVideo();

registerShortcuts(player);
