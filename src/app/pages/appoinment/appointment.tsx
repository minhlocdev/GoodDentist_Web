import { CalendarContentLayout } from '../../../components/admin-panel/calendar-content-layout';
import AppointmentCalendar from './appointment-calendar';

const AppointmentPage = () => {
    return (
        <CalendarContentLayout title="Danh sách lịch hẹn">
            <AppointmentCalendar />
        </CalendarContentLayout>
    );
};

export default AppointmentPage;
