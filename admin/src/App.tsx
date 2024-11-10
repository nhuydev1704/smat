import 'dayjs/locale/vi';

import { enUSIntl, ProConfigProvider, viVNIntl } from '@ant-design/pro-components';
import { ConfigProvider } from 'antd';
import enUS from 'antd/es/locale/en_US';
import viVN from 'antd/es/locale/vi_VN';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useReloadWhenTokenChange } from './hooks/useStorageChange';
import './reset.css';
import routes from './router/routes';
import { IntlProvider } from 'react-intl';
import useAppStore from './store/app';
import { localeConfig } from './locales';
import { useEffect } from 'react';
import dayjs from 'dayjs';

const router = createBrowserRouter(routes);

function App() {
    useReloadWhenTokenChange();
    const { locale } = useAppStore();
    console.log('🚀 ~ App ~ locale:', locale);

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
        <div
            id="pro-layout"
            style={{
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <ProConfigProvider intl={getProLocale()} hashed={false}>
                <ConfigProvider
                    locale={getAntdLocale()}
                    getTargetContainer={() => {
                        return document.getElementById('pro-layout') || document.body;
                    }}
                >
                    <IntlProvider locale={locale.split('_')[0]} messages={localeConfig[locale]}>
                        <RouterProvider router={router} />
                    </IntlProvider>
                </ConfigProvider>
            </ProConfigProvider>
        </div>
    );
}

export default App;
