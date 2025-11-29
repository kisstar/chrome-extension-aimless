# 上下文菜单

使用 chrome.contextMenus API 可向 Google Chrome 的上下文菜单添加项。您可以选择上下文菜单添加项所适用的对象类型，例如图片、超链接和网页。

## 权限

要使用 chrome.contextMenus API，您需要在扩展的 manifest.json 文件中声明 "contextMenus" 权限。

```json
{
  "manifest_version": 3,
  "permissions": ["contextMenus"],
  "background": {
    "service_worker": "background.js"
  }
}
```

## 注册上下文菜单

要注册上下文菜单，请在 background.js 文件中调用 chrome.contextMenus.create() 方法。该方法接受一个包含上下文菜单选项的对象作为参数。

```javascript
chrome.contextMenus.create({
  id: 'toolbox',
  title: '工具箱',
  contexts: ['page']
})
```

## 处理上下文菜单点击事件

要处理上下文菜单点击事件，请调用 chrome.contextMenus.onClicked.addListener() 方法。该方法接受一个回调函数作为参数，该函数会在用户点击上下文菜单项时被调用。

```javascript
chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === 'toolbox') {
    chrome.tabs.create({
      url: chrome.runtime.getURL('options.html#/normal-tool/json')
    })
  }
})
```

## 子级上下文菜单

您可以使用 parentId 属性为上下文菜单添加子级菜单项。子级菜单项将显示在其父级菜单项下。

```javascript
chrome.contextMenus.create({
  id: 'toolbox_json',
  parentId: 'toolbox',
  title: 'JSON 工具'
})
```

## 更多信息

- [chrome.contextMenus API 文档](https://developer.chrome.com/docs/extensions/reference/contextMenus/)
