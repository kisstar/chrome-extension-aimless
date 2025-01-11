import { sendMessage } from 'webext-bridge/options';
import { CEA_REQUEST_SYNC_CONFIG } from '@/constants';
import type { RequestConfigItem } from '@/types/request';

/**
 * 将请求配置同步到内容脚本上下文
 *
 * @param list 请求配置项的数组
 */
export async function syncRequestConfigToContentContext(
  list: RequestConfigItem[]
) {
  const tabs = await browser.tabs.query({
    active: true,
    currentWindow: true
  });

  sendMessage(
    CEA_REQUEST_SYNC_CONFIG,
    {
      list
    },
    'content-script@' + tabs[0].id
  );
}
