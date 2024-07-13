import { format } from 'date-fns';
import { useCalendarStore } from '../../../hooks/use-calendar-store';
import CalendarCollapsible from './calendar-collapsible';

const CollapseAppointment = () => {
    const { selectedEvent } = useCalendarStore();
    return (
        <CalendarCollapsible
            title="Lịch hẹn"
            content={
                <div className="grid grid-flow-row-dense grid-cols-2 gap-y-3 text-sm">
                    <div className="font-bold text-neutral-700/90">
                        {format(selectedEvent?.timeStart ?? new Date(), 'dd-MM-yyyy')}
                    </div>
                    <div>{selectedEvent?.notes}</div>
                </div>
            }
        />
    );
};

export default CollapseAppointment;
