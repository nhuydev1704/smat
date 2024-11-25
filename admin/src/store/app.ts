import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { getLocale, getToken, setLocale, setToken } from '@/helpers/storage';
import { Locale } from '@/locales/type';
import { ProSettings } from '@ant-design/pro-components';
import { theme } from 'antd';

// Define the shape of the store
type TAppStore = {
    settings: ProSettings;
    token: string | undefined | null;
    locale: Locale;
    loading: boolean;
    currentUser: { id: string; name: string } | undefined;
    setSettings: (setting: ProSettings) => void;
    setToken: (token: string | undefined | null) => void;
    setLocale: (locale: Locale) => void;
    init: () => void;
    reset: () => void;
};

const defaultSettings: ProSettings = {
    fixSiderbar: true,
    layout: 'mix',
    navTheme: 'light',
    colorPrimary: theme.getDesignToken().colorPrimary,
};

// Initial state
const initialState: TAppStore = {
    settings: defaultSettings,
    token: getToken() ?? '',
    locale: getLocale() ?? 'vi_VN',
    loading: false,
    currentUser: undefined,
    setSettings: () => {},
    setToken: () => {},
    setLocale: () => {},
    init: () => {},
    reset: () => {},
};

// Actions
const actions = (set: any, get: any) => ({
    setToken: (token: string | undefined | null) => {
        setToken(token ?? '');
        set({ token }, false, 'setToken');
    },
    setSettings: (settings: ProSettings) => {
        set({ settings }, false, 'setSetting');
    },
    setLocale: (locale: Locale) => {
        setLocale(locale ?? '');
        set({ locale }, false, 'setLocale');
    },
    init: () => {
        const store = get();
        if (store.loading || store.currentUser) {
            return;
        }

        set({ loading: true }, false, 'init');

        new Promise<{ data: TAppStore['currentUser']; code: number }>((resolve) => {
            setTimeout(() => {
                resolve({ data: { id: '1', name: '哈哈' }, code: 200 });
            }, 1000);
        })
            .then((res) => {
                if (res?.code === 200) {
                    set({ currentUser: res?.data }, false, 'init/success');
                }
            })
            .finally(() => {
                set({ loading: false }, false, 'init/complete');
            });
    },
    reset: () => {
        const token = '';
        setToken(token);
        set({ token, currentUser: undefined, loading: false, settings: defaultSettings }, false, 'reset');
    },
});

// Create the store
const useAppStore = create<TAppStore>()(
    devtools(
        (set, get) => ({
            ...initialState,
            ...actions(set, get),
        }),
        { name: 'AppStore', anonymous: true }
    )
);

export default useAppStore;
