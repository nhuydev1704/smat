import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { Form, message } from 'antd';
import React from 'react';
import { useAddCustomer } from './services/customer.Api';

const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

const CustomerForm = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
    const [form] = Form.useForm<{ name: string; company: string }>();
    const addItemMutation = useAddCustomer();

    const [loading, setLoading] = React.useState(false);

    const handleAddItem = async () => {
        setLoading(true);
        const newItem = { title: 'New Item' };
        await waitTime(2000);

        addItemMutation.mutate(newItem, {
            // onSettled is called regardless of whether the query or mutation was successful or resulted in an error.
            // It is always called after the request has completed.
            onSettled: () => {
                setLoading(false);
            },
        });
        message.success('Gửi thành công');
        return true;
    };

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
            onFinish={handleAddItem}
            open={open}
            onOpenChange={onOpenChange}
            loading={loading}
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
                <ProFormText width="md" name="company" label="Tên công ty" placeholder="Nhập tên công ty" />
            </ProForm.Group>
        </ModalForm>
    );
};

export default React.memo(CustomerForm);
