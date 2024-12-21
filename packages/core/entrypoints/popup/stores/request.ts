import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createLocalStorage } from '@/shared';

interface RequestConfigItem {
  id: string;
  request_url: string;
  response_content: string;
}

interface RequestStoreState {
  list: RequestConfigItem[];
}

interface RequestStoreActions {
  addConfig: (config: RequestConfigItem) => void;
}

export const useRequestStore = create<
  RequestStoreState & RequestStoreActions,
  [['zustand/persist', RequestStoreState]]
>(
  persist(
    (set) => ({
      list: [],
      addConfig: (config: RequestConfigItem) => {
        set((state) => ({
          list: [...state.list, config]
        }));
      }
    }),
    {
      name: 'local:CEA@request',
      storage: createJSONStorage(createLocalStorage)
    }
  )
);
