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
import { ICustomer } from '../../../lib/interfaces/customer-types/ICustomer';
import { CustomerForm } from './customer-form';
interface CustomerModalProps {
    customer?: ICustomer;
}
export const CustomerModal = ({ customer }: CustomerModalProps) => {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {customer ? (
                    <SquarePen className="h-5 w-5 text-primary" />
                ) : (
                    <Button>Thêm mới</Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-[50vw]">
                <DialogHeader>
                    <DialogTitle>{customer ? 'Cập nhật' : 'Thêm mới'} khách hàng</DialogTitle>
                </DialogHeader>
                <CustomerForm customer={customer} onCloseModal={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
};
