import CustomSplitterLayout from '@/layout/CustomSplitterLayout';
import { ProCard, ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { useMemo } from 'react';

const VoucherFormPage = () => {
    // const { token } = theme.useToken();

    const panels = useMemo(
        () => [
            {
                itemKey: 'left',
                title: 'Chọn sản phẩm',
                content: (
                    <>
                        <ProFormText
                            vertical
                            rules={[
                                {
                                    required: true,
                                    message: '此项为必填项',
                                },
                            ]}
                            name="name"
                            label="签约客户名称"
                            tooltip="最长为 24 位"
                            placeholder="请输入名称"
                        />
                        <ProFormText
                            name={['name2', 'text']}
                            label="签约客户名称"
                            tooltip="最长为 24 位"
                            placeholder="请输入名称"
                        />
                    </>
                ),
                defaultSize: 400,
                min: 340,
                max: 500,
            },
            {
                itemKey: 'right',
                title: 'Tạo eVoucher',
                isCard: true,
                isSpace: true,
                content: (responsive: boolean) => (
                    <ProCard
                        title="Tạo eVoucher"
                        split={responsive ? 'horizontal' : 'vertical'}
                        bordered
                        headerBordered
                        size="small"
                    >
                        <ProCard title="左侧详情" colSpan="50%">
                            <div style={{ height: 360 }}>左侧内容</div>
                        </ProCard>
                        <ProCard title="流量占用情况">
                            <div style={{ height: 360 }}>右侧内容</div>
                            <Button htmlType="submit">test</Button>
                        </ProCard>
                    </ProCard>
                ),
            },
        ],
        []
    );

    return (
        <ProForm
            onFinish={async (values) => {
                console.log(values);
                message.success('提交成功');
            }}
            initialValues={{
                name: '蚂蚁设计有限公司',
                name2: '蚂蚁设计集团',
                useMode: 'chapter',
            }}
            submitter={false}
        >
            <CustomSplitterLayout panels={panels} />
        </ProForm>
    );
};

export default VoucherFormPage;
