import React from 'react';
import { Button } from '../../../components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '../../../components/ui/dialog';
import TreatmentServiceTable from './treatment-service-table';

export const TreatmentServiceModal = () => {
    const [open, setOpen] = React.useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setOpen(true)}>Thêm dịch vụ</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[50vw]">
                <DialogHeader>
                    <DialogTitle>Chọn dịch vụ điều trị</DialogTitle>
                </DialogHeader>
                <div className="w-full max-w-full p-6">
                    <TreatmentServiceTable onDialogClose={() => setOpen(false)} />
                </div>
            </DialogContent>
        </Dialog>
    );
};
