const setToStorage = <T>(key: string, data: T) =>
  localStorage.setItem(key, JSON.stringify(data));

const clearStorage = () => localStorage.clear();

const getFromStorage = <T>(key: string): T | null => {
  const stringData = localStorage.getItem(key);
  if (!stringData) return null;

  return JSON.parse(stringData);
};

export { setToStorage, clearStorage, getFromStorage };
