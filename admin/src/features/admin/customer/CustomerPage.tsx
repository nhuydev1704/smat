import AddButton from '@/components/button/AddButton';
import { useRouter } from '@/hooks/userRouter';
import ListLayout from '@/layout/ListLayout';
import PageContent from '@/layout/PageContent';
import { useLocale } from '@/locales';
import { ProColumns, TableDropdown } from '@ant-design/pro-components';
import React from 'react';
import { useFetchCustomers } from '../customer/services/customer.Api';
import CustomerChart from './charts';
import CustomerForm from './CustomerForm';
import { Customer } from './services/customer.Zustand';

const columns: ProColumns<Customer>[] = [
    {
        title: 'STT',
        dataIndex: 'index',
        valueType: 'index',
        width: 48,
    },
    {
        title: 'Tiêu đề',
        dataIndex: 'title',
        sorter: true,
    },
    {
        disable: true,
        title: 'Type',
        dataIndex: 'state',
    },

    {
        title: 'Ngày tạo',
        key: 'showTime',
        dataIndex: 'created_at',
    },
    {
        title: 'Thao tác',
        valueType: 'option',
        key: 'option',
        render: (__, record, _, action) => [
            <a
                key="editable"
                onClick={() => {
                    action?.startEditable?.(record.id);
                }}
            >
                Sửa
            </a>,
            <TableDropdown
                key="actionGroup"
                onSelect={() => action?.reload()}
                menus={[
                    { key: 'copy', name: 'Sao chép' },
                    { key: 'delete', name: 'Xoá' },
                ]}
            />,
        ],
    },
];

const CustomerPage = () => {
    const { formatMessage } = useLocale();
    const { searchParams } = useRouter();

    // state
    const [showChart, setShowChart] = React.useState(true);
    const [openForm, setOpenForm] = React.useState(false);

    const {
        data: queryItems,
        isFetching,
        refetch,
    } = useFetchCustomers({
        q: searchParams.name,
        current: searchParams.page || 1,
        pageSize: 12,
    });

    const onOpenFormChange = React.useCallback((open: boolean) => {
        setOpenForm(open);
    }, []);

    return (
        <PageContent>
            {/* <Button
                onClick={() => setShowChart(!showChart)}
                type={showChart ? 'primary' : 'default'}
                icon={<LineChartOutlined />}
            /> */}
            <div className={`customer-chart-wrapper ${showChart ? 'show' : 'hide'}`}>
                <CustomerChart />
            </div>

            <ListLayout
                loading={isFetching}
                table={{
                    columns: columns as ProColumns<Record<string, any>>[],
                    dataSource: queryItems?.data || [],
                    total: queryItems?.total,
                    onReload: refetch,
                    toolBarCustom: [<AddButton onClick={() => setOpenForm(true)} />],
                }}
            />
            <CustomerForm open={openForm} onOpenChange={onOpenFormChange} />
        </PageContent>
    );
};

export default CustomerPage;
