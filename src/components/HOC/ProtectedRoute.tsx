import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';

interface IProtectedRoute {
    children: ReactNode;
    path: string;
}
const ProtectedRoute = ({ children, path }: IProtectedRoute) => {
    const { accessToken } = useAuth();
    const isLogin = !!accessToken;
    if (!isLogin) {
        return <Navigate to={"/login"} replace={true} />;
    }

    if (isLogin && path === "/login") {
        return <Navigate to={'/'} replace={true} />;
    }
    return children;
};
export default ProtectedRoute;
