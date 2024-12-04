import useThemeStore from '@/store/theme';
import React, { useEffect } from 'react';

const OverrideTheme = () => {
    const { theme: themeApp }: any = useThemeStore();

    useEffect(() => {
        const borderRadiusLG = themeApp?.components?.Card?.borderRadiusLG || themeApp.token?.borderRadius;

        document.documentElement.style.setProperty('--card-border-radius-lg', `${borderRadiusLG}px`);
    }, [themeApp?.components?.Card?.borderRadiusLG]);

    useEffect(() => {
        const cardShadow =
            themeApp?.components?.Card?.boxShadowCard ||
            '0 6px 16px 0 rgba(0, 0, 0, 0.08),0 3px 6px -4px rgba(0, 0, 0, 0.12),0 9px 28px 8px rgba(0, 0, 0, 0.05)';

        document.documentElement.style.setProperty('--card-box-shadow', cardShadow);
    }, [themeApp?.components?.Card?.boxShadowCard]);

    return null;
};

export default React.memo(OverrideTheme);
