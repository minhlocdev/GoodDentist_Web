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
import { StaffForm } from './staff-form';

interface StaffFormProps {
    staff?: IUser;
}
export const NewStaffModal = ({ staff }: StaffFormProps) => {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                {!staff ? (
                    <Button>Thêm mới</Button>
                ) : (
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <SquarePen className="h-5 w-5 text-primary" />
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-[50vw]">
                <DialogHeader>
                    <DialogTitle>{staff ? 'Thêm mới' : 'Cập nhật'} nhân viên</DialogTitle>
                </DialogHeader>
                <StaffForm staff={staff} onCloseModal={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
};
