import { STORAGE_LOCALE_KEY, STORAGE_TOKEN_KEY } from '@/constant/storage';
import { Locale } from '@/locales/type';

export const getByKey = <D = unknown>(key: string, defaultStore: Storage = window.sessionStorage): D =>
    defaultStore.getItem(key) && JSON.parse(defaultStore.getItem(key)!);

export const setByKey = <D = unknown>(key: string, value: D, defaultStore: Storage = window.sessionStorage || {}) => {
    defaultStore.setItem(key, JSON.stringify(value));
};

export const setToken = (token: string) => window.localStorage.setItem(STORAGE_TOKEN_KEY, token);

export const getToken = () => window.localStorage.getItem(STORAGE_TOKEN_KEY);

export const setLocale = (locale: Locale) => window.localStorage.setItem(STORAGE_LOCALE_KEY, locale);
export const getLocale = () => window.localStorage.getItem(STORAGE_LOCALE_KEY) as Locale;

export const deleteAuthAndToken = () => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    // 手动设置token为空是为了触发 useReloadWhenTokenChange
    setToken('');
};
