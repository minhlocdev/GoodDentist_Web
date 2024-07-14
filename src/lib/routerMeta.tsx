/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import NotFoundPage from '../app/pages/errors/404-page';
import ExaminationProfile from '../app/pages/examination-profile/examination-profile';
import UserPermission from '../app/pages/permission/user-permission';

const AppointmentPage = lazy(() => import('../app/pages/appoinment/appointment'));
const PendingAppointment = lazy(() => import('../app/pages/appoinment/pending-appointment'));
const ClinicChain = lazy(() => import('../app/pages/clinic-chain/clinic-chain'));
const CustomerPage = lazy(() => import('../app/pages/customer/customer'));
const DashboardPage = lazy(() => import('../app/pages/dashboard/dashboard'));
const MedicincePage = lazy(() => import('../app/pages/medicine/medicine'));
const ServicePage = lazy(() => import('../app/pages/service/service'));
const StaffPage = lazy(() => import('../app/pages/staff/staff'));

export interface IRouterMeta {
    name?: string;
    path: string;
    element: React.ReactNode;
    isCommon?: boolean;
    isAuth?: boolean;
}
//TODO
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
    Medicines: {
        name: 'Medicines',
        path: '/medicines',
        element: <MedicincePage />,
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
    Permission: {
        name: 'Permission',
        path: '/permissions',
        element: <UserPermission />,
        isCommon: true
    },
    Account: {
        name: 'Account',
        path: '/account',
        element: <StaffPage />,
        isCommon: true
    },
    ExaminationProfile: {
        name: 'Examination Profile',
        path: '/examination-profile/:code',
        element: <ExaminationProfile />,
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
        element: <NotFoundPage />,
        isCommon: true
    }
};

export default routerMeta;
