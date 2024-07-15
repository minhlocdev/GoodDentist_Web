import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { Checkbox } from '../../../components/ui/checkbox';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';

interface AccountInfoProbs {
    isPending?: boolean;
}

const EditAccountInfoForm: FC<AccountInfoProbs> = ({ isPending = false }) => {
    const { control } = useFormContext();

    return (
        <>
            <FormField
                control={control}
                name="userName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Tên đăng nhập <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                            <Input placeholder="Tên đăng nhập" {...field} disabled />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                disabled={isPending}
            />
            <FormField
                control={control}
                name="reset"
                render={({ field }) => (
                    <FormItem className="flex items-center gap-x-3 ">
                        <FormLabel>Cấp lại mật khẩu</FormLabel>
                        <FormControl>
                            <Checkbox
                                className="h-6 w-6"
                                checked={field.value as boolean}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                disabled={isPending}
            />
        </>
    );
};

export default EditAccountInfoForm;
