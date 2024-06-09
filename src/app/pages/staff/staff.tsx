import { ContentLayout } from '../../../components/admin-panel/content-layout';
import users from '../../../lib/interfaces/IUser';
import { columns } from './columns';
import { StaffDataTable } from './staff-data-table';

const StaffPage = () => {
    return (
        <ContentLayout title="Quản lý nhân sự">
            <div className="rounded-md border border-neutral-200 bg-white p-4">
                <StaffDataTable columns={columns} data={users} />
            </div>
        </ContentLayout>
    );
};

export default StaffPage;
