import { Button } from '../../../components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '../../../components/ui/dialog';

import { SquarePen } from 'lucide-react';
import { IUser } from '../../../lib/interfaces/user-types/IUser';
import { StaffForm } from './staff-form';

interface StaffFormProps {
    staff?: IUser;
}
export const NewStaffModal = ({ staff }: StaffFormProps) => {
    return (
        <Dialog>
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
                    <DialogTitle>Thêm mới nhân viên</DialogTitle>
                </DialogHeader>
                <StaffForm staff={staff} />
            </DialogContent>
        </Dialog>
    );
};
