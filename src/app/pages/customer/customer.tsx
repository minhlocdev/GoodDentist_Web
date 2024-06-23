import { ContentLayout } from '../../../components/admin-panel/content-layout';
import { CustomerDataTable } from './customer-data-table';

const CustomerPage = () => {
    return (
        <ContentLayout title="Quản lý khách hàng">
            <div className="rounded-md border border-neutral-200 bg-white p-4">
                <CustomerDataTable />
            </div>
        </ContentLayout>
    );
};

export default CustomerPage;
