export const setItem = (key: string, value: string) => {
  return localStorage.setItem(key, value);
};

export const getItem = (key: string) => {
  return localStorage.getItem(key);
};

export const deleteItem = (key: string) => {
  return localStorage.removeItem(key);
};

export const deleteAll = () => {
  return localStorage.clear();
};
