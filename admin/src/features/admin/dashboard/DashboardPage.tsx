import ListLayout from '@/layout/ListLayout';
import { LocaleFormatter } from '@/locales';
import { ProCard } from '@ant-design/pro-components';
import { DatePicker } from 'antd';
import React from 'react';

const DashboardPage = () => {
    return (
        <ListLayout
            listHeader={<ProCard bordered>test</ProCard>}
            header={{
                title: 'Dashboard',
            }}
        />
    );
};

export default DashboardPage;
