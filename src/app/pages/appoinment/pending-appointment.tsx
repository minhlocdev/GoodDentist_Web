import { useStore } from 'zustand';
import { CalendarContentLayout } from '../../../components/admin-panel/calendar-content-layout';
import { useCalendarStore } from '../../../hooks/use-calendar-store';
import AppointmentCalendar from './appointment-calendar';
import CalendarAside from './calendar-aside';

const PendingAppointment = () => {
    const calendar = useStore(useCalendarStore, (state) => state);

    if (!calendar) return null;
    return (
        <CalendarContentLayout title="Lịch hẹn lại và Booking">
            <div className="flex flex-col items-start justify-start overflow-hidden md:flex-row md:overflow-auto">
                <CalendarAside mode="pending" />
                <AppointmentCalendar />
            </div>
        </CalendarContentLayout>
    );
};

export default PendingAppointment;
