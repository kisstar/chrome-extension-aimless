import { $, createEl } from '../../utils';
import config from './config';

// 动态创建的 Style 标签元素
let styleEl: HTMLStyleElement | null = null;

/**
 * 通过 style 标签追加样式隐藏默认展示的登录模态框
 * @returns {HTMLStyleElement}
 */
function addModalStyle() {
  const styleText = `
  .Modal-wrapper {
    display: none;
  }
`.trim();
  const styleEl = createEl('style');

  styleEl.type = 'text/css';
  styleEl.innerHTML = styleText;
  $('head').appendChild(styleEl);

  return styleEl;
}

/**
 * 隐藏登录模态框并移除对应的隐藏样式以便后续点击登录时正常展示
 * @returns {void}
 */
function handleModal() {
  const signModalCloseBtn = $<HTMLButtonElement>(config.signModalSelector);

  signModalCloseBtn && signModalCloseBtn.click();
  styleEl && $('head').removeChild(styleEl);
}

// main()
styleEl = addModalStyle();
addEventListener('load', handleModal);
