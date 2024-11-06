import {
    GithubFilled,
    InfoCircleFilled,
    LogoutOutlined,
    PlusCircleFilled,
    QuestionCircleFilled,
    SearchOutlined,
} from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-components';
import { PageContainer, ProCard, ProConfigProvider, ProLayout, SettingDrawer } from '@ant-design/pro-components';
import { Button, ConfigProvider, Dropdown, Flex, Input, theme } from 'antd';
import { useState } from 'react';
import defaultProps from './_defaultProps';
import { SelectLang } from '../components/lang/SelectLang';

const SearchInput = () => {
    const { token } = theme.useToken();
    return (
        <div
            key="SearchOutlined"
            aria-hidden
            style={{
                display: 'flex',
                alignItems: 'center',
                marginInlineEnd: 24,
            }}
            onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            <Input
                style={{
                    borderRadius: 4,
                    marginInlineEnd: 12,
                    backgroundColor: token.colorBgTextHover,
                }}
                prefix={
                    <SearchOutlined
                        style={{
                            color: token.colorTextLightSolid,
                        }}
                    />
                }
                placeholder="搜索方案"
                variant="borderless"
            />
            <PlusCircleFilled
                style={{
                    color: token.colorPrimary,
                    fontSize: 24,
                }}
            />
        </div>
    );
};

export default function PrivateLayout() {
    console.log('theme.darkAlgorithm', theme.darkAlgorithm);
    const [collapsed, setCollapsed] = useState(false);

    const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
        fixSiderbar: true,
        layout: 'mix',
        // splitMenus: true,
    });

    const [pathname, setPathname] = useState('/list/sub-page/sub-sub-page1');
    const [num, setNum] = useState(40);
    if (typeof document === 'undefined') {
        return <div />;
    }

    return (
        <div
            id="test-pro-layout"
            style={{
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <ProConfigProvider hashed={false}>
                <ConfigProvider
                    getTargetContainer={() => {
                        return document.getElementById('test-pro-layout') || document.body;
                    }}
                >
                    <ProLayout
                        onCollapse={setCollapsed}
                        prefixCls="my-prefix"
                        {...defaultProps}
                        location={{
                            pathname,
                        }}
                        token={{
                            header: {
                                colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
                            },
                            bgLayout: settings?.navTheme === 'light' ? '#fff' : '#000',
                            pageContainer: {
                                colorBgPageContainer: settings?.navTheme === 'light' ? '#f1f1f1' : '#000',
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
                                                    label: '退出登录',
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
                                props.layout !== 'side' && document.body.clientWidth > 1400 ? (
                                    <SearchInput />
                                ) : undefined,
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
                        onMenuHeaderClick={(e) => console.log(e)}
                        {...settings}
                    >
                        <PageContainer
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
                                    height: '200vh',
                                    minHeight: 800,
                                }}
                            >
                                <div />
                            </ProCard>
                        </PageContainer>

                        <SettingDrawer
                            pathname={pathname}
                            enableDarkTheme
                            getContainer={(e: any) => {
                                if (typeof window === 'undefined') return e;
                                return document.getElementById('test-pro-layout');
                            }}
                            settings={settings}
                            onSettingChange={(changeSetting) => {
                                setSetting(changeSetting);
                            }}
                            disableUrlParams={false}
                        />
                    </ProLayout>
                </ConfigProvider>
            </ProConfigProvider>
        </div>
    );
}
