import { useForm } from 'react-hook-form';
import { z } from 'zod';
import loginImage from '../../../assets/img/background_img_login.png';
import logo from '../../../assets/img/logo.svg';

import { zodResolver } from '@hookform/resolvers/zod';
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

const loginSchema = z.object({
    username: z.string().min(1, 'Please input username.'),
    password: z.string().min(1, 'Please input password.')
});

interface LoginFormProps {
    onSubmit: (values: z.infer<typeof loginSchema>) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema)
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
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
                            <FormLabel>Password</FormLabel>
                            <FormControl className="border border-gray-500">
                                <Input type="password" placeholder="Your password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="mt-6 text-right">
                    <a href="#">Forgot Password?</a>
                    <Button className="mt-4 w-full" type="submit">
                        Sign In
                    </Button>
                </div>
            </form>
        </Form>
    );
};

const LoginPage = () => {
    const handleLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
        try {
            console.log('Login submitted:', values);
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });
            if (!response.ok) {
                throw new Error('Login failed');
            }
            console.log('Login successful:', await response.json());
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div
            className="flex min-h-screen w-full items-center justify-center"
            style={{
                backgroundImage: 'linear-gradient(to bottom left, #fff, #E3D9F9)'
            }}
        >
            <div className="h-full w-1/2 p-8">
                <div className="mx-auto h-max w-3/5 rounded-lg bg-white p-8 shadow-lg">
                    <img className="mx-auto mb-4" src={logo} alt="Logo" />
                    <LoginForm onSubmit={handleLoginSubmit} />
                </div>
            </div>
            <div className="hidden h-full w-1/2 lg:block">
                <img src={loginImage} alt="Login" className="h-full w-4/5 object-cover" />
            </div>
        </div>
    );
};

export default LoginPage;
