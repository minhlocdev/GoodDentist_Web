import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { ScrollArea } from '../../../components/ui/scroll-area';
import { useCalendarStore } from '../../../hooks/use-calendar-store';
import AppointmentForm from './appointment-form';

const AppointmentModal: React.FC = () => {
    const { dialogOpen, setOpenDialog } = useCalendarStore();

    return (
        <Dialog open={dialogOpen} onOpenChange={setOpenDialog}>
            <DialogContent className="w-[90%] max-w-[800px] md:min-w-[900px]">
                <DialogHeader>
                    <DialogTitle>Đặt lịch hẹn</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-80 md:max-h-[500px]">
                    <AppointmentForm />
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

export default AppointmentModal;
