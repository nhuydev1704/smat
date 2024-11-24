import useAppStore from '@/store/app';

import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { ConfigProvider, Flex, notification, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';

export default function ForgotPassword() {
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
                            fontSizeLG: 14,
                            fontWeight: 'bold',
                        },
                    },
                }}
            >
                <LoginForm
                    title="Xác minh email"
                    subTitle=" "
                    onFinish={() => {
                        console.log('123');
                        notification.info({
                            message: 'Email',
                        });
                    }}
                    submitter={{
                        submitButtonProps: {
                            icon: <ArrowRightOutlined />,
                            iconPosition: 'end',
                        },
                        searchConfig: { submitText: 'Tiếp tục' },
                    }}
                    size="large"
                >
                    <div style={{ marginBottom: '20px' }}>
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
                    </div>
                </LoginForm>
            </ConfigProvider>
        </div>
    );
}
