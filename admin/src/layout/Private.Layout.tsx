import menus from '@/router/menus';
import useAppStore from '@/store/app';
import { InfoCircleFilled, LogoutOutlined, QuestionCircleFilled } from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-components';
import { ProCard, ProLayout, SettingDrawer } from '@ant-design/pro-components';
import { Dropdown } from 'antd';
import { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { SelectLang } from '../components/lang/SelectLang';

export default function PrivateLayout() {
    const [collapsed, setCollapsed] = useState(false);

    const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
        fixSiderbar: true,
        layout: 'mix',
        // splitMenus: true,
    });

    const { pathname } = useLocation();
    const navigate = useNavigate();
    const appStore = useAppStore();

    if (typeof document === 'undefined') {
        return <div />;
    }

    return (
        <ProLayout
            onCollapse={setCollapsed}
            prefixCls="my-prefix"
            route={{
                routes: menus,
            }}
            location={{
                pathname,
            }}
            token={{
                header: {
                    colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
                },
                bgLayout: settings?.navTheme === 'realDark' ? '#000' : '#fff',
                pageContainer: {
                    colorBgPageContainer: settings?.navTheme === 'realDark' ? '#000' : '#f1f1f1',
                    paddingBlockPageContainerContent: 20,
                    paddingInlinePageContainerContent: 20,
                },
                sider: {
                    paddingInlineLayoutMenu: collapsed ? 8 : 0,
                },
            }}
            siderWidth={256}
            menu={{
                collapsedShowGroupTitle: true,
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
                                            appStore.reset();
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
            headerTitleRender={(logo, title, _) => {
                const defaultDom = (
                    <a>
                        {logo}
                        {title}
                    </a>
                );
                if (typeof window === 'undefined') return defaultDom;
                if (document.body.clientWidth < 1400) {
                    return defaultDom;
                }
                if (_.isMobile) return defaultDom;
                return <>{defaultDom}</>;
            }}
            menuFooterRender={(props) => {
                if (props?.collapsed) return undefined;
                return (
                    <div
                        style={{
                            textAlign: 'center',
                            paddingBlockStart: 12,
                        }}
                    >
                        <div>© 2021 Made with love</div>
                        <div>by Ant Design</div>
                    </div>
                );
            }}
            menuItemRender={(item, defaultDom) => {
                return <NavLink to={item.path!}>{defaultDom}</NavLink>;
            }}
            {...settings}
        >
            {/* <PageContainer
                token={{
                    paddingInlinePageContainerContent: num,
                }}
                extra={[
                    <Button key="3">操作</Button>,
                    <Button key="2">操作</Button>,
                    <Button
                        key="1"
                        type="primary"
                        onClick={() => {
                            setNum(num > 0 ? 0 : 40);
                        }}
                    >
                        主操作
                    </Button>,
                ]}
                subTitle="简单的描述"
            >
                <ProCard
                    style={{
                        minHeight: 800,
                    }}
                >
                    <Outlet />
                </ProCard>
            </PageContainer> */}
            <ProCard
                style={{
                    minHeight: 800,
                }}
            >
                <Outlet />
            </ProCard>
            <SettingDrawer
                pathname={pathname}
                enableDarkTheme
                settings={settings}
                onSettingChange={(changeSetting) => {
                    setSetting(changeSetting);
                }}
                disableUrlParams={false}
            />
        </ProLayout>
    );
}
