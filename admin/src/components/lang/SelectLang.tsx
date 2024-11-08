// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import useAppStore from '@/store/app';
import { Dropdown, Menu, version } from 'antd';
import { DropDownProps } from 'antd/es/dropdown';
import React from 'react';

export interface HeaderDropdownProps extends DropDownProps {
    overlayClassName?: string;
    placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomCenter';
}

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ overlayClassName: cls, ...restProps }) => (
    <Dropdown overlayClassName={cls} {...restProps} />
);

interface LocalData {
    lang: string;
    key: string;
    label?: string;
    icon?: string;
    title?: string;
}

interface SelectLangProps {
    globalIconClassName?: string;
    postLocalesData?: (locales: LocalData[]) => LocalData[];
    onItemClick?: (params: any) => void;
    className?: string;
    reload?: boolean;
    icon?: React.ReactNode;
    style?: React.CSSProperties;
}

const defaultLangUConfigMap = [
    {
        lang: 'en_US',
        key: 'en_US',
        label: 'English',
        icon: '🇺🇸',
        title: 'Language',
    },

    {
        lang: 'vi_VN',
        key: 'vi_VN',
        label: 'Tiếng Việt',
        icon: '🇻🇳',
        title: 'Ngôn ngữ',
    },
];

export const SelectLang: React.FC<SelectLangProps> = (props) => {
    const { globalIconClassName, postLocalesData, onItemClick, icon, style, ...restProps } = props;
    const { locale: selectedLang, setLocale } = useAppStore();

    const changeLang = ({ key }: any): void => {
        console.log('🚀 ~ changeLang ~ key:', key);
        setLocale(key);
    };

    const defaultLangUConfig = defaultLangUConfigMap;

    const allLangUIConfig = postLocalesData?.(defaultLangUConfig) || defaultLangUConfig;
    const handleClick = onItemClick ? (params: any) => onItemClick(params) : changeLang;

    const menuItemStyle = { minWidth: '160px' };
    const menuItemIconStyle = { marginRight: '8px' };

    const langMenu = {
        selectedKeys: [selectedLang],
        onClick: handleClick,
        items: allLangUIConfig.map((localeObj) => ({
            key: localeObj.lang || localeObj.key,
            style: menuItemStyle,
            label: (
                <>
                    <span role="img" aria-label={localeObj?.label || 'en-US'} style={menuItemIconStyle}>
                        {localeObj?.icon || '🌐'}
                    </span>
                    {localeObj?.label || 'en-US'}
                </>
            ),
        })),
    };

    // antd@5 和  4.24 之后推荐使用 menu，性能更好
    let dropdownProps;
    if (version.startsWith('5.') || version.startsWith('4.24.')) {
        dropdownProps = { menu: langMenu };
    } else if (version.startsWith('3.')) {
        dropdownProps = {
            overlay: (
                <Menu>
                    {langMenu.items.map((item: any) => (
                        <Menu.Item key={item.key} onClick={item.onClick}>
                            {item.label}
                        </Menu.Item>
                    ))}
                </Menu>
            ),
        };
    } else {
        // 需要 antd 4.20.0 以上版本
        dropdownProps = { overlay: <Menu {...langMenu} /> };
    }

    const inlineStyle = {
        cursor: 'pointer',
        padding: '12px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
        verticalAlign: 'middle',
        ...style,
    };

    return (
        <HeaderDropdown {...dropdownProps} placement="bottomRight" {...restProps}>
            <span className={globalIconClassName} style={inlineStyle}>
                <i className="anticon" title={allLangUIConfig[selectedLang]?.title}>
                    {icon ? (
                        icon
                    ) : (
                        <svg
                            viewBox="0 0 24 24"
                            focusable="false"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                                d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z "
                                className="css-c4d79v"
                            />
                        </svg>
                    )}
                </i>
            </span>
        </HeaderDropdown>
    );
    return <></>;
};
