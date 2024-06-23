import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../../../components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '../../../components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';

import { SquarePen } from 'lucide-react';
import { DatePicker } from '../../../components/ui/date-picker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tab';
import { IUser } from '../../../lib/interfaces/user-types/IUser';

const formSchema = z
    .object({
        username: z.string().min(2, {
            message: 'Username must be at least 2 characters.'
        }),
        dob: z.date().optional(),
        phone: z.string().min(10, {
            message: 'Phone number must be at least 10 digits.'
        }),
        email: z.string().email({
            message: 'Invalid email address.'
        }),
        gender: z.enum(['Nam', 'Nữ', 'Khác'], {
            message: 'Gender is required.'
        }),
        address: z.string().optional(),
        role: z.string().min(1, {
            message: 'Role is required.'
        }),
        password: z.string().min(6, {
            message: 'Password must be at least 6 characters.'
        }),
        confirmPassword: z.string().min(6, {
            message: 'Confirm Password must be at least 6 characters.'
        })
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords do not match.'
    });

interface StaffFormProps {
    staff?: IUser;
}
export const NewStaffModal = ({ staff }: StaffFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: staff
            ? {
                  username: staff.user_name,
                  dob: staff.dob,
                  phone: staff.phone_number,
                  email: staff.email,
                  address: staff.address,
                  password: staff.password,
                  gender: staff.gender,
                  role: staff.role?.name
              }
            : undefined
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            // Perform asynchronous operations here, such as sending data to a server.
            console.log(values);
            // For example:
            const result = await Promise.resolve('value');
            console.log('Form submitted successfully:', result);
        } catch (error) {
            // Handle any errors here.
            console.error(error);
        }
    }
    return (
        <Dialog>
            <DialogTrigger>
                {!staff ? (
                    <Button>Thêm mới</Button>
                ) : (
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <SquarePen className="h-5 w-5 text-primary" />
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Thêm mới nhân viên</DialogTitle>
                        </DialogHeader>
                        <Tabs defaultValue="basic" className="w-full px-5 py-2">
                            <TabsList>
                                <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
                                <TabsTrigger value="account">Thông tin tài khoản</TabsTrigger>
                            </TabsList>

                            <TabsContent value="basic" className="flex flex-col gap-y-6">
                                {/* Username */}
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Họ và tên <span className="text-red-600">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Họ tên" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* DOB */}
                                <FormField
                                    control={form.control}
                                    name="dob"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Ngày sinh</FormLabel>
                                            <FormControl>
                                                <DatePicker
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex flex-row flex-wrap justify-between">
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone Number</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="0123456789" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="example@example.com"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Gender</FormLabel>
                                                <FormControl>
                                                    <select {...field} className="w-full">
                                                        <option value="Nam">Nam</option>
                                                        <option value="Nữ">Nữ</option>
                                                        <option value="Khác">Khác</option>
                                                    </select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Address</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="123 Main St" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="role"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Role</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Staff Role" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </TabsContent>
                            <TabsContent value="account">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="Password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="Confirm Password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </TabsContent>
                        </Tabs>
                        <DialogFooter className="flex flex-row justify-between border-t border-neutral-300 p-5">
                            <Button type="submit" className="flex-1">
                                Thêm mới
                            </Button>
                            <DialogClose className="flex-1">
                                <Button
                                    variant={'secondary'}
                                    className="w-full hover:bg-neutral-200"
                                >
                                    Hủy bỏ
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
