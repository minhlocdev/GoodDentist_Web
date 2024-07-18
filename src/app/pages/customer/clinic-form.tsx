import { LoaderCircle } from 'lucide-react';
import { FC } from 'react';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import { FormControl, FormItem, FormLabel, FormMessage } from '../../../components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../../../components/ui/select';
import { IClinic } from '../../../lib/interfaces/clinics-types/IClinic';
import { clinicService } from '../../../services/queries/clinicQuery';

interface ClinicFormProps {
    isPending?: boolean;
}

const ClinicForm: FC<ClinicFormProps> = ({ isPending = false }) => {
    const {
        control,
        formState: { errors }
    } = useFormContext<FieldValues>();
    const { data: clinics, isLoading } = clinicService.GetClinics();
    return (
        <div className="flex flex-row gap-x-6">
            <Controller
                control={control}
                name="clinicId"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Phòng khám</FormLabel>
                        <FormControl>
                            <Select
                                onValueChange={(value) => field.onChange(value)}
                                value={field.value ? String(field.value) : ''}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Chọn phòng khám" />
                                </SelectTrigger>
                                <SelectContent>
                                    {!isLoading ? (
                                        clinics?.map((clinic: IClinic) => (
                                            <SelectItem
                                                key={clinic.clinicId}
                                                value={clinic.clinicId}
                                            >
                                                {clinic.clinicName}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <div className="flex justify-center p-2">
                                            <LoaderCircle className="animate-spin" />
                                        </div>
                                    )}
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage>
                            {errors.clinicId && <p>{errors.clinicId.message?.toString()}</p>}
                        </FormMessage>
                    </FormItem>
                )}
                disabled={isPending}
            />
        </div>
    );
};

export default ClinicForm;
