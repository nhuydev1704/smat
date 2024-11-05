import { ChromeFilled, CrownFilled, PayCircleFilled, SmileFilled, TabletFilled } from '@ant-design/icons';

export default {
    route: {
        path: '/',
        routes: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                icon: <SmileFilled />,
                component: './Welcome',
            },
            {
                path: '/sell',
                name: 'Bán hàng',
                icon: <PayCircleFilled />,
                component: './Admin',
                routes: [
                    {
                        path: '/sell/order',
                        name: 'Đơn hàng',
                        icon: <CrownFilled />,
                        component: './Welcome',
                    },
                    {
                        path: '/sell/pos',
                        name: 'POS',
                        icon: <CrownFilled />,
                        component: './Welcome',
                    },
                    {
                        path: '/sell/sale',
                        name: 'Chương trình bán hàng',
                        icon: <CrownFilled />,
                        component: './Welcome',
                    },
                ],
            },

            {
                path: '/customer',
                name: 'Khách hàng',
                icon: <ChromeFilled />,
            },
        ],
    },
    location: {
        pathname: '/',
    },
};
