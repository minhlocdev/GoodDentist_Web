import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../../components/ui/button';
import { DialogClose, DialogFooter } from '../../../components/ui/dialog';
import { ScrollArea } from '../../../components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tab';
import { CustomerFormSchema } from '../../../lib/form-schema';
import { ICustomer } from '../../../lib/interfaces/customer-types/ICustomer';
import { userService } from '../../../services/queries/userQuery';
import AnamnesisForm from './anamnesis-form';
import CustomerInfoForm from './customer-info-form';

interface CustomerFormProps {
    customer?: ICustomer;
    onCloseModal: () => void;
}

export const CustomerForm = ({ customer, onCloseModal }: CustomerFormProps) => {
    const postUser = userService.PostUser();
    const form = useForm<z.infer<typeof CustomerFormSchema>>({
        resolver: zodResolver(CustomerFormSchema),
        defaultValues: customer
            ? {
                  name: customer?.name,
                  status: true
              }
            : {
                  clinicId: '77F675A1-62D8-49C4-86A3-1B34A2C890BE',
                  status: true
              },
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false
    });

    async function onSubmit(values: z.infer<typeof CustomerFormSchema>) {
        try {
            await Promise.resolve(values);
            onCloseModal();
            console.log(values);
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
                            <TabsTrigger value="anamnesis">Tiền sử bệnh</TabsTrigger>
                        </TabsList>

                        <TabsContent value="basic" className="flex flex-col gap-y-6">
                            <CustomerInfoForm isPending={postUser?.isPending} />
                        </TabsContent>
                        <TabsContent value="anamnesis" className="flex flex-col gap-y-6">
                            <AnamnesisForm isPending={postUser?.isPending} />
                        </TabsContent>
                    </Tabs>
                </ScrollArea>
                <DialogFooter className="flex flex-row justify-between border-t border-neutral-300 p-5">
                    <Button type="submit" className="flex-1" disabled={postUser?.isPending}>
                        {postUser?.isPending ? (
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
