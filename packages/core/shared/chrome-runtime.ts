interface OpenOptionsPageOptions {
  url?: string;
}

export function openOptionsPage(options?: OpenOptionsPageOptions) {
  const url = options?.url ?? chrome.runtime.getURL('options.html');

  window.open(url);
}
