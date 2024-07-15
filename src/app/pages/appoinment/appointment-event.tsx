import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
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
import { AppointmentStatusNames, EVENT_STATUS_COLORS } from '../../../lib/events';
import { IExamination } from '../../../lib/interfaces/examination-types/IExamination';
import { cn } from '../../../lib/utils';

const AppointmentEvent = ({
    examination,
    isMonthView
}: {
    examination: IExamination;
    isMonthView?: boolean;
}) => {
    const { notes, status, timeStart, timeEnd } = examination;
    const [selectedStatus, setStatus] = useState(status!);
    const background = EVENT_STATUS_COLORS[status as keyof typeof EVENT_STATUS_COLORS];
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
                                'flex h-[100%] w-[100%] items-start justify-between p-1',
                                selectedEvent?.examinationId === examination.examinationId
                                    ? 'border border-primary'
                                    : ''
                            )}
                        >
                            <div className="flex max-w-[calc(85%)] items-start justify-start gap-1 md:gap-2">
                                <span className="truncate">{notes}</span>
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-5 p-0">
                                        <DotsVerticalIcon className="" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-30" side="top">
                                    <DropdownMenuRadioGroup
                                        value={selectedStatus.toString()}
                                        onValueChange={(value) => setStatus(Number(value))}
                                    >
                                        <DropdownMenuRadioItem value="1">
                                            KH chưa đến
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="2">
                                            Khách hàng đến
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="3">
                                            Điều trị
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="4">
                                            Đã xong
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="5">
                                            Hủy lịch hẹn
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="6">
                                            Hẹn lại sau
                                        </DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
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
                <TooltipContent>
                    <div className="z-10 flex w-fit max-w-32 flex-col gap-y-2">
                        <p>
                            {format(timeStart, 'HH:mm')}-{format(timeEnd, 'HH:mm')}
                        </p>
                        <p>{notes}</p>
                        <p>{AppointmentStatusNames[status! - 1]}</p>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default AppointmentEvent;
