import useThemeAnimation from '@/hooks/useThemeAnimation';
import useAppStore from '@/store/app';
import { MoonOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { memo } from 'react';
import PickerColor from './PickerColor';
import ThemeIcon from './ThemeIcon';

const ToggleTheme = () => {
    const { settings, setSettings } = useAppStore();

    const toggleAnimationTheme = useThemeAnimation();

    const isDark = settings.navTheme === 'realDark';

    return (
        <FloatButton.Group trigger="click" icon={<ThemeIcon />} aria-label="Theme Switcher" badge={{ dot: true }}>
            <PickerColor
                value={settings.colorPrimary as any}
                onChange={(color) => {
                    setSettings({ ...settings, colorPrimary: color.toHexString() });
                }}
            />

            <FloatButton
                icon={<MoonOutlined />}
                type={isDark ? 'primary' : 'default'}
                onClick={async (e) => {
                    // Toggle animation when switch theme
                    toggleAnimationTheme(e, !isDark);

                    if (isDark) {
                        setSettings({ ...settings, navTheme: 'light' });
                    } else {
                        setSettings({ ...settings, navTheme: 'realDark' });
                    }
                }}
                tooltip="Màu tối"
            />
        </FloatButton.Group>
    );
};

export default memo(ToggleTheme);
