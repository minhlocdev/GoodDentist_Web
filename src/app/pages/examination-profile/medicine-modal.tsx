import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '../../../components/ui/dialog';

import { Button } from '../../../components/ui/button';

export const MedicineModal = () => {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Thêm đơn thuốc</Button>
                </DialogTrigger>
                <DialogContent className="max-w-[70vw]">
                    <DialogHeader>
                        <DialogTitle>KÊ ĐƠN THUỐC KHÁCH HÀNG</DialogTitle>
                    </DialogHeader>
                    <div className="w-full p-6"></div>
                </DialogContent>
            </Dialog>
        </>
    );
};
