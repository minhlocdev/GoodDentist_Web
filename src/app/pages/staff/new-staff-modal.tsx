import { Button } from '../../../components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '../../../components/ui/dialog';

import { useState } from 'react';
import { StaffForm } from './staff-form';

export const NewStaffModal = () => {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button>Thêm mới</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[50vw]">
                <DialogHeader>
                    <DialogTitle>{'Thêm mới'} nhân viên</DialogTitle>
                </DialogHeader>
                <StaffForm onCloseModal={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
};
