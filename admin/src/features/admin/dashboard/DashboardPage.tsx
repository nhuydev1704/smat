import { LocaleFormatter } from '@/locales';
import { DatePicker } from 'antd';
import React from 'react';

const DashboardPage = () => {
    return (
        <div>
            <LocaleFormatter id="app.dashboard.test" />
            <div>
                <DatePicker />
            </div>
        </div>
    );
};

export default DashboardPage;
