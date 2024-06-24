import { X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Button } from '../../../components/ui/button';
import { ScrollArea } from '../../../components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tab';
import { useCalendarStore } from '../../../hooks/use-calendar-store';
import {
    MemoizedCollapseAppointment,
    MemoizedCollapseInfo,
    MemoizedCollapseMedicine,
    MemoizedCollapsePayment,
    MemoizedCollapseTreatment
} from '../../../lib/memo-export';

interface CalendarAsideProps {
    mode?: string;
}
const CalendarAside: React.FC<CalendarAsideProps> = ({ mode }) => {
    const calendar = useCalendarStore();
    return (
        <div>
            {calendar.selectedEvent != undefined && (
                <div className="h-[calc(100vh-56px)] w-screen bg-white p-3 md:w-[300px]">
                    <div>
                        <div className="flex h-[30px] items-center justify-between">
                            <p className="font-semibold">Thông tin khách hàng</p>
                            <Button
                                variant="outline"
                                className=" border-none px-1"
                                onClick={() => calendar.setEvent(null)}
                            >
                                <X />
                            </Button>
                        </div>
                        <div className="flex h-[100px] items-center justify-center">
                            <div className="flex h-[100%] flex-1 items-center !justify-start gap-4 !bg-white pl-3">
                                <div className="resource-photo">
                                    <Avatar className="h-20 w-20 rounded-full bg-slate-100">
                                        <AvatarImage src={'#'} alt="Avatar" />
                                        <AvatarFallback className="text-[10px] font-bold">
                                            {calendar?.selectedEvent.data?.appointment?.resource}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="resource-name flex flex-col ">
                                    <span className="text-md font-bold">69082816</span>
                                    <span className="text-md font-bold text-primary">
                                        {calendar?.selectedEvent.data?.appointment?.resource}
                                    </span>
                                    <span className="text-[13px]">1999 Nam</span>
                                </div>
                            </div>
                        </div>
                        <ScrollArea className=" z-0 h-[calc(100vh-156px)] overflow-y-auto">
                            <div className="flex flex-col gap-y-1">
                                <MemoizedCollapseInfo />
                                <MemoizedCollapseAppointment />
                                <MemoizedCollapseMedicine />
                                <MemoizedCollapsePayment />
                                <MemoizedCollapseTreatment />
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            )}
            {mode === 'pending' && (
                <div className="h-[calc(100vh-56px)] w-screen bg-white p-3 md:w-[300px]">
                    <Tabs defaultValue="reschedule">
                        <TabsList className="flex w-full items-center justify-center">
                            <TabsTrigger value="reschedule">Lịch hẹn lại</TabsTrigger>
                        </TabsList>

                        <TabsContent value="reschedule" className="flex flex-col gap-y-6">
                            <p className="text-center">Không có lịch</p>
                        </TabsContent>
                    </Tabs>
                </div>
            )}
        </div>
    );
};

export default CalendarAside;
