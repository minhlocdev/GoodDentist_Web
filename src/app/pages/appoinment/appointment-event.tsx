import { AppointmentStatusCode, EVENT_STATUS_COLORS } from '../../../lib/events';
import { Appointment } from '../../../lib/interfaces/IEvent';
import { cn } from '../../../lib/utils';

const AppointmentEvent = ({
    appointment,
    isMonthView
}: {
    appointment: Appointment;
    isMonthView?: boolean;
}) => {
    const { location, status, resource, address } = appointment;
    const background = EVENT_STATUS_COLORS[status as AppointmentStatusCode];

    return (
        <div
            className={cn(
                'h-[100%] p-1 text-neutral-900',
                isMonthView ? 'h-5 overflow-hidden p-0 text-sm' : ''
            )}
            style={{ backgroundColor: background }}
        >
            <div className="flex items-center justify-between">
                <div className="flex">
                    <span>{location}</span>
                </div>
                <div className="flex">
                    <span>{resource}</span>
                </div>
                <div className="mt-4">
                    {address.split('\n').map((add: string, index: number) => (
                        <span key={index} className="text-sm">
                            {add}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AppointmentEvent;
