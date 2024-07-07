import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import AdminPanelLayout from '../../components/admin-panel/admin-panel-layout';
import BackdropLoader from '../../components/ui/local/backdrop-loader';
export default function Layout() {
    return (
        <Suspense fallback={<BackdropLoader/>}>
            <AdminPanelLayout>
                <Outlet />
            </AdminPanelLayout>
        </Suspense>
    );
}
