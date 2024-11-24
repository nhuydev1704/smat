import 'dayjs/locale/vi';

import { enUSIntl, ProConfigProvider, proTheme, viVNIntl } from '@ant-design/pro-components';
import { ConfigProvider, theme } from 'antd';
import enUS from 'antd/es/locale/en_US';
import viVN from 'antd/es/locale/vi_VN';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useReloadWhenTokenChange } from './hooks/useStorageChange';
import { localeConfig } from './locales';
import './reset.css';
import routes from './router/routes';
import useAppStore from './store/app';
import { CustomScroll } from './layout/ScrollWrapper';

const router = createBrowserRouter(routes);

function App() {
    useReloadWhenTokenChange();
    const { locale, settings } = useAppStore();
    console.log('🚀 ~ App ~ settings:', settings);

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
        <CustomScroll heightRelativeToParent="100vh">
            <ProConfigProvider dark={settings.navTheme === 'realDark'} intl={getProLocale()} hashed={false}>
                <ConfigProvider
                    locale={getAntdLocale()}
                    theme={{
                        components: {
                            Form: {
                                itemMarginBottom: 16,
                            },
                        },
                        inherit: true,
                    }}
                >
                    <IntlProvider locale={locale.split('_')[0]} messages={localeConfig[locale]}>
                        <RouterProvider router={router} />
                    </IntlProvider>
                </ConfigProvider>
            </ProConfigProvider>
        </CustomScroll>
    );
}

export default App;
