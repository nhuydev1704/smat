import { useRouter } from '@/hooks/userRouter';
import { ProFormDatePicker, ProFormText, QueryFilter } from '@ant-design/pro-components';
import React from 'react';

const Filter = () => {
    const { searchParams, setSearchParams } = useRouter();

    return (
        <QueryFilter
            split
            autoFocus={false}
            syncToUrl={false}
            onFinish={async (values) => {
                setSearchParams(values);
            }}
            onReset={(values) => {
                setSearchParams(values);
            }}
            labelWidth={0}
            searchGutter={[8, 8]}
            style={{
                padding: 0,
            }}
            submitter={{
                searchConfig: {
                    resetText: 'Reset',
                },
            }}
            labelCol={{
                span: 0,
            }}
            initialValues={searchParams}
            autoFocusFirstInput={false}
        >
            <ProFormText name="name" />
            <ProFormDatePicker name="createDate" />
            <ProFormText name="status" />
            <ProFormDatePicker name="replyDate" />
            <ProFormDatePicker name="startDate" />
            <ProFormDatePicker name="endDate" />
        </QueryFilter>
    );
};

export default React.memo(Filter);
