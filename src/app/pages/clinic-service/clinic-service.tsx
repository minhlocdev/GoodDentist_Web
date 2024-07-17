import { ContentLayout } from '../../../components/ui/local/layouts/content-layout';
import ClinicServiceDataTable from './clinic-service-data-table';

const ClinicServicePage = () => {
    return (
        <ContentLayout title="Quản lý dịch vụ theo phòng khám">
            <div className="rounded-md border border-neutral-200 bg-white p-4">
                <ClinicServiceDataTable />
            </div>
        </ContentLayout>
    );
};

export default ClinicServicePage;
