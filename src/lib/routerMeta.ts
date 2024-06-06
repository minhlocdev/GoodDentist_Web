export interface IRouterMeta {
    name?: string;
    path: string;
    isShow: boolean;
    isCommon?: boolean;
    isAuth?: boolean;
    icon?: string;
}

export type RouterMetaType = Record<string, IRouterMeta>;

const routerMeta: RouterMetaType = {
    Dashboard: {
        name: 'DashboardPage',
        path: '/dashboard',
        isShow: true,
        isCommon: true
    },
    Staff: {
        name: 'Staff Management',
        path: '/staffs',
        isShow: true,
        isAuth: true,
        icon: 'ion-compose'
    },
    Service: {
        name: 'Services',
        path: '/services',
        isShow: false
    },
    Setting: {
        name: 'Setting',
        path: '/settings',
        isShow: true,
        isAuth: true,
        icon: 'ion-gear-a'
    },
    Profile: {
        name: 'Profile',
        path: '/profile/:username/*',
        isShow: false
    },
    SignIn: {
        name: 'Sign in',
        path: '/login',
        isShow: true,
        isAuth: false
    },
    SignUp: {
        name: 'Sign up',
        path: '/register',
        isShow: true,
        isAuth: false
    },
    NotFound: {
        path: '/*',
        isShow: false
    }
};

export default routerMeta;
