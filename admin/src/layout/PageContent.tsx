import Text from '@/components/ui/text';
import { PageContainer } from '@ant-design/pro-components';
import { Flex } from 'antd';
import React from 'react';

const PageContent = ({ children }: { children: React.ReactNode }) => {
    return (
        <PageContainer
            token={{
                paddingInlinePageContainerContent: 24,
                paddingBlockPageContainerContent: 24,
            }}
            subTitle={<Text type="subtitle" message="Danh sách khách hàng" />}
            title={<Text type="h4" message="Khách hàng 2" />}
        >
            <Flex vertical gap={24}>
                {children}
            </Flex>
        </PageContainer>
    );
};

export default PageContent;
