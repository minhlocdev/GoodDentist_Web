import { ContentLayout } from '../../../components/admin-panel/content-layout';
import { customers } from '../../../lib/interfaces/ICustomer';
import { columns } from '../customer/colunms';
import { CustomerDataTable } from '../customer/customer-data-table';

const ClinicChain = () => {
    return (
        <ContentLayout title="Quản lý chi nhánh">
            <div className="rounded-md border border-neutral-200 bg-white p-4">
                <CustomerDataTable columns={columns} data={customers} />
            </div>
        </ContentLayout>
    );
};

export default ClinicChain;
