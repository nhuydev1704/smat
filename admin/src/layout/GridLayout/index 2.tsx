import RowOverride from '@/components/ui/row-override';
import { Col } from 'antd';
import React, { Suspense } from 'react';
import Fallback from './Fallback';

const ChartWrapper = React.lazy(() => import('./ChartWrapper'));

interface GridLayoutComponentProps {
    charts: {
        id: string;
        chart: (width: number, height: number) => JSX.Element;
    }[];
}

const GridLayoutComponent: React.FC<GridLayoutComponentProps> = ({ charts }) => {
    return (
        <RowOverride>
            {charts.map(({ id, chart }) => (
                <Col span={8} style={{ height: '360px' }} key={id}>
                    <Suspense fallback={<Fallback />}>
                        <ChartWrapper chart={chart} />
                    </Suspense>
                </Col>
            ))}
        </RowOverride>
    );
};

export default React.memo(GridLayoutComponent);
