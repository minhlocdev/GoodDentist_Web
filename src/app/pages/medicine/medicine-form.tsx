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
import { MedicineFormSchema } from '../../../lib/form-schema';
import { IMedicine } from '../../../lib/interfaces/IMedicine';
import { IPostMedicine } from '../../../lib/interfaces/medicine-types/IPostMedicine';
import { queryClient } from '../../../lib/queryClient';
import { medicineService } from '../../../services/queries/medicineQuery';
import MedicineInfoForm from './medicine-info-form';

interface MedicineFormProps {
    medicine?: IMedicine;
    onCloseModal: () => void;
}

export const MedicineForm = ({ medicine, onCloseModal }: MedicineFormProps) => {
    const postMedicine = medicineService.PostMedicine();
    const putMedicine = medicineService.PutMedicine();
    const form = useForm<z.infer<typeof MedicineFormSchema>>({
        resolver: zodResolver(MedicineFormSchema),
        defaultValues: medicine
            ? {
                  medicineName: medicine.medicineName,
                  type: medicine.type,
                  quantity: medicine.quantity,
                  unit: medicine.unit,
                  description: medicine.description,
                  price: medicine.price,
                  status: medicine?.status
              }
            : {
                  status: true
              },
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false
    });

    async function onSubmit(values: z.infer<typeof MedicineFormSchema>) {
        try {
            if (!medicine) {
                await post(values);
            } else {
                await put(values);
            }
            onCloseModal();
        } catch (error) {
            console.error(error);
        }
    }

    async function post(values: z.infer<typeof MedicineFormSchema>) {
        const newMedicine: IPostMedicine = {
            medicineName: values.medicineName,
            type: values.type,
            unit: values.unit,
            quantity: values.quantity,
            description: values.description,
            price: values.price,
            status: values.status
        };
        await postMedicine.mutateAsync(newMedicine, {
            onSuccess: async (res) => {
                if (res.isSuccess) {
                    toast.success('Tạo mới thành công');
                    await queryClient.invalidateQueries({ queryKey: ['medicines'] });
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
    async function put(values: z.infer<typeof MedicineFormSchema>) {
        const newMedicine: IPostMedicine = {
            medicineId: medicine?.medicineId ?? 0,
            medicineName: values.medicineName,
            type: values.type,
            quantity: values.quantity,
            unit: values.unit,
            description: values.description,
            price: values.price,
            status: values.status
        };
        await putMedicine.mutateAsync(newMedicine, {
            onSuccess: async (res) => {
                if (res.isSuccess) {
                    toast.success('Cập nhật thành công');
                    await queryClient.invalidateQueries({ queryKey: ['medicines'] });
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
                            <MedicineInfoForm isPending={postMedicine?.isPending} />
                        </TabsContent>
                    </Tabs>
                </ScrollArea>
                <DialogFooter className="flex flex-row justify-between border-t border-neutral-300 p-5">
                    <Button type="submit" className="flex-1" disabled={postMedicine?.isPending}>
                        {postMedicine?.isPending ? (
                            <LoaderCircle className="animate-spin" />
                        ) : medicine ? (
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
