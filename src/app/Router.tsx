import React, { ComponentType, LazyExoticComponent } from 'react';
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements
} from 'react-router-dom';
import ProtectedRoute from '../components/HOC/ProtectedRoute';
import routerMeta, { IRouterMeta } from '../lib/routerMeta';
import ErrorPage from './pages/errors/error-page';
import Layout from './pages/layout';

interface ModuleType {
    default: ComponentType<any>;
}

const lazyImport = (pageName: string): LazyExoticComponent<ComponentType<any>> => {
    return React.lazy(() =>
        import(`./pages/${pageName.toLowerCase()}/${pageName.toLowerCase()}`).then(
            (module): ModuleType => ({
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                default: module.default
            })
        )
    );
};

// Dynamically create routes based on routerMeta
const routes = Object.keys(routerMeta).map((key) => {
    const meta: IRouterMeta = routerMeta[key];
    const Component = lazyImport(key);

    return (
        <Route
            key={meta.path}
            path={meta.path}
            element={
                <ProtectedRoute path={meta.path}>
                    <Component />
                </ProtectedRoute>
            }
        />
    );
});

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
            {routes}
        </Route>
    )
);

const Router = () => {
    return <RouterProvider router={router} />;
};
export default Router;
