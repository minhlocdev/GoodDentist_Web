import { ContentLayout } from '../../../components/admin-panel/content-layout';
import ClinicChainTable from './clinic-chain-table';

const ClinicChain = () => {
    return (
        <ContentLayout title="Quản lý chi nhánh">
            <div className="rounded-md border border-neutral-200 bg-white p-4">
                <ClinicChainTable />
            </div>
        </ContentLayout>
    );
};

export default ClinicChain;
