import { Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './app/pages/errors/error-page';
import Layout from './app/pages/layout';
import LoginPage from './app/pages/login/login';
import ProtectedRoute from './components/HOC/ProtectedRoute';
import BackdropLoader from './components/ui/local/backdrop-loader';
import routerMeta from './lib/routerMeta';

const routes = Object.values(routerMeta).map((route) => ({
    path: route.path,
    element: (
        <ProtectedRoute path={route.path}>
            <Suspense fallback={<BackdropLoader />}>{route.element}</Suspense>
        </ProtectedRoute>
    ),
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
