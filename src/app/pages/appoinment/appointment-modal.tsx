import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { useCalendarStore } from '../../../hooks/use-calendar-store';
import AppointmentForm from './appointment-form';

const AppointmentModal: React.FC = () => {
    const { dialogOpen, setOpenDialog } = useCalendarStore();

    return (
        <Dialog open={dialogOpen} onOpenChange={setOpenDialog}>
            <DialogContent className="w-[90%] max-w-[800px] md:w-[780px]">
                <DialogHeader>
                    <DialogTitle>Đặt lịch hẹn</DialogTitle>
                </DialogHeader>
                {/* Add content for your dialog here */}
                <AppointmentForm />
            </DialogContent>
        </Dialog>
    );
};

export default AppointmentModal;
