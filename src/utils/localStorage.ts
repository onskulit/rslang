export interface IStorage {
  set: (key: string, value: string) => void;
  remove: (key: string) => void;
  get: (key: string) => string;
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
