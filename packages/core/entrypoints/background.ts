// see https://serversideup.net/open-source/webext-bridge/docs
import { onMessage } from 'webext-bridge/background';
import { storage as wxtStorage } from 'wxt/storage';
import { REQUEST_CONFIG_PERSIST_KEY } from '@/constants';
import { CEA_REQUEST_GET_CONFIG } from '@/constants';

export default defineBackground(() => {
  onMessage('', runAction);
  onMessage(CEA_REQUEST_GET_CONFIG, handleGetRequestConfig);

  async function runAction() {}

  async function handleGetRequestConfig() {
    try {
      const configStr = await wxtStorage.getItem<string>(
        REQUEST_CONFIG_PERSIST_KEY
      );

      return configStr;
    } catch (error) {
      console.error(
        'Error fetching request config from background script:',
        error
      );
    }
  }
});
