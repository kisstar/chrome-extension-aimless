// see https://serversideup.net/open-source/webext-bridge/docs
import { onMessage } from 'webext-bridge/background';

export default defineBackground(() => {
  onMessage('', runAction);

  async function runAction() {}
});
