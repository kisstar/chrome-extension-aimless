chrome.runtime.onMessage.addListener(function (msg) {
  if (msg.color) {
    document.body.style.backgroundColor = msg.color;
  }
});
