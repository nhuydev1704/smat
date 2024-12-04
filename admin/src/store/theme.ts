import { ThemeConfig } from 'antd';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Define the shape of the store
type TThemeStore = {
    theme: ThemeConfig;
    setTheme: (theme: ThemeConfig) => void;
};

// Initial state
const initialState: TThemeStore = {
    theme: {
        token: {
            borderRadius: 8,
            colorBgBase: '#ffffff',
            colorWarning: '#ffc55a',
            colorTextBase: '#223344',
            colorPrimary: '#1e90ff',
            colorInfo: '#1e90ff',
            colorPrimaryHover: '#61b1ff',
            colorPrimaryActive: '#3eb5e1',
            colorErrorHover: '#ff7875',
            colorTextQuaternary: '#cccccc',
        },
        components: {
            Form: {
                itemMarginBottom: 16,
            },
            Input: {
                borderRadius: 16,
            },
            Switch: {
                colorPrimary: 'rgb(62,181,225)',
                handleBg: 'rgb(30,144,255)',
            },
        },
    },

    setTheme: () => {},
};

// Actions
const actions = (set: any, get: any) => ({
    setTheme: (theme: ThemeConfig) => {
        set({ theme }, false, 'setTheme');
    },
});

// Create the store
const useThemeStore = create<TThemeStore>()(
    devtools(
        (set, get) => ({
            ...initialState,
            ...actions(set, get),
        }),
        { name: 'ThemeStore', anonymous: true }
    )
);

export default useThemeStore;
