import { Button } from '../../../components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '../../../components/ui/dialog';

import { SquarePen } from 'lucide-react';
import { useState } from 'react';
import { IUser } from '../../../lib/interfaces/user-types/IUser';
import { EditStaffForm } from './edit-staff-form';

interface StaffFormProps {
    staff: IUser;
}
export const EditStaffModal = ({ staff }: StaffFormProps) => {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <SquarePen className="h-5 w-5 text-primary" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[50vw]">
                <DialogHeader>
                    <DialogTitle>Cập nhật nhân viên</DialogTitle>
                </DialogHeader>
                <EditStaffForm staff={staff} onCloseModal={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
};
