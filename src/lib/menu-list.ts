import {
    AreaChart,
    Calendar,
    CalendarCheck,
    CircleUser,
    ClipboardPlusIcon,
    Container,
    Home,
    Hospital,
    Receipt,
    SquareActivity,
    SquarePen,
    User,
    UserCog,
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
                    active: pathname.includes('/medicines') || pathname.includes('/services'),
                    icon: Container,
                    submenus: [
                        {
                            href: '/medicines',
                            label: 'Quản lý thuốc',
                            active: pathname === '/medicines'
                        },
                        {
                            href: '/services',
                            label: 'Quản lý dịch vụ',
                            active: pathname === '/services'
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
                    href: '/permissions',
                    label: 'Phân quyền',
                    active: pathname.includes('/permissions'),
                    icon: UserCog,
                    submenus: []
                },
                {
                    href: '/account',
                    label: 'Tài khoản',
                    active: pathname.includes('/account'),
                    icon: CircleUser,
                    submenus: []
                }
            ]
        }
    ];
}

export function getDoctorMenuList(pathname: string): Group[] {
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
                    href: '/customers',
                    label: 'Quản lý bệnh nhân',
                    active: pathname.includes('/customers'),
                    icon: User,
                    submenus: []
                },

                {
                    href: '/dentist-slots',
                    label: 'Quản lý lịch làm việc',
                    active: pathname.includes('/dentist-slots'),
                    icon: CalendarCheck,
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
                        }
                    ]
                }
            ]
        },
        {
            groupLabel: 'Cài đặt',
            menus: [
                {
                    href: '/account',
                    label: 'Tài khoản',
                    active: pathname.includes('/account'),
                    icon: CircleUser,
                    submenus: []
                }
            ]
        }
    ];
}

export function getStaffMenuList(pathname: string): Group[] {
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
                    href: '/customers',
                    label: 'Quản lý bệnh nhân',
                    active: pathname.includes('/customers'),
                    icon: User,
                    submenus: []
                },
                {
                    href: '/examination-profiles',
                    label: 'Quản lý hồ sơ khám bệnh',
                    active: pathname.includes('/examination-profiles'),
                    icon: ClipboardPlusIcon,
                    submenus: []
                },
                {
                    href: '/dentist-slots',
                    label: 'Quản lý lịch làm việc',
                    active: pathname.includes('/dentist-slots'),
                    icon: CalendarCheck,
                    submenus: []
                },
                {
                    href: '',
                    label: 'Quản lý lịch hẹn',
                    active:
                        pathname.includes('/calendars') ||
                        pathname.includes('/calendars/pending-appointment'),
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
                    href: '',
                    label: 'Quản lý kho',
                    active: pathname.includes('/medicines'),
                    icon: Container,
                    submenus: [
                        {
                            href: '/medicines',
                            label: 'Quản lý thuốc',
                            active: pathname === '/medicines'
                        },
                        {
                            href: '/rooms',
                            label: 'Quản lý phòng khám',
                            active: pathname === '/rooms'
                        },
                        {
                            href: '/services',
                            label: 'Quản lý dịch vụ',
                            active: pathname === '/services'
                        }
                    ]
                },
                {
                    href: '/payments',
                    label: 'Quản lý doanh thu',
                    active: pathname.includes('/payments'),
                    icon: Receipt,
                    submenus: []
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
                    label: 'Tài khoản',
                    active: pathname.includes('/account'),
                    icon: CircleUser,
                    submenus: []
                },
                {
                    href: '/clinic-information',
                    label: 'Phòng khám',
                    active: pathname.includes('/clinic-information'),
                    icon: Hospital,
                    submenus: []
                }
            ]
        }
    ];
}
