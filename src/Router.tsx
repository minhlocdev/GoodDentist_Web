import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './app/pages/errors/error-page';
import Layout from './app/pages/layout';
import StaffPage from './app/pages/staff/staff';
// import routerMeta from './lib/routerMeta';
import AppointmentPage from './app/pages/appoinment/appointment';
import PendingAppointment from './app/pages/appoinment/pending-appointment';
import CustomerPage from './app/pages/customer/customer';
import DashboardPage from './app/pages/dashboard/dashboard';

// const routes = Object.values(routerMeta).map((route) => ({
//     path: route.path,
//     element: route.element,
//     errorElement: <ErrorPage />
// }));

const router = createBrowserRouter([
    {
        path: '',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <DashboardPage />,
                errorElement: <ErrorPage />
            },
            {
                path: '/staffs',
                element: <StaffPage />,
                errorElement: <ErrorPage />
            },
            {
                path: '/customers',
                element: <CustomerPage />,
                errorElement: <ErrorPage />
            },
            {
                path: '/calendars',
                element: <AppointmentPage />,
                errorElement: <ErrorPage />
            },
            {
                path: '/pending-appointment',
                element: <PendingAppointment />,
                errorElement: <ErrorPage />
            }
        ]
    }
]);

const Router = () => {
    return <RouterProvider router={router} />;
};

export default Router;
