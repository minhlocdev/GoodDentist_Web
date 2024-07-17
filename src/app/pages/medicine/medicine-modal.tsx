import { SquarePen } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '../../../components/ui/dialog';
import { IMedicine } from '../../../lib/interfaces/IMedicine';
import { MedicineForm } from './medicine-form';

interface MedicineModalProps {
    medicine?: IMedicine;
}
export const MedicineModal = ({ medicine }: MedicineModalProps) => {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {medicine ? (
                    <SquarePen className="h-5 w-5 text-primary" />
                ) : (
                    <Button>Thêm mới</Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-[50vw]">
                <DialogHeader>
                    <DialogTitle>{medicine ? 'Cập nhật' : 'Thêm mới'} thuốc</DialogTitle>
                </DialogHeader>
                <MedicineForm medicine={medicine} onCloseModal={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
};
