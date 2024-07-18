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
import { ClinicFormSchema } from '../../../lib/form-schema';
import { IClinic } from '../../../lib/interfaces/clinics-types/IClinic';
import { IPostClinic } from '../../../lib/interfaces/clinics-types/IPostClinic';
import { extractLastDistrictAndProvince } from '../../../lib/params-util';
import { queryClient } from '../../../lib/queryClient';
import { clinicService } from '../../../services/queries/clinicQuery';
import ClinicInfoForm from './clinic-info-form';

interface ClinicFormProps {
    clinic?: IClinic;
    onCloseModal: () => void;
}

export const ClinicForm = ({ clinic, onCloseModal }: ClinicFormProps) => {
    const postClinic = clinicService.PostClinic();
    const putClinic = clinicService.PutClinic();
    const { address, district, province } = extractLastDistrictAndProvince(clinic?.address ?? '');
    const form = useForm<z.infer<typeof ClinicFormSchema>>({
        resolver: zodResolver(ClinicFormSchema),
        defaultValues: clinic
            ? {
                  clinicName: clinic.clinicName,
                  phoneNumber: clinic.phoneNumber,
                  email: clinic.email,
                  province: province,
                  district: district,
                  address: address,
                  status: clinic?.status
              }
            : {
                  status: true
              },
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false
    });

    async function onSubmit(values: z.infer<typeof ClinicFormSchema>) {
        try {
            if (!clinic) {
                await post(values);
            } else {
                await put(values);
            }
            onCloseModal();
        } catch (error) {
            console.error(error);
        }
    }

    async function post(values: z.infer<typeof ClinicFormSchema>) {
        const newClinic: IPostClinic = {
            clinicName: values.clinicName,
            phoneNumber: values.phoneNumber,
            email: values.email,
            address: values.address + ' - ' + values.district + ' - ' + values.province,
            status: values.status,
            service: []
        };
        await postClinic.mutateAsync(newClinic, {
            onSuccess: async (res) => {
                if (res.isSuccess) {
                    toast.success('Tạo mới thành công');
                    await queryClient.invalidateQueries({ queryKey: ['clinics'] });
                } else {
                    toast.error('Tạo mới thất bại');
                }
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
    async function put(values: z.infer<typeof ClinicFormSchema>) {
        const newClinic: IPostClinic = {
            clinicId: clinic?.clinicId ?? '',
            clinicName: values.clinicName,
            phoneNumber: values.phoneNumber,
            email: values.email,
            address: values.address + ' - ' + values.district + ' - ' + values.province,
            status: values.status,
            service: []
        };
        await putClinic.mutateAsync(newClinic, {
            onSuccess: async (res) => {
                if (res.isSuccess) {
                    toast.success('Cập nhật thành công');
                    await queryClient.invalidateQueries({ queryKey: ['clinics'] });
                } else {
                    toast.error('Cập nhật thất bại');
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
    }
    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <ScrollArea className="mb-1 min-h-[300px]">
                    <Tabs defaultValue="basic" className="max-h-[75dvh] w-full px-5">
                        <TabsList>
                            <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
                        </TabsList>

                        <TabsContent value="basic" className="flex flex-col gap-y-6">
                            <ClinicInfoForm isPending={postClinic?.isPending} />
                        </TabsContent>
                    </Tabs>
                </ScrollArea>
                <DialogFooter className="flex flex-row justify-between border-t border-neutral-300 p-5">
                    <Button type="submit" className="flex-1" disabled={postClinic?.isPending}>
                        {postClinic?.isPending ? (
                            <LoaderCircle className="animate-spin" />
                        ) : clinic ? (
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
