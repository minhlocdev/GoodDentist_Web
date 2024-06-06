import { Navigate } from 'react-router-dom';
import routerMeta from '../../lib/routerMeta';

interface IProtectedRoute {
    children: JSX.Element;
    path: string;
}

const ProtectedRoute = ({ children, path }: IProtectedRoute) => {
    const isLogin = true;

    if (
        !isLogin &&
        (path === routerMeta.Dashboard.path ||
            path === routerMeta.Staff.path ||
            path === routerMeta.Service.path)
    ) {
        return <Navigate to={routerMeta.SignIn.path} replace={true} />;
    }

    if (isLogin && (path === routerMeta.SignUp.path || path === routerMeta.SignIn.path)) {
        return <Navigate to={routerMeta.Dashboard.path} replace={true} />;
    }

    return children;
};
export default ProtectedRoute;
