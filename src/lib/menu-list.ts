import {
    AreaChart,
    Calendar,
    CalendarCheck,
    CircleUser,
    ClipboardPlusIcon,
    Container,
    Home,
    Hospital,
    Image,
    Pill,
    Receipt,
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
                    href: '/examinations',
                    label: 'Quản lý hồ sơ khám bệnh',
                    active: pathname.includes('/examinations'),
                    icon: ClipboardPlusIcon,
                    submenus: []
                },
                {
                    href: '/prescriptions',
                    label: 'Quản lý đơn thuốc',
                    active: pathname.includes('/prescriptions'),
                    icon: Pill,
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
                        },
                        {
                            href: '/calendars/pending-appointment',
                            label: 'Lịch hẹn lại & Booking',
                            active: pathname === '/calendars/pending-appointment'
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
                    href: '/examinations',
                    label: 'Quản lý hồ sơ khám bệnh',
                    active: pathname.includes(''),
                    icon: ClipboardPlusIcon,
                    submenus: []
                },
                {
                    href: '/prescriptions',
                    label: 'Quản lý đơn thuốc',
                    active: pathname.includes('/prescriptions'),
                    icon: Pill,
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
                },
                {
                    href: '/orders',
                    label: 'Quản lý hóa đơn',
                    active: pathname.includes('/orders'),
                    icon: Receipt,
                    submenus: []
                },
                {
                    href: '/medical-records',
                    label: 'Quản lý hình ảnh nha khoa',
                    active: pathname.includes('/medical-records'),
                    icon: Image,
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
