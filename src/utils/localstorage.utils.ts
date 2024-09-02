export const API_KEY_COOKIE = "API_KEY";
export const RATES_COOKIE = "RATES";

export type ExchangeRates = {
  [key: string]: number;
};

export const getApiKey = (): string | null => {
  return localStorage.getItem(API_KEY_COOKIE);
};

export const getExchangeRates = (): ExchangeRates | null => {
  const rates = localStorage.getItem(RATES_COOKIE);
  if (!rates) {
    return null;
  }
  return JSON.parse(rates);
};

export const setSavedApiKey = (apiKey: string): void => {
  localStorage.setItem(API_KEY_COOKIE, apiKey);
};

export const setExchangeRates = (exchangeRates: ExchangeRates): void => {
  localStorage.setItem(RATES_COOKIE, JSON.stringify(exchangeRates));
};

export const setDarkMode = (isDarkMode: boolean): void => {
  localStorage.setItem("DARK_MODE", isDarkMode ? "true" : "false");
};

export const getDarkMode = (): boolean => {
  return localStorage.getItem("DARK_MODE") === "true";
};
