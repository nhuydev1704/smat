import { RouteObject } from 'react-router-dom';

import lazy from '@/helpers/lazy';
import { RootErrorBoundary } from '@/components';
import Layout from '@/layout/Layout';
import Login from '@/features/auth/login';

const DashboardPage = lazy(() => import('@/features/admin/dashboard/DashboardPage'));
const SellOrderPage = lazy(() => import('@/features/admin/sell/pages/sell-order'));
const SellSalePage = lazy(() => import('@/features/admin/sell/pages/sell-sale'));
const SellPosPage = lazy(() => import('@/features/admin/sell/pages/sell-pos'));
const CustomerPage = lazy(() => import('@/features/admin/customer/CustomerPage'));
const NoMatch = lazy(() => import('@/features/auth/no-match'));
const ForgotPassword = lazy(() => import('@/features/auth/forgot-password'));

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

            // auth
            {
                path: '/login',
                caseSensitive: true,
                Component: Login,
            },
            {
                path: '/forgot',
                caseSensitive: true,
                Component: ForgotPassword,
            },
        ],
    },
    {
        path: '*',
        Component: NoMatch,
    },
];

export default routes;
