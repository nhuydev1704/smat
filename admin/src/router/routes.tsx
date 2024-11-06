import { RouteObject } from 'react-router-dom';

import lazy from '@/helpers/lazy';
import { RootErrorBoundary } from '@/components';
import Layout from '@/layout/Layout';

const DashboardPage = lazy(() => import('@/features/admin/dashboard/DashboardPage'));
const SellOrderPage = lazy(() => import('@/features/admin/sell/pages/sell-order'));
const SellSalePage = lazy(() => import('@/features/admin/sell/pages/sell-sale'));
const SellPosPage = lazy(() => import('@/features/admin/sell/pages/sell-pos'));
const CustomerPage = lazy(() => import('@/features/admin/customer/CustomerPage'));
const Login = lazy(() => import('@/features/auth/login'));
const NoMatch = lazy(() => import('@/features/auth/no-match'));

const routes: RouteObject[] = [
    {
        Component: Layout,
        errorElement: <RootErrorBoundary />,
        children: [
            {
                path: '/',
                Component: DashboardPage,
            },
            {
                path: '/sell/order',
                Component: SellOrderPage,
                caseSensitive: true,
            },
            {
                path: '/sell/pos',
                Component: SellPosPage,
                caseSensitive: true,
            },
            {
                path: '/sell/sale',
                Component: SellSalePage,
                caseSensitive: true,
            },
            {
                path: '/customer',
                Component: CustomerPage,
                caseSensitive: true,
            },
            {
                path: '/login',
                caseSensitive: true,
                Component: Login,
            },
        ],
    },
    {
        path: '*',
        Component: NoMatch,
    },
];

export default routes;
