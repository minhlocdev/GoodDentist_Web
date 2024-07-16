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
import { IService } from '../../../lib/interfaces/services-types/IService';
import { ServiceForm } from './service-form';

interface ServiceModalProps {
    service?: IService;
}
export const ServiceModal = ({ service }: ServiceModalProps) => {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {service ? (
                    <SquarePen className="h-5 w-5 text-primary" />
                ) : (
                    <Button>Thêm mới</Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-[50vw]">
                <DialogHeader>
                    <DialogTitle>{service ? 'Cập nhật' : 'Thêm mới'} khách hàng</DialogTitle>
                </DialogHeader>
                <ServiceForm service={service} onCloseModal={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
};
