import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { addHours, format, subDays } from 'date-fns';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '../../../components/ui/button';
import { DialogClose, DialogFooter } from '../../../components/ui/dialog';
import { useCalendarStore } from '../../../hooks/use-calendar-store';
import { floorToNearestFifteen } from '../../../lib/calendar-utils';
import { AppointmentFormSchema } from '../../../lib/form-schema';
import { ICustomer } from '../../../lib/interfaces/customer-types/ICustomer';
import { IPostExamination } from '../../../lib/interfaces/examination-types/IPostExamination';
import { queryClient } from '../../../lib/queryClient';
import { customerService } from '../../../services/queries/customerQuery';
import { examinationService } from '../../../services/queries/examinationQuery';
import { userService } from '../../../services/queries/userQuery';
import AppointmentInfoForm from './appointment-info-form';
import SlotForm from './appointment-slot-form';

interface AppointmentFormProps {
    customer?: ICustomer;
}
const AppointmentForm = ({ customer }: AppointmentFormProps) => {
    const { selectedSlot, view, selectedClinicId } = useCalendarStore();

    const postExam = examinationService.PostExamination();

    const [timeRange, setTimeRange] = useState({
        timeStart: selectedSlot?.start ?? new Date(),
        timeEnd:
            view === 'month'
                ? subDays(selectedSlot?.end ?? new Date(), 1)
                : selectedSlot?.end ?? new Date()
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
            examinationProfileId: 0,
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
        addHours(timeRange.timeStart, 7),
        addHours(timeRange.timeEnd, 7)
    );
    async function onSubmit(values: z.infer<typeof AppointmentFormSchema>) {
        try {
            const newExam: IPostExamination = {
                examinationId: 0,
                examinationProfileId: values.examinationProfileId ?? 0,
                customerId: values.customerId,
                notes: values.notes,
                diagnosis: '.',
                dentistSlotId: values.dentistSlotId ?? 0,
                timeEnd: addHours(timeRange.timeEnd, 7),
                timeStart: addHours(timeRange.timeStart, 7),
                mode: values.mode,
                status: 1
            };
            await postExam.mutateAsync(newExam, {
                onSuccess: async (res) => {
                    if (res.isSuccess) {
                        toast.success('Tạo mới thành công');
                        await queryClient.invalidateQueries({ queryKey: ['examination'] });
                        await queryClient.invalidateQueries({ queryKey: ['examinations'] });
                    } else {
                        toast.error('Tạo mới thất bại');
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
