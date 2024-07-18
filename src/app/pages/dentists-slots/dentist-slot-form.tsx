import { AxiosError } from 'axios';
import { addHours, format, setHours, setMilliseconds, setMinutes, setSeconds } from 'date-fns';
import { Circle, Square, Triangle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../../../components/ui/button';
import { Calendar } from '../../../components/ui/calendar';
import { Checkbox } from '../../../components/ui/checkbox';
import { DialogClose, DialogFooter } from '../../../components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../../../components/ui/select';
import { useAuth } from '../../../hooks/use-auth';
import { IDentistSlot } from '../../../lib/interfaces/others/IDentistSlot';
import { IPostDentistSlot } from '../../../lib/interfaces/others/IPostDentistSlot';
import { queryClient } from '../../../lib/queryClient';
import { slotService } from '../../../services/queries/slotQuery';

const slotTimes = [
    {
        label: '08:00-12:00',
        startHour: 8,
        startMinute: 0,
        endHour: 12,
        endMinute: 0,
        icon: <Square fill="blue" className="h-4 w-4 text-primary" />
    },
    {
        label: '13:00-17:00',
        startHour: 13,
        startMinute: 0,
        endHour: 17,
        endMinute: 0,
        icon: <Circle fill="red" className="h-4 w-4 text-red-500" />
    },
    {
        label: '17:00-19:30',
        startHour: 17,
        startMinute: 0,
        endHour: 19,
        endMinute: 30,
        icon: <Triangle fill="yellow" className="h-4 w-4 text-yellow-200" />
    }
];

const DentistSlotForm = () => {
    const { user } = useAuth();
    const [selectedDate, setDate] = useState<Date | undefined>(new Date());
    const [selectedSlots, setSelectedSlots] = useState<IDentistSlot[]>([]);
    const [roomId, setRoomId] = useState<string>();
    const postDentistSlot = slotService.PostDentistSlot();
    const handleDateChange = (newDate: Date | undefined) => {
        setDate(newDate);
        setSelectedSlots([]);
    };

    const handleSlotChange = (slotIndex: number) => {
        if (!selectedDate) return;

        const slotTime = slotTimes[slotIndex];
        const newSlot: IDentistSlot = {
            dentistSlotId: slotIndex,
            dentistId: user?.roleId === 2 ? user?.userId : '',
            clinicId: user?.clinics?.[0].clinicId,
            timeStart: setHours(setMinutes(selectedDate, slotTime.startMinute), slotTime.startHour),
            timeEnd: setHours(setMinutes(selectedDate, slotTime.endMinute), slotTime.endHour),
            status: true
        };

        const updatedSlots = selectedSlots.some((slot) => slot.dentistSlotId === slotIndex)
            ? selectedSlots.filter((slot) => slot.dentistSlotId !== slotIndex)
            : [...selectedSlots, newSlot];

        setSelectedSlots(updatedSlots);
    };

    const onSubmit = async () => {
        const newPostSlots: IPostDentistSlot[] = selectedSlots.map((slot) => ({
            dentistId: user?.roleId === 2 ? user?.userId : '',
            clinicId: user?.clinics?.[0].clinicId,
            timeStart: setMilliseconds(setSeconds(addHours(slot.timeStart!, 7), 0), 0),
            timeEnd: setMilliseconds(setSeconds(addHours(slot.timeEnd!, 7), 0), 0),
            status: true,
            roomId: Number(roomId) ?? "0"
        }));

        await postDentistSlot.mutateAsync(newPostSlots, {
            onSuccess: async (res) => {
                if (res.isSuccess) {
                    toast.success('Tạo mới thành công');
                    await queryClient.refetchQueries({ queryKey: ['slots-by-dentist'] });
                } else {
                    toast.error('Tạo mới thất bại' + res.message);
                }
            },
            onError: (error) => {
                if (error instanceof AxiosError && error.response?.data?.statusCode === 400) {
                    toast.error(error.response.data.message[0] as React.ReactNode);
                } else {
                    toast.error('Tạo mới thất bại');
                }
            }
        });
    };

    return (
        <div className="flex gap-3 p-4">
            <div className="border">
                <Calendar mode="single" selected={selectedDate} onSelect={handleDateChange} />
            </div>
            <div className="flex flex-1 flex-col gap-3">
                <div className="bg-neutral-600 py-2 text-center font-semibold text-white">
                    {format(selectedDate ?? new Date(), 'dd MMMM, yyyy')}
                </div>
                <div className="flex flex-col gap-y-6">
                    {slotTimes.map((slot, index) => (
                        <div key={index} className="flex items-center gap-2">
                            {slot.icon} {slot.label}
                            <Checkbox
                                checked={selectedSlots.some((s) => s.dentistSlotId === index)}
                                onCheckedChange={() => handleSlotChange(index)}
                            />
                        </div>
                    ))}
                </div>
                <DialogFooter className="flex flex-row justify-between border-t border-neutral-300 p-5">
                    <Button
                        className="flex-1"
                        onClick={onSubmit}
                        disabled={postDentistSlot?.isPending}
                    >
                        Thêm mới
                    </Button>
                    <DialogClose className="flex-1">
                        <Button variant={'secondary'} className="w-full hover:bg-neutral-200">
                            Hủy bỏ
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </div>
            <Select onValueChange={setRoomId} value={roomId}>
                <SelectTrigger>
                    <SelectValue placeholder="Chọn phòng" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">CitiDental - 101</SelectItem>
                    <SelectItem value="2">CitiDental - 102</SelectItem>
                    <SelectItem value="3">CitiDental - 103</SelectItem>
                    <SelectItem value="11">CitiDental - 104</SelectItem>
                    <SelectItem value="4">Sunshine Dental - 101</SelectItem>
                    <SelectItem value="5">Sunshine Dental - 102</SelectItem>
                    <SelectItem value="6">Sunshine Dental - 103</SelectItem>
                    <SelectItem value="7">Sunshine Dental - 104</SelectItem>
                    <SelectItem value="8">Dr.Hung Dental - 101</SelectItem>
                    <SelectItem value="9">Dr.Hung Dental - 102</SelectItem>
                    <SelectItem value="10">Dr.Hung Dental - 103</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default DentistSlotForm;
