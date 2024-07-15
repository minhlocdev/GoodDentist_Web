import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '../../../components/ui/dialog';

import { SquarePen } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { IDentistSlot } from '../../../lib/interfaces/others/IDentistSlot';
import DentistSlotForm from './dentist-slot-form';
interface SlotModalProps {
    slot?: IDentistSlot;
}
export const SlotModal = ({ slot }: SlotModalProps) => {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {slot ? <SquarePen className="h-5 w-5 text-primary" /> : <Button>Thêm mới</Button>}
            </DialogTrigger>
            <DialogContent className="max-w-[50vw]">
                <DialogHeader>
                    <DialogTitle>{slot ? 'Cập nhật' : 'Thêm mới'} lịch làm việc</DialogTitle>
                </DialogHeader>
                <DentistSlotForm slot={slot} onCloseModal={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
};
