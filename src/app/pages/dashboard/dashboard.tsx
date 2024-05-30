import AdminPanelLayout from '../../../components/admin-panel/admin-panel-layout';
import { ContentLayout } from '../../../components/admin-panel/content-layout';

export default function DashboardPage() {
    return (
        <AdminPanelLayout>
            <ContentLayout title="Dashboard">
                <div></div>
            </ContentLayout>
        </AdminPanelLayout>
    );
}
