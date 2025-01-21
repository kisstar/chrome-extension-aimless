import { allowWindowMessaging } from 'webext-bridge/content-script';
import { MESSAGE_NAMESPACE } from '@/constants';

export default defineContentScript({
  matches: ['*://*/*', '<all_urls>'],
  runAt: 'document_start',
  allFrames: true,
  async main() {
    allowWindowMessaging(MESSAGE_NAMESPACE);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await injectScript('/request-content.js', {});
  }
});
