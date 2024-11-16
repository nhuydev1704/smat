import ListLayout from '@/layout/ListLayout';
import { AppDispatch, RootState } from '@/store/redux.store';
import { ProCard } from '@ant-design/pro-components';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchCustomers } from '../customer/services/customer.Api';

const DashboardPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { customers, loading, error } = useSelector((state: RootState) => state.customer);
    console.log('🚀 ~ DashboardPage ~ items:', customers);

    const { data: queryItems } = useFetchCustomers();
    console.log('🚀 ~ DashboardPage ~ queryItems:', queryItems);

    // useEffect(() => {
    //     dispatch(fetchCustomer());
    // }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

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
