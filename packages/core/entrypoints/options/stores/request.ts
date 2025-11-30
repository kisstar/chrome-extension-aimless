import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createLocalStorage } from '@/shared';
import { REQUEST_CONFIG_PERSIST_KEY } from '@/constants';
import type { Key } from 'react';
import type { MenuItem } from '@/types';
import type { RequestConfigItem } from '@/types/request';

interface RequestStoreState {
  enable: boolean;
  list: RequestConfigItem[];
  selectedKeys: string[];
}

interface RequestStoreActions {
  toggleEnable: (enable?: boolean) => void;
  getMenuItems: () => MenuItem[];
  getCurrentMenuItem(): RequestConfigItem | undefined;
  addConfig: (config: RequestConfigItem) => void;
  deleteConfig: (key?: Key) => void;
  setSelectedKeys: (keys: string[]) => void;
}

export type RequestPersistedState = Pick<RequestStoreState, 'list' | 'enable'>;

export const useRequestStore = create<
  RequestStoreState & RequestStoreActions,
  [['zustand/persist', RequestPersistedState]]
>(
  persist(
    (set, get) => ({
      enable: false,
      list: [],
      selectedKeys: [], // 当前选中的菜单项

      /**
       * 切换请求配置的启用状态
       */
      toggleEnable: (enable?: boolean) => {
        set((state) => ({
          enable: enable ?? !state.enable
        }));
      },

      /**
       * 根据配置生成用于展示的菜单项
       */
      getMenuItems: () => {
        return get().list.map((item) => ({
          ...item,
          label: item.request_url
        }));
      },

      /**
       * 获取当前选中的菜单项
       *
       * @returns 当前选中的菜单项对象，若未选中任何菜单项则返回undefined
       */
      getCurrentMenuItem() {
        const { list, selectedKeys } = get();

        return list.find((item) => item.key === selectedKeys[0]);
      },

      /**
       * 添加配置
       */
      addConfig: (config: RequestConfigItem) => {
        set((state) => ({
          list: [...state.list, config]
        }));
      },

      /**
       * 设置选中的键
       */
      setSelectedKeys(keys: string[]) {
        set({ selectedKeys: keys });
      },

      /**
       * 删除配置
       */
      deleteConfig: (key?: Key) => {
        set((state) => ({
          list: state.list.filter((item) => item.key !== key),
          selectedKeys: state.selectedKeys.filter((item) => item !== key)
        }));
      }
    }),
    {
      // store 在存储时会自动加上 local: 前缀，此处去掉这部分
      name: REQUEST_CONFIG_PERSIST_KEY.slice('local:'.length),
      partialize: (state) => ({ list: state.list, enable: state.enable }),
      storage: createJSONStorage(createLocalStorage)
    }
  )
);
