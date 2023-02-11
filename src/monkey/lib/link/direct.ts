import { $ } from '@utils';
import { ignoreMap } from './config';

const bodyEl = $('body');
const ignoreLinkArr = Object.values(ignoreMap);

export const autoOpenDirectLink = () => {
  const isIgnore = ignoreLinkArr.some(site => window.location.href.includes(site));

  if (isIgnore) {
    return;
  }

  bodyEl.addEventListener('click', e => {
    let target = e.target as HTMLElement;

    while (target !== bodyEl) {
      if (target.localName === 'a') {
        let url = target.getAttribute('href');

        if (url) {
          e.preventDefault();

          // 知乎
          url = url.replace('https://link.zhihu.com/?target=', '');
          // 掘金
          url = url.replace('https://link.juejin.cn/?target=', '');

          window.open(decodeURIComponent(url));
        }

        break;
      }

      target = target.parentElement;
    }
  });
};

export const autoClickLinkButton = () => {
  const selectorArr = [
    // CSDN
    [ignoreMap.csdn, '#apesar-loading'],
    [ignoreMap.csdn, '.link-page .loading-btn'],
    // 知乎
    [ignoreMap.zhihu, '.wrapper .actions .button'],
    // 掘金
    [ignoreMap.juejin, '.middle-page .content .btn'],
  ];

  for (let i = 0, len = selectorArr.length; i < len; i += 1) {
    const [site, selector] = selectorArr[i];
    const aEl = $<HTMLElement>(selector);

    if (window.location.href.includes(site) && aEl) {
      aEl.click();
      break;
    }
  }
};
