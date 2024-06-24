import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';

interface IProtectedRoute {
    children: ReactNode;
    path: string;
}
const ProtectedRoute = ({ children, path }: IProtectedRoute) => {
    //TODO
    const { accessToken, user } = useAuth();
    const isLogin = !!(accessToken && user);
    if (!isLogin) {
        return <Navigate to={'/login'} replace={true} />;
    }

    if (isLogin && path === '/login') {
        return <Navigate to={'/'} replace={true} />;
    }
    return children;
};
export default ProtectedRoute;
