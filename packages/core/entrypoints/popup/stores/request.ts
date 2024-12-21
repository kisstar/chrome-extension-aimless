import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createLocalStorage } from '@/shared';
import type { MenuItem } from '@/entrypoints/popup/constants';

interface RequestConfigItem {
  key: string;
  request_url: string;
  response_content: string;
}

interface RequestStoreState {
  list: RequestConfigItem[];
  selectedKeys: string[];
}

interface RequestStoreActions {
  addConfig: (config: RequestConfigItem) => void;
  getMenuItems: () => MenuItem[];
  setSelectedKeys: (keys: string[]) => void;
  getCurrentMenuItem(): RequestConfigItem | undefined;
}

export const useRequestStore = create<
  RequestStoreState & RequestStoreActions,
  [['zustand/persist', RequestStoreState]]
>(
  persist(
    (set, get) => ({
      list: [],
      selectedKeys: [], // 当前选中的菜单项

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
      }
    }),
    {
      name: 'local:CEA@request',
      storage: createJSONStorage(createLocalStorage)
    }
  )
);
