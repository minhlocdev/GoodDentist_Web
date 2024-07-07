import { ContentLayout } from '../../../components/admin-panel/content-layout';
import { StaffDataTable } from './staff-data-table';

const StaffPage = () => {
    return (
        <ContentLayout title="Quản lý nhân sự">
            <div className="rounded-md border border-neutral-200 bg-white p-4">
                <StaffDataTable />
            </div>
        </ContentLayout>
    );
};

export default StaffPage;
