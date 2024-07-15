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
import { CustomerFormSchema } from '../../../lib/form-schema';
import { ICustomer } from '../../../lib/interfaces/customer-types/ICustomer';
import { IPostCustomer } from '../../../lib/interfaces/customer-types/IPostCustomer';
import { extractLastDistrictAndProvince } from '../../../lib/params-util';
import { queryClient } from '../../../lib/queryClient';
import { customerService } from '../../../services/queries/customerQuery';
import AnamnesisForm from './anamnesis-form';
import ClinicForm from './clinic-form';
import CustomerInfoForm from './customer-info-form';

interface CustomerFormProps {
    customer?: ICustomer;
    onCloseModal: () => void;
}

export const CustomerForm = ({ customer, onCloseModal }: CustomerFormProps) => {
    const postCustomer = customerService.PostCustomer();
    const putCustomer = customerService.PutCustomer();
    const { address, district, province } = extractLastDistrictAndProvince(customer?.address ?? '');
    const form = useForm<z.infer<typeof CustomerFormSchema>>({
        resolver: zodResolver(CustomerFormSchema),
        defaultValues: customer
            ? {
                  avatar: customer.avatar ?? '',
                  imageUrl: (customer.avatar as string) ?? '',
                  name: customer.name,
                  dob: customer.dob ? new Date(customer.dob) : undefined,
                  phoneNumber: customer.phoneNumber,
                  email: customer.email,
                  province: province,
                  district: district,
                  address: address,
                  gender: customer.gender,
                  clinicId: customer?.clinics?.[0].clinicId ?? '',
                  status: customer?.status,
                  anamnesis: customer?.anamnesis
              }
            : {
                  status: true
              },
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false
    });

    async function onSubmit(values: z.infer<typeof CustomerFormSchema>) {
        try {
            if (!customer) {
                await post(values);
            } else {
                await put(values);
            }
            onCloseModal();
        } catch (error) {
            console.error(error);
        }
    }

    async function post(values: z.infer<typeof CustomerFormSchema>) {
        const newCustomer: IPostCustomer = {
            name: values.name,
            dob: values.dob,
            phoneNumber: values.phoneNumber,
            email: values.email,
            gender: values.gender,
            address: values.address + ' - ' + values.district + ' - ' + values.province,
            clinicId: values.clinicId,
            status: values.status,
            avatar: values.avatar,
            imageUrl: null,
            anamnesis: values.anamnesis
        };
        await postCustomer.mutateAsync(newCustomer, {
            onSuccess: async (res) => {
                if (res.isSuccess) {
                    toast.success('Tạo mới thành công');
                    await queryClient.invalidateQueries({ queryKey: ['customers'] });
                }
                toast.error('Tạo mới thất bại');
                onCloseModal();
            },
            onError: (error) => {
                if (error instanceof AxiosError && error.response?.data?.statusCode === 400) {
                    toast.error(error.response.data.message[0] as React.ReactNode);
                } else {
                    toast.error('Tạo mới thất bại');
                }
            }
        });
    }
    async function put(values: z.infer<typeof CustomerFormSchema>) {
        const newCustomer: IPostCustomer = {
            userId: customer?.userId ?? '',
            name: values.name,
            dob: values.dob,
            phoneNumber: values.phoneNumber,
            email: values.email,
            gender: values.gender,
            address: values.address + ' - ' + values.district + ' - ' + values.province,
            clinicId: values.clinicId,
            status: values.status,
            avatar: values.avatar instanceof File ? values.avatar : undefined,
            imageUrl: customer?.avatar as string,
            anamnesis: values.anamnesis
        };
        await putCustomer.mutateAsync(newCustomer, {
            onSuccess: async (res) => {
                if (res.isSuccess) {
                    toast.success('Cập nhật thành công');
                    await queryClient.invalidateQueries({ queryKey: ['customers'] });
                }
                toast.error('Cập nhật thất bại');
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
    }
    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <ScrollArea className="mb-1 min-h-[300px]">
                    <Tabs defaultValue="basic" className="max-h-[75dvh] w-full px-5">
                        <TabsList>
                            <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
                            <TabsTrigger value="anamnesis">Tiền sử bệnh</TabsTrigger>
                            <TabsTrigger value="clinic">Phòng khám</TabsTrigger>
                        </TabsList>

                        <TabsContent value="basic" className="flex flex-col gap-y-6">
                            <CustomerInfoForm isPending={postCustomer?.isPending} />
                        </TabsContent>
                        <TabsContent value="anamnesis" className="flex flex-col gap-y-6">
                            <AnamnesisForm isPending={postCustomer?.isPending} />
                        </TabsContent>
                        <TabsContent value="clinic" className="flex flex-col gap-y-6">
                            <ClinicForm isPending={postCustomer?.isPending} />
                        </TabsContent>
                    </Tabs>
                </ScrollArea>
                <DialogFooter className="flex flex-row justify-between border-t border-neutral-300 p-5">
                    <Button type="submit" className="flex-1" disabled={postCustomer?.isPending}>
                        {postCustomer?.isPending ? (
                            <LoaderCircle className="animate-spin" />
                        ) : customer ? (
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
