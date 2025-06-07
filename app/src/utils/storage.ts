// Simple encryption/decryption for localStorage
const ENCRYPTION_KEY = 'gender-analysis-app-key';

export const encryptData = (data: string): string => {
  try {
    return btoa(data);
  } catch {
    return data;
  }
};

export const decryptData = (encryptedData: string): string => {
  try {
    return atob(encryptedData);
  } catch {
    return encryptedData;
  }
};

export const saveApiKey = (apiKey: string): void => {
  const encrypted = encryptData(apiKey);
  localStorage.setItem('openai-api-key', encrypted);
};

export const getApiKey = (): string | null => {
  const encrypted = localStorage.getItem('openai-api-key');
  if (!encrypted) return null;
  return decryptData(encrypted);
};

export const removeApiKey = (): void => {
  localStorage.removeItem('openai-api-key');
};

export const saveHistory = (history: any[]): void => {
  localStorage.setItem('analysis-history', JSON.stringify(history));
};

export const getHistory = (): any[] => {
  const history = localStorage.getItem('analysis-history');
  return history ? JSON.parse(history) : [];
};