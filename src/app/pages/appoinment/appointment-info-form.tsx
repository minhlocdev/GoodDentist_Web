import { addMinutes, set } from 'date-fns';
import { ChevronsUpDown, PlusIcon } from 'lucide-react';
import { FieldValues, useFormContext } from 'react-hook-form';
import { Button } from '../../../components/ui/button';
import { DatePicker } from '../../../components/ui/date-picker';
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
import { ICustomer } from '../../../lib/interfaces/customer-types/ICustomer';
import { cn } from '../../../lib/utils';

interface AppointmentInfoFormProps {
    customers: ICustomer[] | undefined;
    timeRange: { timeStart: Date; timeEnd: Date };
    handleTimeRange: (timeRange: { timeStart: Date; timeEnd: Date }) => void;
}
const AppointmentInfoForm = ({
    customers,
    timeRange,
    handleTimeRange
}: AppointmentInfoFormProps) => {
    const { control, setValue, getValues } = useFormContext<FieldValues>();

    const handleChange = (field: 'timeStart' | 'timeEnd', value: Date) => {
        handleTimeRange({ ...timeRange, [field]: value });
    };

    const handleDayStartChange = (date: Date) => {
        const tmpTimeStart = set(date, {
            hours: timeRange.timeStart.getHours(),
            minutes: timeRange.timeStart.getMinutes()
        });
        handleChange('timeStart', tmpTimeStart);

        const duration = Number(getValues('duration'));
        handleChange('timeEnd', addMinutes(tmpTimeStart, duration));
    };

    const handleTimeStartChange = (value: string) => {
        const [hours, minutes] = value.split(':').map(Number);
        const tmpTimeStart = set(timeRange.timeStart, { hours, minutes });
        handleChange('timeStart', tmpTimeStart);

        const duration = Number(getValues('duration'));
        handleChange('timeEnd', addMinutes(tmpTimeStart, duration));
    };

    console.log(timeRange);
    return (
        <div className="col-span-1 grid grid-cols-1 gap-x-2 gap-y-4 border-r border-neutral-300 pr-3 md:col-span-9 md:grid-cols-2">
            <div className="flex w-full items-end">
                <div className="w-full">
                    <FormField
                        control={control}
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
                                                {field.value && customers
                                                    ? customers.find(
                                                          (customer) =>
                                                              customer.userId === field.value
                                                      )?.name
                                                    : 'Chọn khách hàng...'}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                        {customers && (
                                            <CustomerComboBox
                                                customers={customers}
                                                onSelect={(value) => {
                                                    field.onChange(value);
                                                    setValue(
                                                        'phoneNumber',
                                                        customers.find(
                                                            (customer) => customer.userId === value
                                                        )?.phoneNumber ?? ''
                                                    );
                                                }}
                                            />
                                        )}
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
                <FormField
                    control={control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-y-1">
                            <FormLabel>
                                Số điện thoại<span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Số điện thoại"
                                    {...field}
                                    disabled
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="col-span-1 grid grid-flow-col gap-x-3 md:col-span-2">
                <div className="w-full">
                    <FormField
                        control={control}
                        name="mode"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-y-1">
                                <FormLabel>
                                    Nội dung<span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                            setValue('examinationProfileId', 0);
                                        }}
                                        value={(field.value as string) ?? 'new'}
                                        defaultValue="new"
                                        disabled={getValues('customerId') === ''}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="new">Khám mới</SelectItem>
                                            <SelectItem value="old">Tái khám</SelectItem>
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
                        control={control}
                        name="examinationProfileId"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-y-1">
                                <FormLabel>
                                    Hồ sơ khám<span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={(value) => {
                                            field.onChange(Number(value));
                                        }}
                                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
                                        value={field.value ? field.value.toString() : '0'}
                                        disabled={getValues('mode') === 'new'}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0">Mã tự động</SelectItem>
                                            {customers
                                                ?.find((c) => c.userId === getValues('customerId'))
                                                ?.examinationProfiles?.map((ex) => (
                                                    <SelectItem
                                                        key={ex.examinationProfileId}
                                                        value={ex.examinationProfileId.toString()}
                                                    >
                                                        {ex.diagnosis}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>
            <div className="col-span-1 grid w-full grid-cols-1 gap-x-3 md:col-span-2 md:grid-flow-col">
                <div className="flex flex-col gap-y-1">
                    <FormField
                        control={control}
                        name="dayStart"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-y-1">
                                <FormLabel>
                                    Thời gian<span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                    <DatePicker
                                        value={field.value as Date}
                                        onChange={(value) => {
                                            handleDayStartChange(value!);
                                            field.onChange(value);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-col justify-end gap-y-1">
                    <FormField
                        control={control}
                        name="timeStart"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-y-1">
                                <FormLabel></FormLabel>
                                <FormControl>
                                    <TimePickerPopover
                                        value={field.value as string}
                                        onChange={(value) => {
                                            handleTimeStartChange(value);
                                            field.onChange(value);
                                        }}
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
                <div className="flex flex-col justify-end gap-y-1">
                    <FormField
                        control={control}
                        name="duration"
                        render={({ field }) => (
                            <FormItem className="flex flex-col justify-end gap-y-1">
                                <FormLabel></FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={(value) => {
                                            const tmpTimeStart = addMinutes(
                                                timeRange.timeStart,
                                                Number(value)
                                            );
                                            field.onChange(value);
                                            handleChange('timeEnd', tmpTimeStart);
                                        }}
                                        value={field.value as string}
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
                                                <SelectItem value="75">1 giờ 15 phút</SelectItem>
                                                <SelectItem value="90">1 giờ 30 phút</SelectItem>
                                                <SelectItem value="105">1 giờ 45 phút</SelectItem>
                                                <SelectItem value="120">2 giờ</SelectItem>
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
            <div className="col-span-1 md:col-span-2">
                <FormField
                    control={control}
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
    );
};

export default AppointmentInfoForm;
