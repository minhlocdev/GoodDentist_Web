import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { Button } from '../../../components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '../../../components/ui/dropdown-menu';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '../../../components/ui/tooltip';
import { useCalendarStore } from '../../../hooks/use-calendar-store';
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

    const { selectedEvent } = useCalendarStore();
    return (
        <TooltipProvider disableHoverableContent>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <div
                        className={cn(
                            'h-[100%] w-[100%] rounded-sm font-bold text-neutral-900',
                            isMonthView ? 'h-6 overflow-hidden border-none p-0 text-[13px]' : ''
                        )}
                        style={{ backgroundColor: background }}
                    >
                        <div
                            className={cn(
                                'p-1d flex h-[100%] w-[100%] items-start justify-between',
                                selectedEvent?.data?.appointment?.id === appointment.id
                                    ? 'border border-primary'
                                    : ''
                            )}
                        >
                            <div className="flex max-w-[calc(85%)] items-start justify-start gap-1 md:gap-2">
                                <span>14:00</span>
                                <span className="truncate">{resource}</span>
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-5 p-0">
                                        <DotsVerticalIcon className="" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-30" side="top">
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>KH chưa đến</DropdownMenuItem>
                                        <DropdownMenuItem>Khách hàng đến</DropdownMenuItem>
                                        <DropdownMenuItem>Điều trị</DropdownMenuItem>
                                        <DropdownMenuItem>Đã xong</DropdownMenuItem>
                                        <DropdownMenuItem>Hủy lịch hẹn</DropdownMenuItem>
                                        <DropdownMenuItem>Hẹn lại sau</DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem className="text-primary">
                                            Sửa lịch hẹn
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive">
                                            Xóa lịch hẹn
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </TooltipTrigger>
                <TooltipContent side="top">
                    <div className="z-10 flex w-fit flex-col gap-y-2">
                        <p>{resource}</p>
                        <p>{location}</p>
                        <p>{address}</p>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default AppointmentEvent;
