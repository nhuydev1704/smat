import React, { memo, useState } from 'react';
import ProCard from '@ant-design/pro-card'; // Import Ant Design components
import RcResizeObserver from 'rc-resize-observer';
import { Splitter } from 'antd';

interface CustomSplitterLayoutProps {
    panels: {
        itemKey: string;
        title: string;
        content: React.ReactNode | ((responsive: boolean) => React.ReactNode);
        defaultSize?: number;
        min?: number;
        max?: number;
        isSpace?: boolean;
        isCard?: boolean;
    }[];
    responsiveBreakPoint?: number; // Breakpoint for responsive split direction
}

const CustomSplitterLayout: React.FC<CustomSplitterLayoutProps> = ({ panels, responsiveBreakPoint = 596 }) => {
    const [responsive, setResponsive] = useState(false);

    return (
        <Splitter style={{ height: 'fit-content' }}>
            {panels.map((panel) => (
                <Splitter.Panel
                    key={panel.itemKey}
                    defaultSize={panel.defaultSize}
                    min={panel.min}
                    max={panel.max}
                    style={panel?.isSpace ? { paddingLeft: '24px' } : undefined}
                >
                    {panel.isCard && typeof panel.content === 'function' ? (
                        <RcResizeObserver
                            key="resize-observer"
                            onResize={(offset) => setResponsive(offset.width < responsiveBreakPoint)}
                        >
                            {panel.content(responsive)}
                        </RcResizeObserver>
                    ) : (
                        <ProCard style={{ height: '100%' }} title={panel.title} bordered headerBordered size="small">
                            {typeof panel.content !== 'function' && panel.content}
                        </ProCard>
                    )}
                </Splitter.Panel>
            ))}
        </Splitter>
    );
};

export default memo(CustomSplitterLayout);
