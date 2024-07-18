import { FC } from 'react';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import { FormControl, FormItem, FormLabel, FormMessage } from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../../../components/ui/select';

interface BasicInfoProps {
    isPending?: boolean;
}

const MedicineInfoForm: FC<BasicInfoProps> = ({ isPending = false }) => {
    const {
        control,
        formState: { errors }
    } = useFormContext<FieldValues>();

    return (
        <>
            <div className="flex flex-row gap-x-6">
                <div className="flex flex-auto flex-col gap-y-6">
                    <Controller
                        control={control}
                        name="medicineName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Tên thuốc <span className="text-red-600">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Tên thuốc" {...field} />
                                </FormControl>
                                <FormMessage>
                                    {errors.medicineName && (
                                        <p>{errors.medicineName.message?.toString()}</p>
                                    )}
                                </FormMessage>
                            </FormItem>
                        )}
                        disabled={isPending}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-x-10">
                <Controller
                    control={control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Loại thuốc</FormLabel>
                            <FormControl className="w-80 flex-1">
                                <Select onValueChange={field.onChange} {...field}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Chọn loại thuốc" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Kháng sinh">Kháng sinh</SelectItem>
                                        <SelectItem value="Gây tê">Gây tê</SelectItem>
                                        <SelectItem value="Kháng khuẩn">Kháng khuẩn</SelectItem>
                                        <SelectItem value="Hóa sinh">Hóa sinh</SelectItem>
                                        <SelectItem value="Dược phẩm">Dược phẩm</SelectItem>
                                        <SelectItem value="Vitamin">Vitamin</SelectItem>
                                        <SelectItem value="Thuốc bổ">Thuốc bổ</SelectItem>
                                        <SelectItem value="Thuốc tây">Thuốc tây</SelectItem>
                                        <SelectItem value="Thuốc đông y">Thuốc đông y</SelectItem>
                                        <SelectItem value="Kháng viêm">Kháng viêm</SelectItem>
                                        <SelectItem value="Giảm đau">Giảm đau</SelectItem>
                                        <SelectItem value="Thuốc biệt dược">
                                            Thuốc biệt dược
                                        </SelectItem>
                                        <SelectItem value="Thuốc cảm ứng">Thuốc cảm ứng</SelectItem>
                                        <SelectItem value="Thuốc cảm lạnh">
                                            Thuốc cảm lạnh
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage>
                                {errors.type && <p>{errors.type.message?.toString()}</p>}
                            </FormMessage>
                        </FormItem>
                    )}
                    disabled={isPending}
                />
                <Controller
                    control={control}
                    name="unit"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Đơn vị</FormLabel>
                            <FormControl className="w-80 flex-1">
                                <Select onValueChange={field.onChange} {...field}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Chọn đơn vị thuốc" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Vỉ">Vỉ</SelectItem>
                                        <SelectItem value="Viên">Viên</SelectItem>
                                        <SelectItem value="Hộp">Hộp</SelectItem>
                                        <SelectItem value="Chai">Chai</SelectItem>
                                        <SelectItem value="Lọ">Lọ</SelectItem>
                                        <SelectItem value="Túi">Túi</SelectItem>
                                        <SelectItem value="Ống thuốc">Ống thuốc</SelectItem>
                                        <SelectItem value="Mililiter">Mililiter</SelectItem>
                                        <SelectItem value="Miligram">Miligram</SelectItem>
                                        <SelectItem value="Gram">Gram</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage>
                                {errors.unit && <p>{errors.unit.message?.toString()}</p>}
                            </FormMessage>
                        </FormItem>
                    )}
                    disabled={isPending}
                />
            </div>
            <div className="flex flex-col gap-y-6">
                <div className="grid grid-cols-2 gap-x-10">
                    <Controller
                        control={control}
                        name="quantity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Số lượng</FormLabel>
                                <FormControl className="w-80 flex-1">
                                    <Input
                                        placeholder="20"
                                        {...field}
                                        type="number"
                                        min="1"
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage>
                                    {errors.quantity && (
                                        <p>{errors.quantity.message?.toString()}</p>
                                    )}
                                </FormMessage>
                            </FormItem>
                        )}
                        disabled={isPending}
                    />
                    <Controller
                        control={control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Giá</FormLabel>
                                <FormControl className="w-80 flex-1">
                                    <Input
                                        placeholder="100000"
                                        {...field}
                                        type="number"
                                        min="1"
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage>
                                    {errors.price && <p>{errors.price.message?.toString()}</p>}
                                </FormMessage>
                            </FormItem>
                        )}
                        disabled={isPending}
                    />
                </div>
                <Controller
                    control={control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-y-2">
                            <FormLabel>Mô tả</FormLabel>
                            <FormControl>
                                <textarea
                                    rows={4}
                                    cols={50}
                                    placeholder="Nhập mô tả"
                                    {...field}
                                    className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                ></textarea>
                            </FormControl>
                            <FormMessage>
                                {errors.description && (
                                    <p>{errors.description.message?.toString()}</p>
                                )}
                            </FormMessage>
                        </FormItem>
                    )}
                    disabled={isPending}
                />
            </div>
        </>
    );
};

export default MedicineInfoForm;
