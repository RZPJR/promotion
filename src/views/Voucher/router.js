export default [
    {
        path: '/promotion/voucher',
        name: 'VoucherList',
        component: () => import("./Index.vue"),
        meta: {
            title: 'Voucher List'
        }
    },
    {
        path: '/promotion/voucher/detail/:id',
        name: 'VoucherDetail',
        component: () => import("./Detail"),
        meta: {
            title: 'Voucher Detail',
            breadcrumbs: [
                {
                    text: 'Voucher List',
                    to: '/promotion/voucher'
                },
                {
                    text: 'Voucher Detail',
                },
            ],
        }
    },
    // {
    //     path: '/promotion/voucher/create',
    //     name: 'VoucherCreate',
    //     component: () => import("./Create"),
    //     meta: {
    //         title: 'Create Voucher',
    //         breadcrumbs: [
    //             {
    //                 text: 'Voucher List',
    //                 to: '/promotion/voucher'
    //             },
    //             {
    //                 text: 'Create Voucher',
    //             },
    //         ],
    //     }
    // },
]