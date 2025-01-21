import { getRequestConfig as getRemoteRequestConfig } from '@/entrypoints/content/message';
import type { RequestConfigItem } from '@/types';

// 如果请求相关的状态变得更加复杂后，可以考虑使用状态管理库
let userConfig: RequestConfigItem[] = [];

async function syncRequestConfig() {
  try {
    const config = await getRemoteRequestConfig();

    setRequestConfig(config);
  } catch (error) {
    // do nothing
    console.error(error);
  }
}

const setRequestConfig = (config: RequestConfigItem[]) => {
  userConfig = config;
};

const getRequestConfig = () => {
  return userConfig;
};

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    syncRequestConfig();
  }
});

export function useRequestStore() {
  return {
    setRequestConfig,
    getRequestConfig
  };
}
