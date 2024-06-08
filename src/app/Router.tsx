import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from './pages/layout';
import ErrorPage from './pages/errors/error-page';
import routerMeta from '../lib/routerMeta';

const routes = Object.values(routerMeta).map((route) => ({
    path: route.path,
    element: route.element,
    errorElement: <ErrorPage />
}));

const router = createBrowserRouter([
    {
        path: '',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: routes
    }
]);

const Router = () => {
    return <RouterProvider router={router} />;
};

export default Router;
