import useAppStore from '@/store/app';

import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { ConfigProvider, Flex, theme } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const appStore = useAppStore();
    const { token } = theme.useToken();

    // const iconStyles: CSSProperties = {
    //     marginInlineStart: '16px',
    //     color: setAlpha(token.colorTextBase, 0.2),
    //     fontSize: '24px',
    //     verticalAlign: 'middle',
    //     cursor: 'pointer',
    // };

    return (
        <div>
            <ConfigProvider
                theme={{
                    components: {
                        Form: {
                            itemMarginBottom: 0,
                        },
                        Input: {
                            borderRadiusLG: 999,
                            fontSizeLG: 15,
                            controlPaddingHorizontal: 20,
                        },
                        Button: {
                            borderRadiusLG: 999,
                            fontSizeLG: 15,
                            fontWeightStrong: 700,
                        },
                    },
                }}
            >
                <LoginForm
                    title="Đăng nhập"
                    subTitle=" "
                    onFinish={() => {
                        console.log('123');
                        appStore.setToken('token');
                        navigate('/');
                    }}
                    submitter={{ searchConfig: { submitText: 'Đăng nhập' } }}
                    size="large"
                >
                    <Flex vertical gap={18}>
                        <ProFormText
                            labelAlign="left"
                            label="Email"
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
                            label="Mật khẩu"
                            name="password"
                            fieldProps={{
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
                                            <div style={{ fontWeight: '600', color: token.colorSuccess }}>
                                                Mạnh：Tốt
                                            </div>
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
                                onClick={() => navigate('/forgot')}
                            >
                                Quên mật khẩu?
                            </a>
                        </div>
                    </Flex>
                </LoginForm>
            </ConfigProvider>
        </div>
    );
}
