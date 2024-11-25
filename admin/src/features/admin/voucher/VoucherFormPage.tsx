import { ProCard } from '@ant-design/pro-components';
import { Flex, Splitter, Typography } from 'antd';
import React from 'react';

const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => (
    <Flex justify="center" align="center" style={{ height: '100%' }}>
        <Typography.Title type="secondary" level={5} style={{ whiteSpace: 'nowrap' }}>
            {props.text}
        </Typography.Title>
    </Flex>
);

const VoucherFormPage = () => {
    // const { token } = theme.useToken();

    return (
        <Splitter
            style={{
                height: 'fit-content',
            }}
        >
            <Splitter.Panel defaultSize="30%">
                <ProCard bordered>
                    <Desc text="First" />
                </ProCard>
            </Splitter.Panel>
            <Splitter.Panel style={{ paddingLeft: '24px' }}>
                <ProCard bordered>
                    <Desc text="Second" />
                </ProCard>
            </Splitter.Panel>
        </Splitter>
    );
};

export default VoucherFormPage;
