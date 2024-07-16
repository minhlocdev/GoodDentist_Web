/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FC } from 'react';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import { FormControl, FormItem, FormLabel, FormMessage } from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';

interface BasicInfoProps {
    isPending?: boolean;
}

const ServiceInfoForm: FC<BasicInfoProps> = ({ isPending = false }) => {
    const {
        control,
        formState: { errors }
    } = useFormContext<FieldValues>();

    return (
        <>
            <div className="grid grid-cols-2 gap-x-10">
                <Controller
                    control={control}
                    name="serviceName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Tên dịch vụ <span className="text-red-600">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="Tên dịch vụ" {...field} />
                            </FormControl>
                            <FormMessage>
                                {errors.serviceName && (
                                    <p>{errors.serviceName.message?.toString()}</p>
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
            <div className="flex flex-col gap-y-6">
                <Controller
                    control={control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-y-2">
                            <FormLabel>Địa chỉ</FormLabel>
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

export default ServiceInfoForm;
