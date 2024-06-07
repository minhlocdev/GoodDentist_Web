import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import DashboardPage from './pages/dashboard/dashboard';
import ErrorPage from './pages/errors/error-page';
import Layout from './pages/layout';
import ServicePage from './pages/service/service';
import StaffPage from './pages/staff/staff';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'dashboard',
                element: <DashboardPage />
            },
            {
                path: 'services',
                element: <ServicePage />
            },
            {
                path: 'staffs',
                element: <StaffPage />
            }
        ]
    }
]);
const Router = () => {
    return <RouterProvider router={router} />;
};
export default Router;
