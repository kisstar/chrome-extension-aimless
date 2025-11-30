import { CEA_REQUEST_SYNC_CONFIG } from '@/constants';
import { sendMessage } from 'webext-bridge/popup';

/**
 * 将请求配置同步到内容脚本上下文
 *
 * @param 包含 enable 字段的对象，用于指定是否启用拦截器
 */
export async function syncRequestConfigToContentContext({
  enable
}: {
  enable: boolean;
}) {
  const tabs = await browser.tabs.query({
    active: true,
    currentWindow: true
  });

  sendMessage(
    CEA_REQUEST_SYNC_CONFIG,
    { enable },
    'content-script@' + tabs[0].id
  );
}
