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
import { IClinic } from '../../../lib/interfaces/clinics-types/IClinic';
import { ClinicForm } from './clinic-form';
interface ClinicModalProps {
    clinic?: IClinic;
}
export const ClinicModal = ({ clinic }: ClinicModalProps) => {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {clinic ? (
                    <SquarePen className="h-5 w-5 text-primary" />
                ) : (
                    <Button>Thêm mới</Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-[50vw]">
                <DialogHeader>
                    <DialogTitle>{clinic ? 'Cập nhật' : 'Thêm mới'} phòng khám</DialogTitle>
                </DialogHeader>
                <ClinicForm clinic={clinic} onCloseModal={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
};
