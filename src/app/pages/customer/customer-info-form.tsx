/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FC, useState } from 'react';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import { DatePicker } from '../../../components/ui/date-picker';
import { FormControl, FormItem, FormLabel, FormMessage } from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';
import Dropzone from '../../../components/ui/local/drop-zone';
import SelectDistrict from '../../../components/ui/local/select-district';
import SelectProvince from '../../../components/ui/local/select-province';
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

const CustomerInfoForm: FC<BasicInfoProps> = ({ isPending = false }) => {
    const {
        control,
        setValue,
        getValues,
        setError,
        clearErrors,
        formState: { errors }
    } = useFormContext<FieldValues>();

    const [selectedProvince, setProvince] = useState(getValues('province'));
    const handleOnDrop = (acceptedFiles: FileList | null) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            const fileType = allowedTypes.includes(acceptedFiles[0].type);

            if (!fileType) {
                setValue('avatar', null);
                setError('avatar', {
                    message: 'File type is not valid',
                    type: 'typeError'
                });
            } else {
                setValue('avatar', acceptedFiles[0]);
                clearErrors('file');
            }
        }
    };
    return (
        <>
            <div className="flex flex-row gap-x-6">
                <Controller
                    control={control}
                    name="avatar"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormControl>
                                <Dropzone
                                    {...field}
                                    dropMessage="Drop files or click here"
                                    handleOnDrop={handleOnDrop}
                                    classNameWrapper="h-full"
                                    className="h-full"
                                    initialImageUrl={field.value}
                                />
                            </FormControl>
                            <FormMessage>
                                {errors.file && <p>{errors.file.message?.toString()}</p>}
                            </FormMessage>
                        </FormItem>
                    )}
                    disabled={isPending}
                />
                <div className="flex flex-auto flex-col gap-y-6">
                    <Controller
                        control={control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Họ và tên <span className="text-red-600">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Họ tên" {...field} />
                                </FormControl>
                                <FormMessage>
                                    {errors.name && <p>{errors.name.message?.toString()}</p>}
                                </FormMessage>
                            </FormItem>
                        )}
                        disabled={isPending}
                    />
                    <Controller
                        control={control}
                        name="dob"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ngày sinh</FormLabel>
                                <FormControl>
                                    <DatePicker value={field.value} onChange={field.onChange} />
                                </FormControl>
                                <FormMessage>
                                    {errors.dob && <p>{errors.dob.message?.toString()}</p>}
                                </FormMessage>
                            </FormItem>
                        )}
                        disabled={isPending}
                    />
                    <Controller
                        control={control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Giới tính</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chọn giới tính" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Nam">Nam</SelectItem>
                                            <SelectItem value="Nữ">Nữ</SelectItem>
                                            <SelectItem value="Khác">Khác</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage>
                                    {errors.gender && <p>{errors.gender.message?.toString()}</p>}
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

export default CustomerInfoForm;
