class StorageUtil {
  static save = (key: string, value: string): void => {
    localStorage.setItem(key, value);
  }

  static remove = (key: string): void => {
    localStorage.removeItem(key);
  }

  static load = (key: string): string | null => {
    return localStorage.getItem(key);
  }
}

export default StorageUtil;
