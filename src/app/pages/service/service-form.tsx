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
import { ServiceFormSchema } from '../../../lib/form-schema';
import { IPostService } from '../../../lib/interfaces/services-types/IPostService';
import { IService } from '../../../lib/interfaces/services-types/IService';
import { queryClient } from '../../../lib/queryClient';
import { serviceService } from '../../../services/queries/serviceQuery';
import ServiceInfoForm from './service-info-form';

interface ServiceFormProps {
    service?: IService;
    onCloseModal: () => void;
}

export const ServiceForm = ({ service, onCloseModal }: ServiceFormProps) => {
    const postService = serviceService.PostService();
    const putService = serviceService.PutService();
    const form = useForm<z.infer<typeof ServiceFormSchema>>({
        resolver: zodResolver(ServiceFormSchema),
        defaultValues: service
            ? {
                  serviceName: service.serviceName,
                  description: service.description,
                  price: service.price,
                  status: service?.status
              }
            : {
                  status: true
              },
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false
    });

    async function onSubmit(values: z.infer<typeof ServiceFormSchema>) {
        try {
            if (!service) {
                await post(values);
            } else {
                await put(values);
            }
            onCloseModal();
        } catch (error) {
            console.error(error);
        }
    }

    async function post(values: z.infer<typeof ServiceFormSchema>) {
        const newService: IPostService = {
            serviceName: values.serviceName,
            description: values.description,
            price: values.price,
            status: values.status
        };
        await postService.mutateAsync(newService, {
            onSuccess: async (res) => {
                if (res.isSuccess) {
                    toast.success('Tạo mới thành công');
                    await queryClient.invalidateQueries({ queryKey: ['services'] });
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
    async function put(values: z.infer<typeof ServiceFormSchema>) {
        const newService: IPostService = {
            serviceId: service?.serviceId ?? 0,
            serviceName: service?.serviceName,
            description: values.description,
            price: values.price,
            status: values.status
        };
        await putService.mutateAsync(newService, {
            onSuccess: async (res) => {
                if (res.isSuccess) {
                    toast.success('Cập nhật thành công');
                    await queryClient.invalidateQueries({ queryKey: ['services'] });
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
                            <ServiceInfoForm isPending={postService?.isPending} />
                        </TabsContent>
                    </Tabs>
                </ScrollArea>
                <DialogFooter className="flex flex-row justify-between border-t border-neutral-300 p-5">
                    <Button type="submit" className="flex-1" disabled={postService?.isPending}>
                        {postService?.isPending ? (
                            <LoaderCircle className="animate-spin" />
                        ) : service ? (
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
