import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../../components/ui/button';
import { DialogClose, DialogFooter } from '../../../components/ui/dialog';
import { ScrollArea } from '../../../components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tab';
import { StaffFormSchema } from '../../../lib/form-schema';
import { IUser } from '../../../lib/interfaces/user-types/IUser';
import AccountInfoForm from './account-form';
import BasicInfoForm from './info-form';

interface StaffFormProps {
    staff?: IUser;
}

export const StaffForm = ({ staff }: StaffFormProps) => {
    const form = useForm<z.infer<typeof StaffFormSchema>>({
        resolver: zodResolver(StaffFormSchema),
        defaultValues: staff
            ? {
                  username: staff.userName,
                  avatar: staff.avatar ?? "",
                  name: staff.name,
                  dob: staff.dob,
                  phone: staff.phoneNumber,
                  email: staff.email,
                  address: staff.address,
                  password: staff.password,
                  gender: staff.gender,
                  role: staff.roleId,
              }
            : undefined,
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false
    });

    async function onSubmit(values: z.infer<typeof StaffFormSchema>) {
        try {
            console.log(values);
            const result = await Promise.resolve('value');
            console.log('Form submitted successfully:', result);
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
                            <BasicInfoForm />
                        </TabsContent>
                        <TabsContent value="account" className="flex flex-col gap-y-6">
                            <AccountInfoForm />
                        </TabsContent>
                    </Tabs>
                </ScrollArea>
                <DialogFooter className="flex flex-row justify-between border-t border-neutral-300 p-5">
                    <Button type="submit" className="flex-1">
                        Thêm mới
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
