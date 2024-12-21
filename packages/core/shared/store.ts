import { storage as wxtStorage } from 'wxt/storage';
import { type StateStorage } from 'zustand/middleware';

export const createLocalStorage = (): StateStorage => {
  return {
    getItem: (key: string) => {
      return wxtStorage.getItem(`local:${key}`);
    },
    setItem: (key, value) => {
      return wxtStorage.setItem(`local:${key}`, value);
    },
    removeItem: (key) => {
      return wxtStorage.removeItem(`local:${key}`);
    }
  };
};

export const storage = createLocalStorage();
