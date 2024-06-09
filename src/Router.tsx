import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routerMeta from './lib/routerMeta';
import ErrorPage from './app/pages/errors/error-page';
import Layout from './app/pages/layout';


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
