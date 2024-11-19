import menus from '@/router/menus';
import { MENUS_HEADER } from '@/router/menus-header';
import useAppStore from '@/store/app';
import { InfoCircleFilled, LogoutOutlined, QuestionCircleFilled } from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-components';
import { getMenuData, ProCard, ProLayout, SettingDrawer, useToken } from '@ant-design/pro-components';
import { Dropdown, Flex, Space, theme } from 'antd';
import { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { SelectLang } from '../components/lang/SelectLang';
import { HeaderMenuItemStyled, HeaderMenuSidebarLogoStyled } from './style';
import logo from '@/assets/logo.png';
import { useLocale } from '@/locales';

export default function PrivateLayout() {
    const [collapsed, setCollapsed] = useState(false);

    const { token } = useToken();

    const { formatMessage } = useLocale();

    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { settings, setSettings, reset } = useAppStore();

    if (typeof document === 'undefined') {
        return <div />;
    }

    return (
        <ProLayout
            logo={logo}
            onCollapse={setCollapsed}
            prefixCls="layout-prefix"
            siderWidth={256}
            route={{
                routes: menus,
            }}
            location={{
                pathname,
            }}
            logoStyle={{
                padding: '6px 0',
            }}
            menu={{
                collapsedShowGroupTitle: true,
            }}
            menuHeaderRender={(logo) => {
                return (
                    <Flex flex={1} justify="center">
                        <HeaderMenuSidebarLogoStyled>{logo}</HeaderMenuSidebarLogoStyled>
                    </Flex>
                );
            }}
            token={{
                header: {
                    colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
                    heightLayoutHeader: 46,
                    // colorBgHeader: settings?.navTheme === 'realDark' ? '#000' : '#06327d',
                    colorBgHeader: '#06327d',
                    colorHeaderTitle: '#fff',
                    colorTextRightActionsItem: token.colorWhite,
                    colorBgScrollHeader: '#06327d',
                },
                pageContainer: {
                    colorBgPageContainer: token.colorBgLayout,
                    paddingBlockPageContainerContent: 20,
                    paddingInlinePageContainerContent: 20,
                },
                sider: {
                    colorBgMenuItemSelected: token.colorPrimary,
                    colorTextMenuSelected: token.colorWhite,
                },
            }}
            avatarProps={{
                src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                size: 'small',
                title: '七妮妮',
                render: (props, dom) => {
                    return (
                        <Dropdown
                            menu={{
                                items: [
                                    {
                                        key: 'logout',
                                        icon: <LogoutOutlined />,
                                        label: 'Đăng xuất',
                                        onClick: () => {
                                            navigate('/login');
                                            reset();
                                        },
                                    },
                                ],
                            }}
                        >
                            {dom}
                        </Dropdown>
                    );
                },
            }}
            actionsRender={(props) => {
                if (props.isMobile) return [];
                if (typeof window === 'undefined') return [];
                return [
                    <InfoCircleFilled key="InfoCircleFilled" />,
                    <QuestionCircleFilled key="QuestionCircleFilled" />,
                    <SelectLang key="SelectLang" />,
                ];
            }}
            headerTitleRender={() => {
                return (
                    <Space size="large">
                        {MENUS_HEADER.map((item) => {
                            return (
                                <NavLink key={item.path} to={item.path}>
                                    <HeaderMenuItemStyled>
                                        {item.icon}
                                        {item.title}
                                    </HeaderMenuItemStyled>
                                </NavLink>
                            );
                        })}
                    </Space>
                );
            }}
            postMenuData={(menuData: any) => {
                const menuDataGet = getMenuData(menuData, { locale: true }, formatMessage, (data) => {
                    return data;
                });

                return menuDataGet.menuData;
            }}
            menuItemRender={(item, defaultDom) => {
                console.log('🚀 ~ PrivateLayout ~ item:', item);
                return (
                    <NavLink
                        to={item.path!}
                        style={{
                            display: 'flex',
                            gap: '10px',
                        }}
                    >
                        {item.pro_layout_parentKeys.length ? item.icon : ''} {defaultDom}
                    </NavLink>
                );
            }}
            {...settings}
        >
            <ProCard
                style={{
                    minHeight: 'calc(100vh - 85px)',
                }}
            >
                <Outlet />
            </ProCard>
            <SettingDrawer
                themeOnly
                pathname={pathname}
                enableDarkTheme
                settings={settings}
                getContainer={(e: any) => {
                    if (typeof window === 'undefined') return e;
                    return document.getElementById('test-pro-layout');
                }}
                onSettingChange={(changeSetting) => {
                    console.log('🚀 ~ PrivateLayout ~ changeSetting:', changeSetting);
                    setSettings(changeSetting);
                }}
                disableUrlParams
            />
        </ProLayout>
    );
}
