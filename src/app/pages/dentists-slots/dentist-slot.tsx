import { ContentLayout } from '../../../components/ui/local/layouts/content-layout';
import DentistSlotTable from './slot-table';

const DentistSlot = () => {
    return (
        <ContentLayout title="Quản lý lịch làm việc">
            <div className="rounded-md border border-neutral-200 bg-white p-4">
                <DentistSlotTable />
            </div>
        </ContentLayout>
    );
};

export default DentistSlot;
