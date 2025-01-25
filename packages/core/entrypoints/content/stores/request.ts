import { getRequestConfig as getRemoteRequestConfig } from '@/entrypoints/content/message';
import type { RequestConfigItem } from '@/types';

// 请求配置是否已经加载完成
let isReady = false;
// 如果请求相关的状态变得更加复杂后，可以考虑使用状态管理库
let userConfig: RequestConfigItem[] = [];

async function syncRequestConfig() {
  try {
    const config = await getRemoteRequestConfig();

    isReady = true;
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

// 初次加载时，同步请求配置
syncRequestConfig();
// 当页面可见时，同步请求配置
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    syncRequestConfig();
  } else {
    isReady = false;
  }
});

export function useRequestStore() {
  return {
    isReady,
    setRequestConfig,
    getRequestConfig
  };
}
