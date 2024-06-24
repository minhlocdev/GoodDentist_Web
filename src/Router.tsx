import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './app/pages/errors/error-page';
import Layout from './app/pages/layout';
import routerMeta from './lib/routerMeta';
import LoginPage from './app/pages/login/login';

const routes = Object.values(routerMeta).map((route) => ({
    path: route.path,
    element: route.element,
    errorElement: <ErrorPage />,
    isCommon: route.isCommon
}));

const router = createBrowserRouter([
    {
        path: '',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: routes
    },
    {
        path: '/login',
        element: <LoginPage />
    }
]);

const Router = () => {
    return <RouterProvider router={router} />;
};

export default Router;
