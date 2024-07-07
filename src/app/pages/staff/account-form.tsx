import { useFormContext } from 'react-hook-form';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';
import { PasswordInput } from '../../../components/ui/local/password-input';

const AccountInfoForm = () => {
    const { control } = useFormContext();

    return (
        <>
            <FormField
                control={control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Tên đăng nhập <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                            <Input placeholder="Tên đăng nhập" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Mật khẩu</FormLabel>
                        <FormControl>
                            <PasswordInput placeholder="Mật khẩu" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="confirmPassword"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Xác nhận mật khẩu</FormLabel>
                        <FormControl>
                            <PasswordInput placeholder="Xác nhận mật khẩu" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    );
};

export default AccountInfoForm;
