import { useRouter } from '@/hooks/userRouter';
import ListLayout from '@/layout/ListLayout';
import { ProCard } from '@ant-design/pro-components';
import { useFetchCustomers } from '../customer/services/customer.Api';

const DashboardPage = () => {
    const { searchParams } = useRouter();

    const { data: queryItems, isFetching } = useFetchCustomers({
        q: searchParams.name,
        current: searchParams.page,
        pageSize: 12,
    });

    return (
        <>
            <ListLayout
                loading={isFetching}
                table={{
                    dataSource: queryItems?.data,
                    total: queryItems?.total,
                }}
                listHeader={<ProCard bordered>test</ProCard>}
                header={{
                    title: 'Dashboard',
                }}
            />
        </>
    );
};

export default DashboardPage;
