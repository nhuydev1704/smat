import logo from '@/assets/logo.png';
import { useLocale } from '@/locales';
import menus from '@/router/menus';
import { MENUS_HEADER } from '@/router/menus-header';
import useAppStore from '@/store/app';
import { InfoCircleFilled, LogoutOutlined, QuestionCircleFilled } from '@ant-design/icons';
import { getMenuData, ProLayout, SettingDrawer, useToken } from '@ant-design/pro-components';
import { Dropdown, Flex, Space } from 'antd';
import { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { SelectLang } from '../components/lang/SelectLang';
import { HeaderMenuItemStyled, HeaderMenuSidebarLogoStyled } from './style';

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
                    colorMenuBackground: token.colorBgContainer, // Giữ lại nếu màu nền hiện tại phù hợp với toàn bộ giao diện.
                    colorMenuItemDivider: '#e8e8e8', // Làm sáng màu divider để không quá nổi bật.
                    colorTextMenu: '#4a4a4a', // Màu chữ trong menu nên tối hơn một chút, gần màu trung tính.
                    colorTextMenuSelected: '#2a7afb', // Màu chữ của mục được chọn nên có độ sáng và nổi bật, giữ xanh dương với tone mạnh.
                    colorBgMenuItemSelected: '#d6eaff', // Màu nền của mục được chọn nên nhạt để làm nổi bật nhưng không quá gắt.
                },
            }}
            avatarProps={{
                src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                size: 'small',
                title: '七妮妮',
                render: (_, dom) => {
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
            <div style={{ zIndex: 0 }}>
                <Outlet />
            </div>
            <SettingDrawer
                themeOnly
                pathname={pathname}
                enableDarkTheme
                settings={settings}
                onSettingChange={(changeSetting) => {
                    console.log('🚀 ~ PrivateLayout ~ changeSetting:', changeSetting);
                    setSettings(changeSetting);
                }}
                disableUrlParams
            />
        </ProLayout>
    );
}
