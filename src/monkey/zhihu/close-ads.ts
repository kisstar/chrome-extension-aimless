import { appnedStyle } from '@utils';
import config from './config';

// 通过追加样式隐藏图片广告
const styleContent = `
  img[alt="广告"] {
    display: none;
  }
`.trim();

// main()
appnedStyle(styleContent, { className: config.styleClassName });
