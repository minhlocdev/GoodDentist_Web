import { LayoutGrid, Settings, SquarePen, Tag, Users } from 'lucide-react';

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
                    href: '/dashboard',
                    label: 'Dashboard',
                    active: pathname.includes('/dashboard'),
                    icon: LayoutGrid,
                    submenus: []
                }
            ]
        },
        {
            groupLabel: 'Clinic',
            menus: [
                {
                    href: '/staffs',
                    label: 'Staff',
                    active: pathname.includes('/staffs'),
                    icon: SquarePen,
                    submenus: []
                },
                {
                    href: '/services',
                    label: 'Service',
                    active: pathname.includes('/services'),
                    icon: Tag,
                    submenus: [
                        {
                            href: '/services',
                            label: 'All Services',
                            active: pathname === '/services'
                        }
                    ]
                }
            ]
        },
        {
            groupLabel: 'Settings',
            menus: [
                {
                    href: '/users',
                    label: 'Users',
                    active: pathname.includes('/users'),
                    icon: Users,
                    submenus: []
                },
                {
                    href: '/account',
                    label: 'Account',
                    active: pathname.includes('/account'),
                    icon: Settings,
                    submenus: []
                }
            ]
        }
    ];
}
