import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '../../../components/ui/dialog';

import { format } from 'date-fns';
import { Button } from '../../../components/ui/button';
import { useExaminationStore } from '../../../hooks/use-examination-store';
import { IExamination } from '../../../lib/interfaces/examination-types/IExamination';
import { IOrder } from '../../../lib/interfaces/order-types/IOrder';
import SelectServiceTable from './selected-service-table';
import { TreatmentServiceModal } from './treatment-service-modal';

interface TreatmentModalProps {
    examination: IExamination;
    order?: IOrder;
}

export const TreatmentModal = ({ examination, order }: TreatmentModalProps) => {
    const { setSelectedExamination, setOrders, setSelectedOrder } = useExaminationStore();
    const handleOnClick = () => {
        setSelectedExamination(examination);
        setOrders(examination.orders!);
        setSelectedOrder(order!);
    };
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button onClick={handleOnClick}>
                        {examination.orders!.length > 0 ? 'Chỉnh sửa' : 'Thêm kế hoạch điều trị'}
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[70vw]">
                    <DialogHeader>
                        <DialogTitle>Thêm kế hoạch điều trị</DialogTitle>
                    </DialogHeader>
                    <div className="w-full p-6">
                        <div className="flex w-full">
                            <div className="text-lg font-semibold">
                                Dịch vụ thực hiện<span className="text-red-500">*</span>
                            </div>
                            <div className="ml-auto">
                                <TreatmentServiceModal />
                            </div>
                        </div>
                        <div className="mt-3 flex w-full items-center gap-x-3">
                            <div className="text-lg font-semibold">Chuẩn đoán:</div>
                            <div>{examination.diagnosis}</div>
                            <div className="ml-auto text-lg font-semibold">Ngày/giờ thực hiện</div>
                            <div>{format(examination.timeStart, 'dd-MM-yyyy HH:mm')}</div>
                        </div>
                        <div className="max-w-full">
                            <SelectServiceTable />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};
