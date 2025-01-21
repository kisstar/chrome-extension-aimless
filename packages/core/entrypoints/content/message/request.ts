import { onMessage, sendMessage } from 'webext-bridge/window';
import { setNamespace } from 'webext-bridge/window';
import {
  MESSAGE_NAMESPACE,
  CEA_REQUEST_SYNC_CONFIG,
  CEA_REQUEST_GET_CONFIG
} from '@/constants';
import { useRequestStore } from '@/entrypoints/content/stores';
import type { StorageValue } from 'zustand/middleware';
import type { RequestConfigItem } from '@/types';
import type { RequestPersistedState } from '@/entrypoints/options/stores';

setNamespace(MESSAGE_NAMESPACE);

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

export async function getRequestConfig() {
  const configStr = await sendMessage<string>(
    CEA_REQUEST_GET_CONFIG,
    {},
    'background'
  );
  let list: RequestConfigItem[] = [];

  if (configStr) {
    const localRequestConfig: StorageValue<RequestPersistedState> =
      JSON.parse(configStr);

    list = localRequestConfig.state.list;
  }

  return list;
}
