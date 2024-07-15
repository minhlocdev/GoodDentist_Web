import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import AdminPanelLayout from '../../components/admin-panel/admin-panel-layout';
import DoctorPanelLayout from '../../components/doctor-panel/doctor-panel-layout';
import StaffPanelLayout from '../../components/staff-panel/staff-panel-layout';
import BackdropLoader from '../../components/ui/local/backdrop-loader';
import { useAuth } from '../../hooks/use-auth';
import ErrorPage from './errors/error-page';

export default function Layout() {
    const { user } = useAuth();
    // Determine the layout component based on roleId
    let LayoutComponent;
    switch (user?.roleId) {
        case 1:
            LayoutComponent = AdminPanelLayout;
            break;
        case 2:
            LayoutComponent = DoctorPanelLayout;
            break;
        case 3:
            LayoutComponent = StaffPanelLayout;
            break;
        default:
            LayoutComponent = ErrorPage;
    }

    return (
        <Suspense fallback={<BackdropLoader />}>
            <LayoutComponent>
                <Outlet />
            </LayoutComponent>
        </Suspense>
    );
}
