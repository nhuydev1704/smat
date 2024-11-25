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

// voucher
const VoucherFormPage = lazy(() => import('@/features/admin/voucher/VoucherFormPage'));

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
            },
            {
                path: '/sell/pos',
                Component: SellPosPage,
            },
            {
                path: '/sell/sale',
                Component: SellSalePage,
            },
            {
                path: '/customer',
                Component: CustomerPage,
            },
            // voucher
            {
                path: '/voucher/form',
                Component: VoucherFormPage,
            },

            // auth
            {
                path: '/login',

                Component: Login,
            },
            {
                path: '/forgot',

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
