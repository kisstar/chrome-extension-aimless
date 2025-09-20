function createCallback() {
  if (chrome.runtime.lastError) {
    console.log('Got expected error: ' + chrome.runtime.lastError.message);
  }
}

function createContextMenu() {
  chrome.contextMenus.create(
    {
      id: 'toolbox',
      title: '工具箱',
      contexts: ['page']
    },
    createCallback
  );
  chrome.contextMenus.create(
    {
      id: 'toolbox_json',
      parentId: 'toolbox',
      title: 'JSON 工具'
    },
    createCallback
  );
  chrome.contextMenus.create(
    {
      id: 'toolbox_url',
      parentId: 'toolbox',
      title: 'URL 解析'
    },
    createCallback
  );
}

function onContextMenuClicked(info: chrome.contextMenus.OnClickData) {
  switch (info.menuItemId) {
    case 'toolbox_json':
      chrome.tabs.create({
        url: chrome.runtime.getURL('options.html#/normal-tool/json')
      });
      break;
    case 'toolbox_url':
      chrome.tabs.create({
        url: chrome.runtime.getURL('options.html#/normal-tool/url')
      });
      break;
  }
}

function registerContextMenu() {
  chrome.runtime.onInstalled.addListener(createContextMenu);
  chrome.contextMenus.onClicked.addListener(onContextMenuClicked);
}

export { registerContextMenu };
