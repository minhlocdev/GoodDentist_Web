import { useForm } from 'react-hook-form';
import { z } from 'zod';
import loginImage from '../../../assets/img/background_img_login.png';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, PanelsTopLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { useAuth } from '../../../hooks/use-auth';
import { ACCESS_TOKEN_KEY } from '../../../lib/token';
import { cn } from '../../../lib/utils';
import { userService } from '../../../services/queries/userQuery';

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
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tài khoản</FormLabel>
                            <FormControl className="border border-gray-500">
                                <Input
                                    placeholder="Your username"
                                    {...field}
                                    disabled={isLoading}
                                />
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
                                <Input
                                    type="password"
                                    placeholder="Your password"
                                    {...field}
                                    disabled={isLoading}
                                />
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
    const { accessToken, setAccessToken, setUser } = useAuth();
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        sessionStorage.removeItem(ACCESS_TOKEN_KEY);
        sessionStorage.removeItem('loginUser');
    }, [accessToken, navigate]);

    const handleLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
        setLoading(true);
        await userService
            .PostLoginUser(values)
            .then(async (res) => {
                if (res.status !== 200 || res?.data.isSuccess === false) {
                    toast.error('Sai tên đăng nhập hoặc mật khẩu');
                }
                if (res?.data !== null && res?.data.isSuccess === true) {
                    const token = res?.data?.accessToken as string;
                    sessionStorage.setItem(ACCESS_TOKEN_KEY, res?.data?.accessToken as string);
                    await userService
                        .GetLoginUser(token ?? '')
                        .then((res) => {
                            if (res.status !== 200 || res?.data.isSuccess === false) {
                                toast.error('Có gì đó sai sai');
                            }
                            if (res?.data !== null && res?.data.isSuccess === true) {
                                if (res?.data.result.status) {
                                    sessionStorage.setItem(
                                        'loginUser',
                                        JSON.stringify(res?.data?.result)
                                    );
                                    setUser(res?.data?.result);
                                    setAccessToken(token);
                                    toast.success('Đăng nhập thành công');
                                    localStorage.setItem(
                                        'clinic',
                                        JSON.stringify(res?.data?.result.clinics)
                                    );
                                    navigate('/');
                                } else
                                    toast.warning(
                                        'Tài khoản của bạn đã bị khóa. Xin hãy liên hệ 1900 1004 để được tư vấn'
                                    );
                            }
                        })
                        .catch(() => {
                            toast.error('Có gì đó sai sai');
                        });
                }
            })
            .catch(() => {
                toast.error('Đăng nhập thất bại');
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
            <div className="h-full w-full p-8 md:w-1/3">
                <div className="mx-auto rounded-lg bg-white p-8 shadow-lg">
                    <div className="m-3 flex w-full items-center justify-center">
                        <Button
                            className={cn('mb-1 transition-transform duration-300 ease-in-out')}
                            variant={'link'}
                            asChild
                        >
                            <a>
                                <PanelsTopLeft className="mr-1 h-6 w-6 md:h-12 md:w-12" />
                                <h1
                                    className={cn(
                                        'whitespace-nowrap text-xl font-bold transition-[transform,opacity,display] duration-300 ease-in-out md:text-3xl'
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
