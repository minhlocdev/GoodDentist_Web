import { Outlet } from 'react-router-dom';
import AdminPanelLayout from '../../components/admin-panel/admin-panel-layout';
export default function Layout() {
    return (
        <AdminPanelLayout>
            <Outlet />
        </AdminPanelLayout>
    );
}
