import { ArrowRightOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { ConfigProvider, notification } from 'antd';

export default function ForgotPassword() {
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
