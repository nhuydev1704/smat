import { LocaleFormatter } from '@/locales';
import { ChromeFilled, CrownFilled, PayCircleFilled, SmileFilled } from '@ant-design/icons';

interface MenuItem {
    path?: string;
    name: JSX.Element | string;
    icon: JSX.Element;
    children?: MenuItem[];
}

const menus: MenuItem[] = [
    {
        path: '/',
        name: <LocaleFormatter id="app.menu.dashboard" />,
        icon: <SmileFilled />,
    },
    {
        name: <LocaleFormatter id="app.menu.sell" />,
        icon: <PayCircleFilled />,
        children: [
            {
                path: '/sell/order',
                name: <LocaleFormatter id="app.menu.order" />,
                icon: <CrownFilled />,
            },
            {
                path: '/sell/pos',
                name: <LocaleFormatter id="app.menu.pos" />,
                icon: <CrownFilled />,
            },
            {
                path: '/sell/sale',
                name: <LocaleFormatter id="app.menu.sale" />,
                icon: <CrownFilled />,
            },
        ],
    },

    {
        path: '/customer',
        name: 'Khách hàng',
        icon: <ChromeFilled />,
    },
];

// [
//   {
//     path: '/',
//     name: '首页',
//     icon: <HomeOutlined />
//   },
//   {
//     name: '欢迎-分组',
//     icon: <SmileOutlined />,
//     children: [
//       {
//         name: '欢迎',
//         path: '/hello-world',
//         hideChildrenInMenu: true,
//         children: [
//           {
//             name: '欢迎欢迎',
//             path: '/hello-world-child'
//           }
//         ]
//       }
//     ]
//   }
// ];

export default menus;
