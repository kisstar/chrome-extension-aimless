import { storage as wxtStorage } from 'wxt/storage';
import { REQUEST_CONFIG_PERSIST_KEY } from '@/constants';
import type { StorageValue } from 'zustand/middleware';
import type { RequestConfigItem } from '@/types';
import type { RequestPersistedState } from '@/entrypoints/options/stores';

// 如果请求相关的状态变得更加复杂后，可以考虑使用状态管理库
let userConfig: RequestConfigItem[] = [];

const setRequestConfig = (config: RequestConfigItem[]) => {
  userConfig = config;
};

const getRequestConfig = () => {
  return userConfig;
};

(async function initRequestConfig() {
  try {
    const configStr = await wxtStorage.getItem<string>(
      REQUEST_CONFIG_PERSIST_KEY
    );

    if (configStr) {
      const localRequestConfig: StorageValue<RequestPersistedState> =
        JSON.parse(configStr);
      const list = localRequestConfig.state.list;

      setRequestConfig(list);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // do nothing
  }
})();

export function useRequestStore() {
  return {
    setRequestConfig,
    getRequestConfig
  };
}
