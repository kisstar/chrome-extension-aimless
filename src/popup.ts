import * as $ from 'jquery';

const queryInfo = {
  active: true,
  currentWindow: true,
};

$(function () {
  let currentColor = '#FF0000';

  $('#colorSelector').on('change', function setCurrentColor(event) {
    currentColor = (event as JQuery.ChangeEvent<HTMLInputElement>).target.value;
  });

  $('#changeBackground').on('click', function changeColor() {
    chrome.tabs.query(queryInfo, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        color: currentColor,
      });
    });
  });
});
