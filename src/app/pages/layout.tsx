import { Suspense } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminPanelLayout from '../../components/admin-panel/admin-panel-layout';
import DoctorPanelLayout from '../../components/doctor-panel/doctor-panel-layout';
import StaffPanelLayout from '../../components/staff-panel/staff-panel-layout';
import BackdropLoader from '../../components/ui/local/backdrop-loader';
import { useAuth } from '../../hooks/use-auth';

export default function Layout() {
    const { user } = useAuth();
    const navigate = useNavigate();

    // Determine the layout component based on roleId
    const getLayoutComponent = (roleId: number) => {
        switch (roleId) {
            case 1:
                return AdminPanelLayout;
            case 2:
                return StaffPanelLayout;
            case 3:
                return DoctorPanelLayout;
            default:
                return null;
        }
    };

    const LayoutComponent = getLayoutComponent(user?.roleId ?? 0);

    if (!LayoutComponent) {
        navigate('/login', { replace: true });
        return null;
    }

    return (
        <Suspense fallback={<BackdropLoader />}>
            <LayoutComponent>
                <Outlet />
            </LayoutComponent>
        </Suspense>
    );
}
