import { ContentLayout } from '../../../components/ui/local/layouts/content-layout';
import { MedicineDataTable } from './medicine-data-table';

const MedicincePage = () => {
    return (
        <ContentLayout title="Quản lý thuốc">
            <div className="rounded-md border border-neutral-200 bg-white p-4">
                <MedicineDataTable />
            </div>
        </ContentLayout>
    );
};

export default MedicincePage;
