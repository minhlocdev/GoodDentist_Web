import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { LoaderCircle } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '../../../components/ui/button';
import { DialogClose, DialogFooter } from '../../../components/ui/dialog';
import { ScrollArea } from '../../../components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tab';
import { StaffFormSchema } from '../../../lib/form-schema';
import { IPostUser } from '../../../lib/interfaces/user-types/IPostUser';
import { IUser } from '../../../lib/interfaces/user-types/IUser';
import { userService } from '../../../services/queries/userQuery';
import AccountInfoForm from './account-form';
import BasicInfoForm from './info-form';

interface StaffFormProps {
    staff?: IUser;
}

export const StaffForm = ({ staff }: StaffFormProps) => {
    const postUser = userService.PostUser();
    const form = useForm<z.infer<typeof StaffFormSchema>>({
        resolver: zodResolver(StaffFormSchema),
        defaultValues: staff
            ? {
                  userName: staff.userName,
                  avatar: staff.avatar ?? '',
                  name: staff.name,
                  dob: staff.dob,
                  phoneNumber: staff.phoneNumber,
                  email: staff.email,
                  address: staff.address,
                  password: staff.password,
                  gender: staff.gender,
                  roleId: staff.roleId,
                  status: true
              }
            : undefined,
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false
    });

    async function onSubmit(values: z.infer<typeof StaffFormSchema>) {
        try {
            const newUser: IPostUser = {
                userName: values.userName,
                name: values.name,
                dob: values.dob,
                phoneNumber: values.phoneNumber,
                email: values.email,
                gender: values.gender,
                address: values.address,
                roleId: values.roleId,
                password: values.password,
                clinicId: values.clinicId,
                status: values.status,
                avatar: values.avatar
            };
            await postUser.mutateAsync(newUser, {
                onSuccess: () => {
                    toast.success('Tạo mới thành công');
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
                <ScrollArea className="mb-1">
                    <Tabs defaultValue="basic" className="max-h-[75dvh] w-full px-5">
                        <TabsList>
                            <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
                            <TabsTrigger value="account">Thông tin tài khoản</TabsTrigger>
                        </TabsList>

                        <TabsContent value="basic" className="flex flex-col gap-y-6">
                            <BasicInfoForm isPending={postUser?.isPending}/>
                        </TabsContent>
                        <TabsContent value="account" className="flex flex-col gap-y-6">
                            <AccountInfoForm isPending={postUser?.isPending}/>
                        </TabsContent>
                    </Tabs>
                </ScrollArea>
                <DialogFooter className="flex flex-row justify-between border-t border-neutral-300 p-5">
                    <Button type="submit" className="flex-1">
                        {postUser?.isPending ? (
                            <LoaderCircle className="animate-spin" />
                        ) : staff ? (
                            'Cập nhật'
                        ) : (
                            'Thêm mới'
                        )}
                    </Button>
                    <DialogClose className="flex-1">
                        <Button variant={'secondary'} className="w-full hover:bg-neutral-200">
                            Hủy bỏ
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </form>
        </FormProvider>
    );
};
