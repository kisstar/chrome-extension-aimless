import { allowWindowMessaging } from 'webext-bridge/content-script';
import { MESSAGE_NAMESPACE } from '@/constants';
// for json module
import '@/entrypoints/content/modules/json/index.scss';

export default defineContentScript({
  matches: ['*://*/*', '<all_urls>'],
  runAt: 'document_start',
  allFrames: true,
  async main() {
    allowWindowMessaging(MESSAGE_NAMESPACE);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await injectScript('/request-content.js', {});
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await injectScript('/json-content.js', {});
  }
});
