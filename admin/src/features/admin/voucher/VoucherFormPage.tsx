import { ProCard, ProForm, ProFormDependency, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Flex, message, Splitter, Typography } from 'antd';
import React from 'react';
import RcResizeObserver from 'rc-resize-observer';

const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => (
    <Flex justify="center" align="center" style={{ height: '100%' }}>
        <Typography.Title type="secondary" level={5} style={{ whiteSpace: 'nowrap' }}>
            {props.text}
        </Typography.Title>
    </Flex>
);

const VoucherFormPage = () => {
    const [responsive, setResponsive] = React.useState(false);

    // const { token } = theme.useToken();

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
            <Splitter
                style={{
                    height: 'fit-content',
                }}
            >
                <Splitter.Panel defaultSize="30%">
                    <ProCard
                        style={{
                            height: '100%',
                        }}
                        title={<div style={{ fontWeight: 'bold', fontSize: '14px' }}>Chọn sản phẩm</div>}
                        bordered
                    >
                        <ProFormText
                            width="md"
                            name="name"
                            label="签约客户名称"
                            tooltip="最长为 24 位"
                            placeholder="请输入名称"
                        />
                        <ProFormText
                            width="md"
                            name={['name2', 'text']}
                            label="签约客户名称"
                            tooltip="最长为 24 位"
                            placeholder="请输入名称"
                        />
                    </ProCard>
                </Splitter.Panel>
                <Splitter.Panel style={{ paddingLeft: '24px' }}>
                    <ProCard bordered>
                        <RcResizeObserver
                            key="resize-observer"
                            onResize={(offset) => {
                                setResponsive(offset.width < 596);
                            }}
                        >
                            <ProCard
                                title="Tạo eVoucher"
                                extra="2019年9月28日"
                                split={responsive ? 'horizontal' : 'vertical'}
                                bordered
                                headerBordered
                                boxShadow={false}
                                size="small"
                            >
                                <ProCard title="左侧详情" colSpan="50%">
                                    <div style={{ height: 360 }}>左侧内容</div>
                                </ProCard>
                                <ProCard title="流量占用情况">
                                    <div style={{ height: 360 }}>右侧内容</div>
                                </ProCard>
                            </ProCard>
                        </RcResizeObserver>
                    </ProCard>
                </Splitter.Panel>
            </Splitter>
        </ProForm>
    );
};

export default VoucherFormPage;
