import {
    AreaChart,
    Calendar,
    CircleUser,
    Container,
    Home,
    SquareActivity,
    SquarePen,
    User,
    Users
} from 'lucide-react';

interface Submenu {
    href: string;
    label: string;
    active: boolean;
}

interface Menu {
    href: string;
    label: string;
    active: boolean;
    icon: any;
    submenus: Submenu[];
}

interface Group {
    groupLabel: string;
    menus: Menu[];
}

export function getMenuList(pathname: string): Group[] {
    return [
        {
            groupLabel: '',
            menus: [
                {
                    href: '/',
                    label: 'Trang chủ',
                    active: pathname === '/',
                    icon: Home,
                    submenus: []
                }
            ]
        },
        {
            groupLabel: 'Phòng khám',
            menus: [
                {
                    href: '/staffs',
                    label: 'Quản lý nhân sự',
                    active: pathname.includes('/staffs'),
                    icon: Users,
                    submenus: []
                },
                {
                    href: '/customers',
                    label: 'Quản lý khách hàng',
                    active: pathname.includes('/customers'),
                    icon: User,
                    submenus: []
                },
                {
                    href: '',
                    label: 'Quản lý lịch hẹn',
                    active: pathname.includes('/calendars'),
                    icon: Calendar,
                    submenus: [
                        {
                            href: '/calendars',
                            label: 'Danh sách lịch hẹn',
                            active: pathname === '/calendars'
                        },
                        {
                            href: '/calendars/pending-appointment',
                            label: 'Lịch hẹn lại & Booking',
                            active: pathname === '/calendars/pending-appointment'
                        }
                    ]
                },
                {
                    href: '/clinic-chain',
                    label: 'Quản lý chi nhánh',
                    active: pathname.includes('/clinic-chain'),
                    icon: SquarePen,
                    submenus: []
                },
                {
                    href: '',
                    label: 'Quản lý kho',
                    active:
                        pathname.includes('/material-dentals') || pathname.includes('/medicines'),
                    icon: Container,
                    submenus: [
                        {
                            href: '/material-dentals',
                            label: 'Quản lý vật tư',
                            active: pathname === '/material-dentals'
                        },
                        {
                            href: '/medicines',
                            label: 'Quản lý thuốc',
                            active: pathname === '/medicines'
                        }
                    ]
                }
            ]
        },
        {
            groupLabel: 'Báo cáo & Thống kê',
            menus: [
                {
                    href: '',
                    label: 'Các danh mục thống kê',
                    active: pathname.includes('statistical'),
                    icon: AreaChart,
                    submenus: [
                        {
                            href: '/revenue-statistical',
                            label: 'Doanh thu',
                            active: pathname === '/revenue-statistical'
                        },
                        {
                            href: '/appointment-statistical',
                            label: 'Lịch hẹn',
                            active: pathname === '/appointment-statistical'
                        },
                        {
                            href: '/customer-statistical',
                            label: 'Khách hàng',
                            active: pathname === '/customer-statistical'
                        }
                    ]
                },
                {
                    href: '/activity-log',
                    label: 'Nhật ký hoạt động',
                    active: pathname.includes('/activity-log'),
                    icon: SquareActivity,
                    submenus: []
                }
            ]
        },
        {
            groupLabel: 'Cài đặt',
            menus: [
                {
                    href: '/account',
                    label: 'Account',
                    active: pathname.includes('/account'),
                    icon: CircleUser,
                    submenus: []
                }
            ]
        }
    ];
}
