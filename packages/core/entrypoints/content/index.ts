export default defineContentScript({
  matches: ['*://*/*', '<all_urls>'],
  runAt: 'document_start',
  allFrames: true,
  async main() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await injectScript('/request-content.js', {
      keepInDom: true
    });
  }
});
