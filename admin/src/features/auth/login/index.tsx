import { useNavigate } from 'react-router';

import useAppStore from '@/store/app';

import {
    AlipayCircleOutlined,
    LockOutlined,
    MailOutlined,
    MobileOutlined,
    TaobaoCircleOutlined,
    UserOutlined,
    WeiboCircleOutlined,
} from '@ant-design/icons';
import {
    LoginForm,
    ProConfigProvider,
    ProFormCaptcha,
    ProFormCheckbox,
    ProFormText,
    setAlpha,
} from '@ant-design/pro-components';
import { Space, Tabs, message, theme } from 'antd';
import type { CSSProperties } from 'react';
import { useState } from 'react';

type LoginType = 'phone' | 'account';

export default function Login() {
    const navigate = useNavigate();
    const appStore = useAppStore();

    const { token } = theme.useToken();
    const [loginType, setLoginType] = useState<LoginType>('phone');

    const iconStyles: CSSProperties = {
        marginInlineStart: '16px',
        color: setAlpha(token.colorTextBase, 0.2),
        fontSize: '24px',
        verticalAlign: 'middle',
        cursor: 'pointer',
    };

    //     <Button
    //     onClick={() => {
    //         appStore.setToken('token');
    //         navigate('/');
    //     }}
    // >
    //     login
    // </Button>

    return (
        <div style={{ backgroundColor: token.colorBgContainer }}>
            <LoginForm>
                <>
                    <ProFormText
                        name="email"
                        placeholder="Email"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập địa chỉ Email!',
                            },
                            {
                                type: 'email',
                                message: 'Địa chỉ Email không hợp lệ!',
                            },
                        ]}
                    />
                    <ProFormText.Password
                        name="password"
                        fieldProps={{
                            prefix: <LockOutlined className={'prefixIcon'} />,
                            strengthText: 'Mật khẩu phải chứa số, chữ cái và ký tự đặc biệt, dài ít nhất 8 ký tự.',
                            statusRender: (value) => {
                                const getStatus = () => {
                                    if (value && value.length > 12) {
                                        return 'ok';
                                    }
                                    if (value && value.length > 6) {
                                        return 'pass';
                                    }
                                    return 'poor';
                                };
                                const status = getStatus();
                                if (status === 'pass') {
                                    return (
                                        <div style={{ fontWeight: '600', color: token.colorWarning }}>
                                            Mạnh：Trung bình
                                        </div>
                                    );
                                }
                                if (status === 'ok') {
                                    return (
                                        <div style={{ fontWeight: '600', color: token.colorSuccess }}>Mạnh：Tốt</div>
                                    );
                                }
                                return <div style={{ fontWeight: '600', color: token.colorError }}>Mạnh：Yếu</div>;
                            },
                        }}
                        placeholder="Mật khẩu"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu!',
                            },
                        ]}
                    />
                </>

                <div
                    style={{
                        marginBlockEnd: 24,
                    }}
                >
                    <ProFormCheckbox noStyle name="autoLogin">
                        Lưu đăng nhập
                    </ProFormCheckbox>
                    <a
                        style={{
                            float: 'right',
                        }}
                    >
                        Quên mật khẩu?
                    </a>
                </div>
            </LoginForm>
        </div>
    );
}
