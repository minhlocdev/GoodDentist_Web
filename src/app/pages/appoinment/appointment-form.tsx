import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../../components/ui/button';
import { DialogClose, DialogFooter } from '../../../components/ui/dialog';
import { useCalendarStore } from '../../../hooks/use-calendar-store';
import { floorToNearestFifteen } from '../../../lib/calendar-utils';
import { AppointmentFormSchema } from '../../../lib/form-schema';
import { ICustomer } from '../../../lib/interfaces/customer-types/ICustomer';
import { IPostExamination } from '../../../lib/interfaces/examination-types/IPostExamination';
import { customerService } from '../../../services/queries/customerQuery';
import { userService } from '../../../services/queries/userQuery';
import AppointmentInfoForm from './appointment-info-form';
import SlotForm from './appointment-slot-form';

interface AppointmentFormProps {
    customer?: ICustomer;
}
const AppointmentForm = ({ customer }: AppointmentFormProps) => {
    const { selectedSlot, view, selectedClinicId } = useCalendarStore();

    const [timeRange, setTimeRange] = useState({
        timeStart: new Date(),
        timeEnd: new Date()
    });

    const handleTimeChange = (newTimeRange: { timeStart: Date; timeEnd: Date }) => {
        setTimeRange(newTimeRange);
    };

    const form = useForm<z.infer<typeof AppointmentFormSchema>>({
        resolver: zodResolver(AppointmentFormSchema),
        defaultValues: {
            customerId: customer?.userId.toString() ?? '',
            phoneNumber: customer?.phoneNumber ?? '',
            mode: 'new',
            examinationProfileId:
                (customer?.examinationProfiles?.[0]?.examinationProfileId as number) ?? 0,
            dayStart: selectedSlot?.start,
            timeStart:
                view === 'month'
                    ? floorToNearestFifteen(new Date())
                    : format(selectedSlot?.start ?? new Date(), 'HH:mm'),
            duration: '15',
            notes: '',
            status: 1
        },
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false
    });
    const { data: customers } = customerService.GetCustomersByClinic(
        selectedClinicId ?? '',
        1,
        200
    );

    const { data: dentistSlot } = userService.GetAllDentistSlotByTime(
        selectedClinicId ?? '',
        selectedSlot?.start ?? new Date(),
        selectedSlot?.end ?? new Date()
    );
    async function onSubmit(values: z.infer<typeof AppointmentFormSchema>) {
        try {
            await Promise.resolve(values);
            const newExam: IPostExamination = {
                examinationId: 0,
                examinationProfileId: values.examinationProfileId ?? 0,
                customerId: values.customerId,
                notes: values.notes,
                diagnosis: '',
                dentistSlotId: 0,
                timeEnd: new Date(),
                timeStart: new Date(),
                mode: values.mode,
                status: 1
            };
            console.log(newExam);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 grid-rows-2 p-3 md:grid-cols-12 md:grid-rows-1">
                    <AppointmentInfoForm
                        customers={customers ?? []}
                        timeRange={timeRange}
                        handleTimeRange={handleTimeChange}
                    />
                    <SlotForm dentistSlot={dentistSlot} />
                </div>
                <DialogFooter className="flex flex-row justify-between border-t border-neutral-300 p-5">
                    <Button type="submit" className="flex-1" disabled={selectedClinicId === ''}>
                        Thêm mới
                    </Button>
                    <DialogClose className="flex-1" asChild>
                        <Button variant={'secondary'} className="w-full hover:bg-neutral-200">
                            Hủy bỏ
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </form>
        </FormProvider>
    );
};

export default AppointmentForm;
