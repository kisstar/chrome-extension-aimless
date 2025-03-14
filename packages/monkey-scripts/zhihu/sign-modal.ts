import { $, appendStyle } from '@chrome-extension-aimless/shared';
import config from './config';

// 通过追加样式隐藏默认展示的登录模态框
const styleContent = `
  .Modal-wrapper {
    display: none;
  }
`.trim();

/**
 * 隐藏登录模态框并移除对应的隐藏样式以便后续点击登录时正常展示
 * @returns {void}
 */
function handleModal() {
  const signModalCloseBtn = $<HTMLButtonElement>(config.signModalSelector);

  if (signModalCloseBtn) {
    signModalCloseBtn.click();
  }

  const styleEl = $(config.styleClassName);

  if (styleEl) {
    $('head')?.removeChild(styleEl);
  }
}

// main()
appendStyle(styleContent, { className: config.styleClassName });
window.addEventListener('load', handleModal);
