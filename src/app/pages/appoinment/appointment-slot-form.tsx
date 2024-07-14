import { Loader } from 'lucide-react';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import { FormControl, FormItem, FormLabel, FormMessage } from '../../../components/ui/form';
import { IDentistSlot } from '../../../lib/interfaces/others/IDentistSlot';

interface SlotFormProps {
    dentistSlot: IDentistSlot[] | undefined;
}

const SlotForm = ({ dentistSlot }: SlotFormProps) => {
    const { control } = useFormContext<FieldValues>();
    return (
        <div className="col-span-1 min-w-52 gap-2 px-3 md:col-span-3">
            <h4 className="text-center text-lg font-semibold uppercase">Lịch hẹn</h4>
            <Controller
                name="dentistSlotId"
                control={control}
                render={() => (
                    <FormItem>
                        <FormLabel />
                        <FormControl>
                            {dentistSlot ? (
                                <>
                                    {dentistSlot.length === 0 ? (
                                        <p className="text-center text-sm">
                                            Không có lịch làm việc hôm nay
                                        </p>
                                    ) : (
                                        <div className="flex flex-wrap gap-x-3 gap-y-2">
                                            {dentistSlot.map((slot) => (
                                                <div>{slot.timeStart?.getDate()}</div>
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
        </div>
    );
};

export default SlotForm;
