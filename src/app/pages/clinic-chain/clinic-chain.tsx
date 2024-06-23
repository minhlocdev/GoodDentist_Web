import { ContentLayout } from '../../../components/admin-panel/content-layout';
import { CustomerDataTable } from '../customer/customer-data-table';

const ClinicChain = () => {
    return (
        <ContentLayout title="Quản lý chi nhánh">
            <div className="rounded-md border border-neutral-200 bg-white p-4">
                <CustomerDataTable />
            </div>
        </ContentLayout>
    );
};

export default ClinicChain;
