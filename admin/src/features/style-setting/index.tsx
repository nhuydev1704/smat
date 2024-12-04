import { ANT_DESIGN_V5_THEME_EDITOR_THEME } from '@/constant/storage';
import useThemeStore from '@/store/theme';
import { App, Button, Skeleton, ThemeConfig } from 'antd';
import { enUS } from 'antd-token-previewer';
import React, { Suspense } from 'react';

const ThemeEditor = React.lazy(() => import('antd-token-previewer/lib/ThemeEditor'));

const StyleSetting = () => {
    const { message } = App.useApp();

    const { theme, setTheme } = useThemeStore();
    const [themeLocal, setThemeLocal] = React.useState<ThemeConfig>(theme);

    const handleSave = () => {
        localStorage.setItem(ANT_DESIGN_V5_THEME_EDITOR_THEME, JSON.stringify(themeLocal));
        setTheme(themeLocal);
        message.success('Saved successfully');
    };

    return (
        <Suspense fallback={<Skeleton style={{ margin: 24 }} />}>
            <ThemeEditor
                advanced
                hideAdvancedSwitcher
                theme={{ name: 'Custom Theme', key: 'test', config: themeLocal }}
                style={{ height: 'calc(100vh - 80px)' }}
                onThemeChange={(newTheme) => {
                    console.log('🚀 ~ StyleSetting ~ newTheme:', newTheme);
                    setThemeLocal(newTheme.config);
                }}
                locale={enUS}
                actions={
                    <Button type="primary" onClick={handleSave}>
                        Save
                    </Button>
                }
            />
        </Suspense>
    );
};

export default React.memo(StyleSetting);
