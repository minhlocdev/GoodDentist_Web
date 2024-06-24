import { useForm } from 'react-hook-form';
import { z } from 'zod';
import loginImage from '../../../assets/img/background_img_login.png';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, PanelsTopLeft } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../../../components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';
import { ACCESS_TOKEN_KEY } from '../../../lib/token';
import { cn } from '../../../lib/utils';
import { postLogin } from '../../../services/users';
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
    username: z.string().min(1, 'Please input username.'),
    password: z.string().min(1, 'Please input password.')
});

interface LoginFormProps {
    onSubmit: (values: z.infer<typeof loginSchema>) => void;
    isLoading: boolean;
}

const LoginForm = ({ onSubmit, isLoading }: LoginFormProps) => {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: ''
        }
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="h-full w-full">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tài khoản</FormLabel>
                            <FormControl className="border border-gray-500">
                                <Input placeholder="Your username" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mật khẩu</FormLabel>
                            <FormControl className="border border-gray-500">
                                <Input type="password" placeholder="Your password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="mt-6 text-right">
                    <a href="#">Quên mật khẩu?</a>
                    <Button className="mt-4 w-full" type="submit">
                        {isLoading ? <LoaderCircle className="animate-spin" /> : <>Sign in</>}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

const LoginPage = () => {
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
        console.log('Login submitted:', values);
        setLoading(true);
        await postLogin(values)
            .then((res) => {
                if (res.status !== 200 || res?.data.isSuccess === false) {
                    toast.error('Đăng nhập thất bại');
                    throw new Error('Login failed');
                }
                if (res?.data !== null && res?.data.isSuccess === true) {
                    //TODO
                    toast.success('Đăng nhập thành công');
                    sessionStorage.setItem(ACCESS_TOKEN_KEY, res?.data?.accessToken as string);
                    navigate('/')
                }
            })
            .catch((error) => {
                toast.error('Đăng nhập thất bại');
                console.error('Error during login:', error);
            })
            .finally((): void => {
                setLoading(false);
            });
    };

    return (
        <div
            className="flex min-h-screen w-full items-center justify-center"
            style={{
                backgroundImage: 'linear-gradient(to bottom left, #fff, #E3D9F9)'
            }}
        >
            <div className="h-full w-1/2 p-8">
                <div className="mx-auto w-3/5 rounded-lg bg-white p-8 shadow-lg">
                    <div className="m-3 flex w-full items-center justify-center">
                        <Button
                            className={cn('mb-1 transition-transform duration-300 ease-in-out')}
                            variant={'link'}
                            asChild
                        >
                            <a>
                                <PanelsTopLeft className="mr-1 h-12 w-12" />
                                <h1
                                    className={cn(
                                        'whitespace-nowrap text-3xl font-bold transition-[transform,opacity,display] duration-300 ease-in-out'
                                    )}
                                >
                                    Good Dentist
                                </h1>
                            </a>
                        </Button>
                    </div>
                    <LoginForm onSubmit={handleLoginSubmit} isLoading={isLoading} />
                </div>
            </div>
            <div className="hidden h-full w-1/2 lg:block">
                <img src={loginImage} alt="Login" className="h-full w-4/5 object-cover" />
            </div>
        </div>
    );
};

export default LoginPage;
