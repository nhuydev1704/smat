import useAppStore from '@/store/app';
import { Column, ColumnConfig } from '@ant-design/charts';
import { DatePicker, Flex, Select, Space, Typography } from 'antd';
import { memo, useMemo } from 'react';

const HEADER_HEIGHT = 52;

const CustomerReport = ({ width, height }: { width: number; height: number }) => {
    const { settings } = useAppStore();

    const data = useMemo(
        () => [
            { letter: 'A', frequency: 8167 },
            { letter: 'B', frequency: 1492 },
            { letter: 'C', frequency: 2782 },
            { letter: 'D', frequency: 4253 },
            { letter: 'E', frequency: 12702 },
            { letter: 'F', frequency: 2288 },
            { letter: 'G', frequency: 2015 },
            { letter: 'H', frequency: 6094 },
            { letter: 'I', frequency: 6966 },
            { letter: 'J', frequency: 153 },
            { letter: 'K', frequency: 772 },
            { letter: 'L', frequency: 4025 },
            { letter: 'M', frequency: 2406 },
            { letter: 'N', frequency: 6749 },
            { letter: 'O', frequency: 7507 },
            { letter: 'P', frequency: 1929 },
            { letter: 'Q', frequency: 95 },
            { letter: 'R', frequency: 5987 },
            { letter: 'S', frequency: 6327 },
            { letter: 'T', frequency: 9056 },
            { letter: 'U', frequency: 2758 },
            { letter: 'V', frequency: 978 },
            { letter: 'W', frequency: 236 },
            { letter: 'X', frequency: 15 },
            { letter: 'Y', frequency: 1974 },
            { letter: 'Z', frequency: 74 },
        ],
        []
    );

    const config: ColumnConfig = useMemo(
        () => ({
            data,
            autoFit: true,
            xField: 'letter',
            yField: 'frequency',
            theme: settings.navTheme === 'realDark' ? 'classicDark' : 'light',
        }),
        [data, settings.navTheme]
    );

    return (
        <div>
            <Flex justify="space-between" align="center" style={{ padding: '0 20px', height: HEADER_HEIGHT }}>
                <Typography.Text strong>Báo cáo KH</Typography.Text>
                <Space>
                    <Select rootClassName="grid-cancel" defaultValue="month">
                        <Select.Option value="day">Hôm nay</Select.Option>
                        <Select.Option value="week">Tuần này</Select.Option>
                        <Select.Option value="month">Tháng này</Select.Option>
                    </Select>
                    <DatePicker
                        rootClassName="grid-cancel"
                        popupStyle={{ zIndex: 9999 }}
                        onMouseDown={(e) => {
                            e.stopPropagation();
                        }}
                    />
                </Space>
            </Flex>
            <Column {...config} width={width} height={height - HEADER_HEIGHT} />
        </div>
    );
};

export default memo(CustomerReport);
