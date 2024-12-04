import 'dayjs/locale/vi';

import { enUSIntl, ProConfigProvider, viVNIntl } from '@ant-design/pro-components';
import { ConfigProvider, theme } from 'antd';
import enUS from 'antd/es/locale/en_US';
import viVN from 'antd/es/locale/vi_VN';
import dayjs from 'dayjs';
import { useEffect, useLayoutEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useReloadWhenTokenChange } from './hooks/useStorageChange';
import { CustomScroll } from './layout/ScrollWrapper';
import { localeConfig } from './locales';
import './reset.css';
import routes from './router/routes';
import useAppStore from './store/app';
import useThemeStore from './store/theme';
import { ANT_DESIGN_V5_THEME_EDITOR_THEME } from './constant/storage';

const router = createBrowserRouter(routes);

function App() {
    useReloadWhenTokenChange();
    const { locale, settings } = useAppStore();
    const { theme: themeToken, setTheme } = useThemeStore();

    useLayoutEffect(() => {
        const storedConfig = localStorage.getItem(ANT_DESIGN_V5_THEME_EDITOR_THEME);
        if (storedConfig) {
            const themeConfig = JSON.parse(storedConfig);
            setTheme(themeConfig);
        }
    }, []);

    useEffect(() => {
        if (locale === 'en_US') {
            dayjs.locale('en');
        } else if (locale === 'vi_VN') {
            dayjs.locale('vi');
        }
    }, [locale]);

    /**
     * handler function that passes locale
     * information to ConfigProvider for
     * setting language across text components
     */
    const getAntdLocale = () => {
        if (locale === 'en_US') {
            return enUS;
        } else if (locale === 'vi_VN') {
            return viVN;
        }
    };

    const getProLocale = () => {
        if (locale === 'en_US') {
            return enUSIntl;
        } else if (locale === 'vi_VN') {
            return viVNIntl;
        }
    };

    return (
        <>
            <CustomScroll heightRelativeToParent="100vh">
                <ProConfigProvider
                    token={{
                        ...themeToken.token,
                        ...themeToken.components,
                        borderRadiusLG: 0,
                        borderRadius: 0,
                    }}
                    intl={getProLocale()}
                    hashed
                >
                    <ConfigProvider
                        locale={getAntdLocale()}
                        theme={{
                            ...themeToken,
                            hashed: true,
                            algorithm: settings.navTheme === 'realDark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
                        }}
                    >
                        <IntlProvider locale={locale.split('_')[0]} messages={localeConfig[locale]}>
                            <RouterProvider router={router} />
                        </IntlProvider>
                    </ConfigProvider>
                </ProConfigProvider>
            </CustomScroll>
        </>
    );
}

export default App;
