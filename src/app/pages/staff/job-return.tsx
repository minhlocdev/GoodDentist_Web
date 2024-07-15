import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRightLeft, LoaderCircle } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
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
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '../../../components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../../../components/ui/select';
import { JobReturnSchema } from '../../../lib/form-schema';
import { IClinic } from '../../../lib/interfaces/clinics-types/IClinic';
import { IPostUser } from '../../../lib/interfaces/user-types/IPostUser';
import { clinicService } from '../../../services/queries/clinicQuery';
import { userService } from '../../../services/queries/userQuery';
import { toast } from 'sonner';
import { queryClient } from '../../../lib/queryClient';

interface JobTranferProps {
    user: IPostUser;
    open?: boolean;
    setOpen?: () => void;
}

const JobReturnForm = ({ user, open, setOpen }: JobTranferProps) => {
    const { data: clinics, isLoading } = clinicService.GetClinics();
    const { mutateAsync: putUser } = userService.PutUser();
    const form = useForm<z.infer<typeof JobReturnSchema>>({
        resolver: zodResolver(JobReturnSchema),
        defaultValues: {
            userName: user.userName,
            clinicId: ''
        },
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false
    });

    async function onSubmit(values: z.infer<typeof JobReturnSchema>) {
        try {
            const updatedUser: IPostUser = {
                ...user,
                clinicId: values.clinicId,
                status: true,
            };
            await putUser(updatedUser, {
                onSuccess: async (res) => {
                    if (res.isSuccess) {
                        toast.success('Cập nhật thành công');
                        await queryClient.refetchQueries({ queryKey: ['users'] });
                    } else {
                        toast.error(res.message);
                    }
                    
                },
                onError: (error) => {
                    toast.error('Cập nhật thất bại');
                    console.error('Failed to update status:', error);
                }
            });
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {open === undefined && (
                <DialogTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <ArrowRightLeft className="h-5 w-5 text-primary" />
                    </Button>
                </DialogTrigger>
            )}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Chọn cơ sở</DialogTitle>
                </DialogHeader>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="m-6 flex items-end justify-start align-middle">
                            <FormField
                                control={form.control}
                                name="clinicId"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-y-1">
                                        <FormLabel>Phòng khám mới</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={(value) => field.onChange(value)}
                                                value={field.value ? String(field.value) : ''}
                                            >
                                                <SelectTrigger className="min-w-[150px]">
                                                    <SelectValue placeholder="Chọn phòng khám" />
                                                </SelectTrigger>
                                                <SelectContent className="min-w-[150px]">
                                                    {!isLoading ? (
                                                        clinics?.map((clinic: IClinic) => (
                                                            <SelectItem
                                                                key={clinic.clinicId}
                                                                value={clinic.clinicId}
                                                            >
                                                                {clinic.clinicName}
                                                            </SelectItem>
                                                        ))
                                                    ) : (
                                                        <div className="flex justify-center p-2">
                                                            <LoaderCircle className="animate-spin" />
                                                        </div>
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="flex flex-row justify-between border-t border-neutral-300 p-5">
                            <Button type="submit" className="flex-1">
                                Xác nhận
                            </Button>
                            <DialogClose asChild>
                                <Button variant="secondary" className="flex-1">
                                    Hủy bỏ
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
};

export default JobReturnForm;
