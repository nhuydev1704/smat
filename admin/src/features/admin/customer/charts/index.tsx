import GridLayout from '@/layout/GridLayout';
import { memo } from 'react';
import CustomerReport from './CustomerReport';

const createChart = (id: string) => ({
    id,
    chart: (width: number, height: number) => <CustomerReport width={width} height={height} />,
});

const charts = [createChart('1'), createChart('2'), createChart('3'), createChart('4'), createChart('5')];
const CustomerChart = () => {
    return <GridLayout charts={charts} />;
};

export default memo(CustomerChart);
