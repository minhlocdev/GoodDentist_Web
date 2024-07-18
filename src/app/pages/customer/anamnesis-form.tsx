import { FC, useState } from 'react';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import { Checkbox } from '../../../components/ui/checkbox';
import { FormControl, FormItem, FormMessage } from '../../../components/ui/form';

interface AnamnesisFormProps {
    isPending?: boolean;
}

const AnamnesisForm: FC<AnamnesisFormProps> = ({ isPending = false }) => {
    const {
        control,
        getValues,
        setValue,
        formState: { errors }
    } = useFormContext<FieldValues>();

    const [anamnesis, setAnamnesis] = useState((getValues('anamnesis') as string) ?? '');

    const medicalConditions = [
        'Chảy máu lâu',
        'Tiểu đường',
        'Dị ứng thuốc',
        'Truyền nhiễm',
        'Huyết áp cao',
        'Huyết áp thấp',
        'Thai sản',
        'Thấp khớp',
        'Tim',
        'Dạ dày',
        'Gan',
        'Phổi',
        'Bình thường'
    ];

    const handleCheckboxChange = (condition: string) => {
        let newAnamnesis = anamnesis;
        if (anamnesis.includes(condition)) {
            newAnamnesis = anamnesis.replace(`${condition},`, '');
        } else {
            newAnamnesis = `${anamnesis}${condition},`;
        }
        setAnamnesis(newAnamnesis);

        setValue('anamnesis', newAnamnesis);
    };
    return (
        <div className="flex flex-row gap-x-6">
            <Controller
                control={control}
                name="medicalConditions"
                render={() => (
                    <FormItem className="w-full">
                        <FormControl>
                            <div className="grid grid-cols-4 gap-4">
                                {medicalConditions.map((condition, index) => (
                                    <div key={index} className="flex items-center">
                                        <Checkbox
                                            id={`condition-${index}`}
                                            className="mr-2"
                                            checked={anamnesis.includes(condition)}
                                            onCheckedChange={() => handleCheckboxChange(condition)}
                                        />
                                        <label htmlFor={`condition-${index}`}>{condition}</label>
                                    </div>
                                ))}
                            </div>
                        </FormControl>
                        <FormMessage>{errors && <p>{errors.message?.toString()}</p>}</FormMessage>
                    </FormItem>
                )}
                disabled={isPending}
            />
        </div>
    );
};

export default AnamnesisForm;
