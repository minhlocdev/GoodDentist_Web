import { MedicineModal } from './medicine-modal';
import MedicineTable from './medicine-table';

const MedicineProfile = () => {
    return (
        <div className="flex flex-col gap-y-3 rounded-sm border border-neutral-300 bg-white p-6 ">
            <div className="mb-2 flex w-full items-center justify-between ">
                <h1 className="text-lg font-semibold">Danh sách đơn thuốc</h1>
                <MedicineModal />
            </div>
            <MedicineTable />
        </div>
    );
};

export default MedicineProfile;
