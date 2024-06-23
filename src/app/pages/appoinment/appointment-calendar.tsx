import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useMemo } from 'react';
import { DateLocalizer, EventProps, Formats, Views } from 'react-big-calendar';
import BaseCalendar from '../../../components/ui/local/base-calendar';
import { useCalendarStore } from '../../../hooks/use-calendar-store';
import { EVENTS, RESOURCES } from '../../../lib/events';
import { EventItem } from '../../../lib/interfaces/IEvent';
import { cn } from '../../../lib/utils';
import AppointmentEvent from './appointment-event';
import { CustomResource, CustomTimeGutterHeader } from './customize-calendar';

const AppointmentCalendar = () => {
    const { formats } = useMemo(
        () => ({
            formats: {
                timeGutterFormat: (
                    date: Date,
                    culture: string | undefined,
                    localizer: DateLocalizer
                ) => localizer.format(date, 'HH:mm', culture),
                dateFormat: 'dd',
                dayFormat: (date: Date, culture: string | undefined, localizer: DateLocalizer) => {
                    return `${localizer.format(date, 'dd', culture)} ${format(date, 'EE', { locale: vi })}`;
                },
                weekdayFormat: (date: Date) => {
                    return `${format(date, 'EE', { locale: vi })}`;
                }
            }
        }),
        []
    );

    const calendar = useCalendarStore();

    if (!calendar) return null;

    const components: any = {
        event: ({ event }: EventProps<EventItem>) => {
            const data = event?.data;
            if (data?.appointment)
                return (
                    <AppointmentEvent
                        appointment={data?.appointment}
                        isMonthView={calendar?.view === Views.MONTH}
                    />
                );

            return null;
        },
        timeGutterHeader: CustomTimeGutterHeader,
        resourceHeader: (props: any) => {
            const resource = RESOURCES.find((r) => r.id === props.resource.id);
            if (!resource) return null;

            return <CustomResource name={resource.name} photo={resource.photo} />;
        }
    };
    return (
        <div
            className={cn(
                'w-[calc(100vw-2%)] h-screen flex-col gap-2 md:flex md:h-[calc(100vh-56px)] md:w-[100%]',
                calendar.selectedEvent ? 'hidden' : ''
            )}
        >
            <div className="relative h-[100%] w-[100%] flex-1 overflow-auto">
                <BaseCalendar
                    events={EVENTS}
                    defaultView={calendar?.view}
                    resources={calendar?.view === Views.DAY ? RESOURCES : undefined}
                    // Components
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    components={components}
                    // Toolbar
                    toolbar={false}
                    date={calendar?.selectedDate}
                    view={calendar?.view}
                    onView={calendar?.setView}
                    onNavigate={calendar?.setDate}
                    step={15}
                    timeslots={1}
                    formats={formats as Formats}
                    onSelectEvent={(e) => calendar.setEvent(e)}
                />
            </div>
        </div>
    );
};

export default AppointmentCalendar;
