class StorageUtil {
  static save = (key: string, value: string): void => {
    localStorage.setItem(key, value);
  }

  static load = (key: string): string | null => {
    return localStorage.getItem(key);
  }
}

export default StorageUtil;
