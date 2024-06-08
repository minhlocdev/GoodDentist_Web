import DashboardPage from '../app/pages/dashboard/dashboard';
import ErrorPage from '../app/pages/errors/error-page';
import ServicePage from '../app/pages/service/service';
import StaffPage from '../app/pages/staff/staff';

export interface IRouterMeta {
    name?: string;
    path: string;
    element: React.ReactNode;
    isCommon?: boolean;
    isAuth?: boolean;
}

export type RouterMetaType = Record<string, IRouterMeta>;

const routerMeta: RouterMetaType = {
    Dashboard: {
        name: 'DashboardPage',
        path: '/',
        element: <DashboardPage />,
        isCommon: true
    },
    Staff: {
        name: 'Staff Management',
        path: '/staffs',
        element: <StaffPage />,
        isAuth: true
    },
    Service: {
        name: 'Services',
        path: '/services',
        element: <ServicePage />
    },
    Customers: {
        name: 'Customer Management',
        path: '/customers',
        element: <StaffPage />
    },
    Calendars: {
        name: 'Calendar Management',
        path: '/calendars',
        element: <StaffPage />
    },
    PendingAppointment: {
        name: 'Pending Appointment',
        path: '/calendars/pending-appointment',
        element: <StaffPage />
    },
    ClinicChain: {
        name: 'Clinic Chain Management',
        path: '/clinic-chain',
        element: <StaffPage />
    },
    MaterialDentals: {
        name: 'Material Dentals',
        path: '/material-dentals',
        element: <StaffPage />
    },
    Medicines: {
        name: 'Medicines',
        path: '/medicines',
        element: <StaffPage />
    },
    RevenueStatistical: {
        name: 'Revenue Statistical',
        path: '/revenue-statistical',
        element: <StaffPage />
    },
    AppointmentStatistical: {
        name: 'Appointment Statistical',
        path: '/appointment-statistical',
        element: <StaffPage />
    },
    CustomerStatistical: {
        name: 'Customer Statistical',
        path: '/customer-statistical',
        element: <StaffPage />
    },
    ActivityLog: {
        name: 'Activity Log',
        path: '/activity-log',
        element: <StaffPage />
    },
    Account: {
        name: 'Account',
        path: '/account',
        element: <StaffPage />
    },
    Profile: {
        name: 'Profile',
        path: '/profile/:username/*',
        element: <StaffPage />
    },
    SignIn: {
        name: 'Sign in',
        path: '/login',
        element: <StaffPage />
    },
    SignUp: {
        name: 'Sign up',
        path: '/register',
        element: <StaffPage />
    },
    NotFound: {
        path: '/*',
        element: <ErrorPage />
    }
};

export default routerMeta;
