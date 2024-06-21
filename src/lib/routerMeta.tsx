import AppointmentPage from '../app/pages/appoinment/appointment';
import PendingAppointment from '../app/pages/appoinment/pending-appointment';
import ClinicChain from '../app/pages/clinic-chain/clinic-chain';
import CustomerPage from '../app/pages/customer/customer';
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
        isAuth: true,
        isCommon: true
    },
    Service: {
        name: 'Services',
        path: '/services',
        element: <ServicePage />,
        isCommon: true
    },
    Customers: {
        name: 'Customer Management',
        path: '/customers',
        element: <CustomerPage />,
        isCommon: true
    },
    Calendars: {
        name: 'Calendar Management',
        path: '/calendars',
        element: <AppointmentPage />,
        isCommon: false
    },
    PendingAppointment: {
        name: 'Pending Appointment',
        path: '/calendars/pending-appointment',
        element: <PendingAppointment />,
        isCommon: false
    },
    ClinicChain: {
        name: 'Clinic Chain Management',
        path: '/clinic-chain',
        element: <ClinicChain />,
        isCommon: true
    },
    MaterialDentals: {
        name: 'Material Dentals',
        path: '/material-dentals',
        element: <StaffPage />,
        isCommon: true
    },
    Medicines: {
        name: 'Medicines',
        path: '/medicines',
        element: <StaffPage />,
        isCommon: true
    },
    RevenueStatistical: {
        name: 'Revenue Statistical',
        path: '/revenue-statistical',
        element: <StaffPage />,
        isCommon: true
    },
    AppointmentStatistical: {
        name: 'Appointment Statistical',
        path: '/appointment-statistical',
        element: <StaffPage />,
        isCommon: true
    },
    CustomerStatistical: {
        name: 'Customer Statistical',
        path: '/customer-statistical',
        element: <StaffPage />,
        isCommon: true
    },
    ActivityLog: {
        name: 'Activity Log',
        path: '/activity-log',
        element: <StaffPage />,
        isCommon: true
    },
    Account: {
        name: 'Account',
        path: '/account',
        element: <StaffPage />,
        isCommon: true
    },
    Profile: {
        name: 'Profile',
        path: '/profile/:username/*',
        element: <StaffPage />,
        isCommon: true
    },
    NotFound: {
        path: '/*',
        element: <ErrorPage />,
        isCommon: true
    }
};

export default routerMeta;
