import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { ChevronsUpDown, PlusIcon } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../../components/ui/button';
import { DatePicker } from '../../../components/ui/date-picker';
import { DialogClose, DialogFooter } from '../../../components/ui/dialog';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';
import { CustomerComboBox } from '../../../components/ui/local/customer-combo-box';
import TimePickerPopover from '../../../components/ui/local/time-picker';
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/ui/pop-over';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../../../components/ui/select';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '../../../components/ui/tooltip';
import { useCalendarStore } from '../../../hooks/use-calendar-store';
import { floorToNearestFifteen } from '../../../lib/calendar-utils';
import { AppointmentFormSchema } from '../../../lib/form-schema';
import { cn } from '../../../lib/utils';
import { ICustomer } from '../../../lib/interfaces/customer-types/ICustomer';

interface AppointmentFormProps {
    customer?: ICustomer;
}
const customers = [
    {
        value: 'next.js',
        label: 'Next.js'
    },
    {
        value: 'sveltekit',
        label: 'SvelteKit'
    },
    {
        value: 'nuxt.js',
        label: 'Nuxt.js'
    },
    {
        value: 'remix',
        label: 'Remix'
    },
    {
        value: 'astro',
        label: 'Astro'
    }
];
const AppointmentForm = ({ customer }: AppointmentFormProps) => {
    const { selectedSlot, view } = useCalendarStore();

    const form = useForm<z.infer<typeof AppointmentFormSchema>>({
        resolver: zodResolver(AppointmentFormSchema),
        defaultValues: {
            customerId: customer?.userId.toString() ?? '',
            phoneNumber: customer?.phoneNumber ?? '',
            dentistId: (selectedSlot?.resourceId as string) ?? '',
            clinicId: '',
            mode: 'Khám mới',
            examinationProfileId: '',
            dayStart: selectedSlot?.start,
            timeStart:
                view === 'month'
                    ? floorToNearestFifteen(new Date())
                    : format(selectedSlot?.start ?? new Date(), 'HH:mm'),
            duration: '15',
            notes: '',
            status: 1
        },
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false
    });

    async function onSubmit(values: z.infer<typeof AppointmentFormSchema>) {
        try {
            await Promise.resolve(values);
            console.log(values);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-x-2 gap-y-4 px-3">
                    <div className="flex w-full items-end">
                        <div className="w-full">
                            <FormField
                                control={form.control}
                                name="customerId"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-y-1">
                                        <FormLabel>
                                            Khách hàng<span className="text-red-500">*</span>
                                        </FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn(
                                                            'w-full justify-between rounded-e-none',
                                                            !field.value && 'text-muted-foreground'
                                                        )}
                                                    >
                                                        {field.value
                                                            ? customers.find(
                                                                  (customer) =>
                                                                      customer.value ===
                                                                      field.value.toString()
                                                              )?.label
                                                            : 'Chọn khách hàng...'}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full p-0">
                                                <CustomerComboBox />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button
                                        type="button"
                                        className="rounded-s-none"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <PlusIcon className="h-5 w-5" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <div>Thêm khách hàng mới</div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div className="w-full">
                        <div className="flex flex-col gap-y-1">
                            <p>Số điện thoại</p>
                            <Input type="text" placeholder="Số điện thoại" disabled />
                        </div>
                    </div>
                    <div className="w-full">
                        <FormField
                            control={form.control}
                            name="dentistId"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-y-1">
                                    <FormLabel>
                                        Bác sỹ<span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Chọn bác sỹ" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Nam">Nam</SelectItem>
                                                <SelectItem value="Nữ">Nữ</SelectItem>
                                                <SelectItem value="Khác">Khác</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-full">
                        <FormField
                            control={form.control}
                            name="mode"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-y-1">
                                    <FormLabel>
                                        Nội dung<span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value ?? 'Khám mới'}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Khám mới">Khám mới</SelectItem>
                                                <SelectItem value="Tái khám">Tái khám</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="col-span-2 grid w-full grid-cols-3 gap-x-3">
                        <div className="w-full flex-col gap-y-1">
                            <FormField
                                control={form.control}
                                name="dayStart"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-y-1">
                                        <FormLabel>
                                            Thời gian<span className="text-red-500">*</span>
                                        </FormLabel>
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
                        </div>
                        <div className="flex w-full flex-col justify-end gap-y-1">
                            <FormField
                                control={form.control}
                                name="timeStart"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-y-1">
                                        <FormControl>
                                            <TimePickerPopover
                                                value={field.value}
                                                onChange={field.onChange}
                                                minTime="08:00"
                                                maxTime="19:30"
                                                step={900}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex w-full flex-col justify-end gap-y-1">
                            <FormField
                                control={form.control}
                                name="duration"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col justify-end gap-y-1">
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Chọn thời lượng" />
                                                </SelectTrigger>
                                                <SelectContent className="max-h-40">
                                                    <SelectGroup>
                                                        <SelectItem value="15">15 phút</SelectItem>
                                                        <SelectItem value="30">30 phút</SelectItem>
                                                        <SelectItem value="45">45 phút</SelectItem>
                                                        <SelectItem value="60">1 giờ</SelectItem>
                                                        <SelectItem value="75">
                                                            1 giờ 15 phút
                                                        </SelectItem>
                                                        <SelectItem value="90">
                                                            1 giờ 30 phút
                                                        </SelectItem>
                                                        <SelectItem value="105">
                                                            1 giờ 45 phút
                                                        </SelectItem>
                                                        <SelectItem value="120">2 giờ</SelectItem>
                                                        <SelectItem value="135">
                                                            2 giờ 15 phút
                                                        </SelectItem>
                                                        <SelectItem value="150">
                                                            2 giờ 30 phút
                                                        </SelectItem>
                                                        <SelectItem value="165">
                                                            2 giờ 45 phút
                                                        </SelectItem>
                                                        <SelectItem value="180">3 giờ</SelectItem>
                                                        <SelectItem value="195">
                                                            3 giờ 15 phút
                                                        </SelectItem>
                                                        <SelectItem value="210">
                                                            3 giờ 30 phút
                                                        </SelectItem>
                                                        <SelectItem value="225">
                                                            3 giờ 45 phút
                                                        </SelectItem>
                                                        <SelectItem value="240">4 giờ</SelectItem>
                                                        <SelectItem value="255">
                                                            4 giờ 15 phút
                                                        </SelectItem>
                                                        <SelectItem value="270">
                                                            4 giờ 30 phút
                                                        </SelectItem>
                                                        <SelectItem value="285">
                                                            4 giờ 45 phút
                                                        </SelectItem>
                                                        <SelectItem value="300">5 giờ</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="col-span-2">
                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem className="flex flex-col justify-end gap-y-1">
                                    <FormLabel>Ghi chú</FormLabel>
                                    <FormControl>
                                        <textarea
                                            rows={4}
                                            cols={50}
                                            placeholder="Nhập ghi chú"
                                            {...field}
                                            className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                        ></textarea>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <DialogFooter className="flex flex-row justify-between border-t border-neutral-300 p-5">
                    <Button type="submit" className="flex-1">
                        Thêm mới
                    </Button>
                    <DialogClose className="flex-1" asChild>
                        <Button variant={'secondary'} className="w-full hover:bg-neutral-200">
                            Hủy bỏ
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </form>
        </FormProvider>
    );
};

export default AppointmentForm;
