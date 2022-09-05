import { STORAGE_KEY } from '../constants/localStorage';
export interface IStorage {
  set: (key: STORAGE_KEY, value: string) => void;
  remove: (key: STORAGE_KEY) => void;
  get: (key: STORAGE_KEY) => string;
}

export const storage: IStorage = {
  set: (key, value) => {
    localStorage.setItem(key, value);
  },
  remove: (key) => {
    localStorage.removeItem(key);
  },
  get: (key) => {
    return localStorage.getItem(key) as string;
  },
};
