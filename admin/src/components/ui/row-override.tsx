import { Row } from 'antd';
import React from 'react';

const RowOverride = ({ children }: { children: React.ReactNode }) => {
    return (
        <Row
            gutter={[24, 24]}
            style={{
                borderRadius: 'var(--card-border-radius-lg, 8px)',
            }}
        >
            {' '}
            {children}
        </Row>
    );
};

export default RowOverride;
