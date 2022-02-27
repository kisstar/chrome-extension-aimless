/**
 * @description 隐藏登录提示和登陆模态框
 */

import { appnedStyle } from '../../utils';
import config from './config';

// 通过追加样式隐藏默认展示的登录模态框
const styleContent = `
  ${config.signTipSelector} {
    display: none;
  }

  ${config.signModalSelector} {
    display: none;
  }
`.trim();

// main()
appnedStyle(styleContent, { className: config.styleClassName });
