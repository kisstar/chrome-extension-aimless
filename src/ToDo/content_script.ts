chrome.runtime.onMessage.addListener(function handleMessage(msg) {
  if (msg.color) {
    document.body.style.backgroundColor = msg.color;
  }
});
