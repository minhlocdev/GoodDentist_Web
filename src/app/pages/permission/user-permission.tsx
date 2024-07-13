import { ContentLayout } from '../../../components/admin-panel/content-layout';
import UserPermissionTable from './permission-table';

const UserPermission = () => {
    return (
        <ContentLayout title="Phân quyền">
            <div className="rounded-md border border-neutral-200 bg-white p-4">
                <UserPermissionTable />
            </div>
        </ContentLayout>
    );
};

export default UserPermission;
