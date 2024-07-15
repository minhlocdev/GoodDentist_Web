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
import { EditStaffFormSchema } from '../../../lib/form-schema';
import { IPostUser } from '../../../lib/interfaces/user-types/IPostUser';
import { IUser } from '../../../lib/interfaces/user-types/IUser';
import { extractLastDistrictAndProvince } from '../../../lib/params-util';
import { queryClient } from '../../../lib/queryClient';
import { userService } from '../../../services/queries/userQuery';
import EditAccountInfoForm from './edit-account-form';
import EditBasicInfoForm from './edit-info-form';

interface StaffFormProps {
    staff?: IUser;
    onCloseModal: () => void;
}

export const EditStaffForm = ({ staff, onCloseModal }: StaffFormProps) => {
    const putUser = userService.PutUser();
    const { address, district, province } = extractLastDistrictAndProvince(staff?.address ?? '');
    const form = useForm<z.infer<typeof EditStaffFormSchema>>({
        resolver: zodResolver(EditStaffFormSchema),
        defaultValues: staff
            ? {
                  userName: staff.userName,
                  avatar: staff.avatar ?? '',
                  imageUrl: (staff.avatar as string) ?? '',
                  name: staff.name,
                  dob: staff.dob ? new Date(staff.dob) : undefined,
                  phoneNumber: staff.phoneNumber,
                  email: staff.email,
                  province: province,
                  district: district,
                  address: address,
                  gender: staff.gender,
                  roleId: staff.roleId,
                  clinicId: staff?.clinics?.[0].clinicId ?? '',
                  status: staff?.status,
                  reset: false
              }
            : undefined,
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false
    });

    async function onSubmit(values: z.infer<typeof EditStaffFormSchema>) {
        try {
            const newUser: IPostUser = {
                userName: values.userName,
                name: values.name,
                dob: values.dob,
                phoneNumber: values.phoneNumber,
                email: values.email,
                gender: values.gender,
                address: values.address + ' - ' + values.district + ' - ' + values.province,
                roleId: values.roleId,
                clinicId: values.clinicId,
                status: values.status,
                avatar: values.avatar instanceof File ? values.avatar : undefined,
                reset: values.reset,
                imageUrl: staff?.avatar as string
            };
            await putUser.mutateAsync(newUser, {
                onSuccess: async (res) => {
                    if (res.isSuccess) {
                        toast.success('Cập nhật thành công');
                        await queryClient.refetchQueries({ queryKey: ['users'] });
                    } else {
                        toast.error('Cập nhật thất bại ' + res.message);
                    }
                    onCloseModal();
                },
                onError: (error) => {
                    if (error instanceof AxiosError && error.response?.data?.statusCode === 400) {
                        toast.error(error.response.data.message[0] as React.ReactNode);
                    } else {
                        toast.error('Cập nhật thất bại');
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
                <ScrollArea className="mb-1 min-h-[300px]">
                    <Tabs defaultValue="basic" className="max-h-[75dvh] w-full px-5">
                        <TabsList>
                            <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
                            <TabsTrigger value="account">Thông tin tài khoản</TabsTrigger>
                        </TabsList>

                        <TabsContent value="basic" className="flex flex-col gap-y-6">
                            <EditBasicInfoForm isPending={putUser?.isPending} />
                        </TabsContent>
                        <TabsContent value="account" className="flex flex-col gap-y-6">
                            <EditAccountInfoForm isPending={putUser?.isPending} />
                        </TabsContent>
                    </Tabs>
                </ScrollArea>
                <DialogFooter className="flex flex-row justify-between border-t border-neutral-300 p-5">
                    <Button type="submit" className="flex-1" disabled={putUser?.isPending}>
                        {putUser?.isPending ? (
                            <LoaderCircle className="animate-spin" />
                        ) : (
                            'Cập nhật'
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
