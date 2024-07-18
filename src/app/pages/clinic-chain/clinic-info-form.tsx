/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FC, useState } from 'react';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import { FormControl, FormItem, FormLabel, FormMessage } from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';
import SelectDistrict from '../../../components/ui/local/select-district';
import SelectProvince from '../../../components/ui/local/select-province';

interface BasicInfoProps {
    isPending?: boolean;
}

const ClinicInfoForm: FC<BasicInfoProps> = ({ isPending = false }) => {
    const {
        control,
        getValues,
        formState: { errors }
    } = useFormContext<FieldValues>();

    const [selectedProvince, setProvince] = useState(getValues('province'));
    return (
        <>
            <div className="flex flex-row gap-x-6">
                <div className="flex flex-auto flex-col gap-y-6">
                    <Controller
                        control={control}
                        name="clinicName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Tên phòng khám <span className="text-red-600">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Tên phòng khám" {...field} />
                                </FormControl>
                                <FormMessage>
                                    {errors.clinicName && (
                                        <p>{errors.clinicName.message?.toString()}</p>
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
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl className="w-80 flex-1">
                                <Input placeholder="example@example.com" {...field} />
                            </FormControl>
                            <FormMessage>
                                {errors.email && <p>{errors.email.message?.toString()}</p>}
                            </FormMessage>
                        </FormItem>
                    )}
                    disabled={isPending}
                />
                <Controller
                    control={control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Số điện thoại</FormLabel>
                            <FormControl className="w-80 flex-1">
                                <Input placeholder="0123456789" {...field} />
                            </FormControl>
                            <FormMessage>
                                {errors.phoneNumber && (
                                    <p>{errors.phoneNumber.message?.toString()}</p>
                                )}
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
                        name="province"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tỉnh/Thành phố</FormLabel>
                                <FormControl>
                                    <SelectProvince
                                        selectedProvince={field.value}
                                        onSelectProvince={(value) => {
                                            setProvince(value);
                                            field.onChange(value);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage>
                                    {errors.status && <p>{errors.status.message?.toString()}</p>}
                                </FormMessage>
                            </FormItem>
                        )}
                        disabled={isPending}
                    />
                    <Controller
                        control={control}
                        name="district"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Quận/Huyện</FormLabel>
                                <FormControl>
                                    <SelectDistrict
                                        selectedDistrict={field.value}
                                        onSelectDistrict={field.onChange}
                                        selectedProvince={selectedProvince}
                                    />
                                </FormControl>
                                <FormMessage>
                                    {errors.status && <p>{errors.status.message?.toString()}</p>}
                                </FormMessage>
                            </FormItem>
                        )}
                        disabled={isPending}
                    />
                </div>
                <Controller
                    control={control}
                    name="address"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-y-2">
                            <FormLabel>Địa chỉ</FormLabel>
                            <FormControl>
                                <textarea
                                    rows={4}
                                    cols={50}
                                    placeholder="Nhập địa chỉ"
                                    {...field}
                                    className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                ></textarea>
                            </FormControl>
                            <FormMessage>
                                {errors.address && <p>{errors.address.message?.toString()}</p>}
                            </FormMessage>
                        </FormItem>
                    )}
                    disabled={isPending}
                />
            </div>
        </>
    );
};

export default ClinicInfoForm;
