import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { Form, message } from 'antd';
import React from 'react';

const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

const CustomerForm = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
    const [form] = Form.useForm<{ name: string; company: string }>();
    console.log('render form');

    return (
        <ModalForm<{
            name: string;
            company: string;
        }>
            title="Thêm khách hàng"
            form={form}
            autoFocusFirstInput
            modalProps={{
                maskClosable: false,
                centered: true,
                destroyOnClose: true,
                onCancel: () => console.log('run'),
            }}
            submitTimeout={2000}
            onFinish={async (values) => {
                await waitTime(2000);
                console.log(values.name);
                message.success('Gửi thành công');
                return true;
            }}
            open={open}
            onOpenChange={onOpenChange}
        >
            <ProForm.Group>
                <ProFormText
                    width="md"
                    name="name"
                    label="Họ tên"
                    tooltip="Tối đa 24 ký tự"
                    placeholder="Nhập họ tên"
                    required
                    rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                />

                <ProFormText width="md" name="company" label="Tên công ty" placeholder="Nhập tên công ty" />
            </ProForm.Group>
        </ModalForm>
    );
};

export default React.memo(CustomerForm);
