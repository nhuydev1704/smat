import GridLayout from '@/layout/GridLayout';
import { memo } from 'react';
import CustomerReport from './CustomerReport';

const createChart = (id: string) => ({
    id,
    chart: (width: number, height: number) => <CustomerReport width={width} height={height} />,
});

const layouts = {
    lg: [
        { i: '1', x: 0, y: 0, w: 6, h: 2 },
        { i: '2', x: 6, y: 0, w: 6, h: 2 },
        { i: '3', x: 0, y: 2, w: 4, h: 2 },
        { i: '4', x: 4, y: 2, w: 4, h: 2 },
        { i: '5', x: 8, y: 2, w: 4, h: 2 },
    ],
    md: [
        { i: '1', x: 0, y: 0, w: 6, h: 2 },
        { i: '2', x: 6, y: 0, w: 6, h: 2 },
        { i: '3', x: 0, y: 2, w: 6, h: 2 },
        { i: '4', x: 6, y: 2, w: 6, h: 2 },
        { i: '5', x: 0, y: 4, w: 12, h: 2 },
    ],
    sm: [
        { i: '1', x: 0, y: 0, w: 12, h: 2 },
        { i: '2', x: 0, y: 2, w: 12, h: 2 },
        { i: '3', x: 0, y: 4, w: 12, h: 2 },
        { i: '4', x: 0, y: 6, w: 12, h: 2 },
        { i: '5', x: 0, y: 8, w: 12, h: 2 },
    ],
};
const charts = [createChart('1'), createChart('2'), createChart('3'), createChart('4'), createChart('5')];
const CustomerChart = () => {
    return <GridLayout layouts={layouts} charts={charts} />;
};

export default memo(CustomerChart);
