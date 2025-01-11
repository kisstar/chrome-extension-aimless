import { onMessage } from 'webext-bridge/content-script';
import { CEA_REQUEST_SYNC_CONFIG } from '@/constants';
import { useRequestStore } from '@/entrypoints/content/stores';
import type { RequestConfigItem } from '@/types';

export function registerEvents() {
  onMessage<{ list: RequestConfigItem[] }>(
    CEA_REQUEST_SYNC_CONFIG,
    (message) => {
      const { data } = message;
      const { list } = data;

      useRequestStore().setRequestConfig(list);
    }
  );
}
