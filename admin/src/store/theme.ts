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
            colorWarning: '#ffc55a',
            colorPrimary: '#1e90ff',
            colorInfo: '#1e90ff',
            colorPrimaryHover: '#61b1ff',
            colorPrimaryActive: '#3eb5e1',
            colorErrorHover: '#ff7875',
            colorTextQuaternary: '#cccccc',
            fontSizeHeading2: 28,
            fontSizeHeading3: 26,
            fontSizeHeading4: 22,
            fontSizeXL: 18,
            fontSizeHeading5: 20,
            fontSizeHeading1: 32,
            lineHeightHeading1: 1.5,
            lineHeightHeading2: 1.5,
            lineHeightHeading3: 1.5,
            lineHeight: 1.5,
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
            Card: {
                borderRadius: 8,
                borderRadiusLG: 20,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                boxShadowCard: '0px 0px 16px 8px rgba(14, 78, 144, 0.1)',
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
