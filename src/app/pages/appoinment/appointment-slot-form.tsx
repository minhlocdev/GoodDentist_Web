import { format } from 'date-fns';
import { Loader } from 'lucide-react';
import { useState } from 'react';
import { Controller, ControllerRenderProps, FieldValues, useFormContext } from 'react-hook-form';
import { Button } from '../../../components/ui/button';
import { FormControl, FormItem, FormLabel, FormMessage } from '../../../components/ui/form';
import { ScrollArea } from '../../../components/ui/scroll-area';
import { IDentistSlot } from '../../../lib/interfaces/others/IDentistSlot';
import { cn } from '../../../lib/utils';
import CalendarCollapsible from './calendar-collapsible';

interface SlotFormProps {
    dentistSlot: IDentistSlot[] | undefined;
}

const SlotForm = ({ dentistSlot }: SlotFormProps) => {
    const [, setSlotId] = useState<number | null>(null);
    const { control } = useFormContext<FieldValues>();

    const handleButtonClick = (
        field: ControllerRenderProps<FieldValues, 'dentistSlotId'>,
        slotId: number
    ) => {
        if (field.value === slotId) {
            field.onChange(null);
            setSlotId(null);
        } else {
            field.onChange(slotId);
            setSlotId(slotId);
        }
    };

    return (
        <ScrollArea className="col-span-1 max-h-[350px] min-w-52 gap-2 px-3 md:col-span-3">
            <h4 className="text-center text-lg font-semibold uppercase">Chọn bác sỹ</h4>
            <Controller
                name="dentistSlotId"
                control={control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel />
                        <FormControl>
                            {dentistSlot ? (
                                <>
                                    {dentistSlot.length === 0 ? (
                                        <p className="text-center text-sm">
                                            Không có lịch làm việc vào giờ này
                                        </p>
                                    ) : (
                                        <div className="flex flex-col gap-x-3 gap-y-2">
                                            {dentistSlot.map((slot) => (
                                                <CalendarCollapsible
                                                    key={slot.dentistSlotId}
                                                    title={slot.dentist?.name ?? ''}
                                                    content={
                                                        <>
                                                            <div className="grid grid-cols-2 gap-y-1 break-words text-xs">
                                                                <div className="font-bold text-neutral-700/90 ">
                                                                    Email
                                                                </div>
                                                                <div>{slot.dentist?.email}</div>
                                                                <div className="font-bold text-neutral-700/90">
                                                                    Số điện thoại
                                                                </div>
                                                                <div>
                                                                    {slot.dentist?.phoneNumber}
                                                                </div>
                                                                <div className="col-span-2 border-b border-neutral-300 py-2"></div>
                                                                <div className="font-bold text-neutral-700/90">
                                                                    Khám tại
                                                                </div>
                                                                <div>
                                                                    Phòng {slot.room?.roomNumber}
                                                                </div>
                                                                <div className="col-span-2 border-b border-neutral-300 py-2"></div>
                                                                <div className="col-span-2 text-center font-bold text-neutral-700/90">
                                                                    Lịch đã hẹn
                                                                </div>
                                                                {slot.examinations &&
                                                                slot.examinations.length > 0 ? (
                                                                    slot.examinations.map(
                                                                        (exam) => (
                                                                            <div
                                                                                key={
                                                                                    exam.examinationId
                                                                                }
                                                                                className="col-span-2 grid grid-cols-2"
                                                                            >
                                                                                <div>
                                                                                    {format(
                                                                                        exam.timeStart,
                                                                                        'dd-MM-yyyy'
                                                                                    )}
                                                                                </div>
                                                                                <div className="ml-auto">
                                                                                    {format(
                                                                                        exam.timeStart,
                                                                                        'HH:mm'
                                                                                    )}
                                                                                    -
                                                                                    {format(
                                                                                        exam.timeEnd,
                                                                                        'HH:mm'
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    )
                                                                ) : (
                                                                    <div className="col-span-2 text-center">
                                                                        Không có lịch đã hẹn
                                                                    </div>
                                                                )}

                                                                <Button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleButtonClick(
                                                                            field,
                                                                            slot.dentistSlotId
                                                                        )
                                                                    }
                                                                    variant={
                                                                        field.value ===
                                                                        slot.dentistSlotId
                                                                            ? 'destructive'
                                                                            : 'default'
                                                                    }
                                                                    className={cn(
                                                                        'col-span-2 mt-1'
                                                                    )}
                                                                >
                                                                    {field.value ===
                                                                    slot.dentistSlotId
                                                                        ? 'Hủy chọn'
                                                                        : 'Chọn bác sỹ này'}
                                                                </Button>
                                                            </div>
                                                        </>
                                                    }
                                                />
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                    <Loader className="h-6 w-6 animate-spin" />
                                </div>
                            )}
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </ScrollArea>
    );
};

export default SlotForm;
