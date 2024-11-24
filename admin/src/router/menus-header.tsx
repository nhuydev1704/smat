import IconAddVoucher from '@/assets/icons/IconAddVoucher';
import IconGuide from '@/assets/icons/IconGuide';
import IconHelp from '@/assets/icons/IconHelp';

export const MENUS_HEADER = [
    {
        title: 'Hướng dẫn',
        path: '/',
        icon: <IconGuide />,
    },
    {
        title: 'Hỗ trợ',
        path: '/help',
        icon: <IconHelp />,
    },
    {
        title: 'Tạo eVoucher',
        path: '/voucher',
        icon: <IconAddVoucher />,
    },
];
