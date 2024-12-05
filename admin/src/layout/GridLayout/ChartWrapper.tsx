import { debounce } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Fallback from './Fallback';
import { ProCard } from '@ant-design/pro-components';
import { Card } from 'antd';

interface ChartWrapperProps {
    chart: (width: number, height: number) => JSX.Element;
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({ chart }) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const [chartSize, setChartSize] = useState({
        width: 0,
        height: 0,
    });

    const updateChartSize = useCallback(
        debounce(() => {
            if (chartRef.current) {
                const { offsetWidth, offsetHeight } = chartRef.current;
                setChartSize({
                    width: offsetWidth - 32,
                    height: offsetHeight - 16,
                });
            }
        }, 300), // Adjust the debounce delay as needed
        []
    );

    useEffect(() => {
        const observer = new ResizeObserver(updateChartSize);

        if (chartRef.current) observer.observe(chartRef.current);

        return () => {
            observer.disconnect();
            updateChartSize.cancel();
        };
    }, [updateChartSize]);

    return (
        <Card ref={chartRef} style={{ height: '100%', width: '100%' }}>
            {chartSize.width ? chart(chartSize.width, chartSize.height) : <Fallback />}
        </Card>
    );
};

export default React.memo(ChartWrapper);
