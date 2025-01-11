import { registerEvents } from '@/entrypoints/content/message';

export default defineContentScript({
  matches: ['*://*/*', '<all_urls>'],
  runAt: 'document_start',
  allFrames: true,
  main() {
    registerEvents();
  }
});
