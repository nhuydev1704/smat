import { ChromeFilled, CrownFilled, PayCircleFilled, SmileFilled } from '@ant-design/icons';
import { MenuDataItem } from '@ant-design/pro-components';

const menus: MenuDataItem[] = [
    {
        path: '/',
        name: 'Dashboard',
        locale: 'app.menu.dashboard',
        icon: <SmileFilled />,
    },
    {
        name: 'Bán hàng',
        locale: 'app.menu.sell',
        icon: <PayCircleFilled />,
        children: [
            {
                name: 'Đơn hàng',
                path: '/sell/order',
                locale: 'app.menu.order',
                icon: <CrownFilled />,
            },
            {
                name: 'POS',
                path: '/sell/pos',
                locale: 'app.menu.pos',
                icon: <CrownFilled />,
            },
            {
                name: 'Chương trình bán hàng',
                path: '/sell/sale',
                locale: 'app.menu.sale',
                icon: <CrownFilled />,
            },
        ],
    },

    // {
    //     path: '/customer',
    //     name: 'Khách hàng',
    //     icon: <ChromeFilled />,
    // },
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
