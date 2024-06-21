/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { vi } from 'date-fns/locale';
import {
    Calendar as BigCalendar,
    CalendarProps,
    Views,
    dateFnsLocalizer
} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Define the localizer
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales: {
        vi
    }
});

// Define the Calendar component
export default function BaseCalendar(props: Omit<CalendarProps, 'localizer'>) {
    return (
        <BigCalendar
            {...props}
            localizer={localizer}
            views={[Views.DAY, Views.WEEK, Views.MONTH]}
        />
    );
}
