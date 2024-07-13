import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useMemo } from 'react';
import { DateLocalizer, EventProps, Formats, Views } from 'react-big-calendar';
import BackdropLoader from '../../../components/ui/local/backdrop-loader';
import BaseCalendar from '../../../components/ui/local/base-calendar';
import { useCalendarStore } from '../../../hooks/use-calendar-store';
import { EventItem } from '../../../lib/interfaces/IEvent';
import { IExamination } from '../../../lib/interfaces/examination-types/IExamination';
import { cn } from '../../../lib/utils';
import { examinationService } from '../../../services/queries/examinationQuery';
import { userService } from '../../../services/queries/userQuery';
import AppointmentEvent from './appointment-event';
import AppointmentModal from './appointment-modal';
import { CustomResource, CustomTimeGutterHeader } from './customize-calendar';

const AppointmentCalendar = () => {
    const calendar = useCalendarStore();
    const { data: dentists, isLoading } = userService.GetUsersByClinic(
        calendar.selectedClinicId ?? '',
        1,
        4
    );
    const { data: examinations, isLoading: examLoading } =
        examinationService.GetExaminationByClinic(calendar?.selectedClinicId ?? '', 1, 200);
    const transformExaminationsToEvents = (examinations: IExamination[]): EventItem[] => {
        return examinations.map((examination) => ({
            start: new Date(examination.timeStart),
            end: new Date(examination.timeEnd),
            data: {
                appointment: examination
            },
            isDraggable: true,
            dentistId: examination.dentistId
        }));
    };
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
    if (isLoading || examLoading) {
        return <BackdropLoader />;
    }
    if (!calendar) return null;

    const components: any = {
        event: ({ event }: EventProps<EventItem>) => {
            const data = event?.data;
            if (data?.appointment)
                return (
                    <AppointmentEvent
                        examination={data?.appointment}
                        isMonthView={calendar?.view === Views.MONTH}
                    />
                );

            return null;
        },
        timeGutterHeader: CustomTimeGutterHeader,
        resourceHeader: (props: any) => {
            if (dentists !== null && dentists !== undefined) {
                const resource = dentists.find((r) => r.userId === props.resource.userId);
                if (!resource) return null;
                return <CustomResource name={resource.name} photo={resource.avatar as string} />;
            }
            return null;
        }
    };
    return (
        <div
            className={cn(
                'h-screen w-[calc(100vw-2%)] flex-col gap-2 md:flex md:h-[calc(100vh-56px)] md:w-[100%]',
                calendar.selectedEvent ? 'hidden' : ''
            )}
        >
            <div className="relative h-[100%] w-[100%] flex-1 overflow-auto">
                <BaseCalendar
                    events={transformExaminationsToEvents(examinations ?? [])}
                    defaultView={calendar?.view}
                    resources={calendar?.view === Views.DAY ? dentists : undefined}
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
                    onSelectSlot={(slotInfo) => {
                        calendar.setSlot(slotInfo);
                        calendar.setOpenDialog();
                    }}
                    min={new Date(2024, 10, 0, 8, 0, 0)}
                    max={new Date(2024, 10, 0, 19, 30, 0)}
                    selectable
                />
                <AppointmentModal />
            </div>
        </div>
    );
};

export default AppointmentCalendar;
