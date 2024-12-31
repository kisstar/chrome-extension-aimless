import { registerInterceptors } from '@/entrypoints/content/request-interceptor';

export default defineContentScript({
  matches: ['*://*/*', '<all_urls>'],
  runAt: 'document_start',
  world: 'MAIN',
  main() {
    registerInterceptors();
  }
});
