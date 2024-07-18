import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from '../../../hooks/use-auth';
import { DentistSlotFormSchema } from '../../../lib/form-schema';
import { IDentistSlot } from '../../../lib/interfaces/others/IDentistSlot';

interface DentistSlotFormProps {
    slot?: IDentistSlot;
    onCloseModal: () => void;
}

const DentistSlotForm = ({ slot, onCloseModal }: DentistSlotFormProps) => {
    const { user } = useAuth();
    const form = useForm<z.infer<typeof DentistSlotFormSchema>>({
        resolver: zodResolver(DentistSlotFormSchema),
        defaultValues: slot
            ? {
                  timeEnd: slot?.timeEnd ?? new Date(),
                  timeStart: slot?.timeStart ?? new Date(),
                  roomId: slot?.roomId,
                  clinicId: user?.clinics?.[0].clinicId,
                  dentistId: user?.userId,
                  status: true
              }
            : {
                  status: true
              },
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false
    });

    async function onSubmit(values: z.infer<typeof DentistSlotFormSchema>) {
        try {
            await Promise.resolve(values);
            console.log(values);
            onCloseModal();
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}></form>
        </FormProvider>
    );
};

export default DentistSlotForm;
