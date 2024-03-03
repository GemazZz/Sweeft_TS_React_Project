export function sessionStorageRead<T>(key: string): T[] {
  const data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

export function sessionStorageUpdate(key: string, value: string): void {
  const data = sessionStorage.getItem(key);
  const parsedData = data ? JSON.parse(data) : [];
  const newData = [value, ...parsedData];
  sessionStorage.setItem(key, JSON.stringify(newData));
}
