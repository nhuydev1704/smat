import React, { Suspense } from 'react';
import { Layouts, Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import Fallback from './Fallback';

const ResponsiveGridLayout = WidthProvider(Responsive);
const ChartWrapper = React.lazy(() => import('./ChartWrapper'));

interface GridLayoutComponentProps {
    charts: {
        id: string;
        chart: (width: number, height: number) => JSX.Element;
    }[];
    layouts: Layouts;
}

const GridLayoutComponent: React.FC<GridLayoutComponentProps> = ({ layouts, charts }) => {
    const breakpoints = { lg: 1200, md: 996, sm: 768 };
    const cols = { lg: 12, md: 12, sm: 12 };

    return (
        <ResponsiveGridLayout
            className="layout"
            layouts={layouts}
            breakpoints={breakpoints}
            cols={cols}
            compactType="vertical"
            preventCollision={false}
            onLayoutChange={(layout, layouts) => console.log(layout, layouts)}
            containerPadding={[0, 0]}
            rowHeight={150}
            draggableCancel=".grid-cancel"
        >
            {charts.map(({ id, chart }) => (
                <div key={id}>
                    <Suspense fallback={<Fallback />}>
                        <ChartWrapper chart={chart} />
                    </Suspense>
                </div>
            ))}
        </ResponsiveGridLayout>
    );
};

export default React.memo(GridLayoutComponent);
