import { CalendarContentLayout } from '../../../components/admin-panel/calendar-content-layout';
import AppointmentCalendar from './appointment-calendar';
import CalendarAside from './calendar-aside';

const AppointmentPage = () => {
    return (
        <CalendarContentLayout title="Danh sách lịch hẹn">
            <div className="flex flex-col items-start justify-start overflow-hidden md:flex-row md:overflow-auto">
                <CalendarAside />
                <AppointmentCalendar />
            </div>
        </CalendarContentLayout>
    );
};

export default AppointmentPage;
