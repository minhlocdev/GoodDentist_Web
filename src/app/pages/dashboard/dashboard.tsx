import AdminPanelLayout from '../../../components/admin-panel/admin-panel-layout';
import { ContentLayout } from '../../../components/admin-panel/content-layout';

export default function DashboardPage() {
    return (
        <AdminPanelLayout>
            <ContentLayout title="Dashboard">
                <h1 className="text-secondary-foreground">Hello World</h1>
            </ContentLayout>
        </AdminPanelLayout>
    );
}
