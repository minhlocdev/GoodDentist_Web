import { z } from 'zod';

export const StaffFormSchema = z
    .object({
        userName: z
            .string({
                required_error: 'Tên đăng nhập là bắt buộc'
            })
            .min(2, {
                message: 'Tên đăng nhập phải có ít nhất 2 ký tự.'
            }),
        name: z
            .string({
                required_error: 'Tên là bắt buộc'
            })
            .min(2, {
                message: 'Tên phải có ít nhất 2 ký tự.'
            }),
        dob: z
            .date()
            .max(new Date(), {
                message: 'Ngày sinh nằm ngoài phạm vi hợp lý.'
            })
            .optional(),
        phoneNumber: z
            .string({
                required_error: 'Số điện thoại là bắt buộc'
            })
            .min(10, {
                message: 'Số điện thoại phải có ít nhất 10 chữ số.'
            })
            .regex(/^[0-9]+$/, {
                message: 'Số điện thoại phải là số.'
            }),
        email: z.string().email({
            message: 'Email là bắt buộc và phải là địa chỉ email hợp lệ.'
        }),
        gender: z.enum(['Nam', 'Nữ', 'Khác'], {
            message: 'Giới tính là bắt buộc.'
        }),
        province: z.string().optional(),
        district: z.string().optional(),
        address: z.string({
            required_error: 'Địa chỉ là bắt buộc.'
        }),
        roleId: z.number().min(0, {
            message: 'Vai trò là bắt buộc.'
        }),
        password: z
            .string({
                required_error: 'Mật khẩu là bắt buộc.'
            })
            .min(8, {
                message: 'Mật khẩu là bắt buộc và phải có ít nhất 8 ký tự.'
            })
            .regex(/[a-z]/, {
                message: 'Mật khẩu phải có ít nhất một chữ cái viết thường.'
            })
            .regex(/[A-Z]/, {
                message: 'Mật khẩu phải có ít nhất một chữ cái viết hoa.'
            })
            .regex(/[0-9]/, {
                message: 'Mật khẩu phải có ít nhất một số.'
            })
            .regex(/[!@#$%^&*(),.?":{}|<>]/, {
                message: 'Mật khẩu phải có ít nhất một ký tự đặc biệt.'
            }),
        confirmPassword: z.string(),
        avatar: z
            .union([
                z.string().url({
                    message: 'Avatar phải là URL hợp lệ.'
                }),
                z.instanceof(File).refine((file) => file instanceof File, {
                    message: 'Avatar phải là File.'
                })
            ])
            .optional(),
        clinicId: z.string().min(0, {
            message: 'Phòng khám là bắt buộc.'
        }),
        status: z.boolean()
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Mật khẩu không khớp',
        path: ['confirmPassword']
    });

export const EditStaffFormSchema = z.object({
    userName: z
        .string({
            required_error: 'Tên đăng nhập là bắt buộc'
        })
        .min(2, {
            message: 'Tên đăng nhập phải có ít nhất 2 ký tự.'
        }),
    name: z
        .string({
            required_error: 'Tên là bắt buộc'
        })
        .min(2, {
            message: 'Tên phải có ít nhất 2 ký tự.'
        }),
    dob: z
        .date()
        .max(new Date(), {
            message: 'Ngày sinh nằm ngoài phạm vi hợp lý.'
        })
        .optional(),
    phoneNumber: z
        .string({
            required_error: 'Số điện thoại là bắt buộc'
        })
        .min(10, {
            message: 'Số điện thoại phải có ít nhất 10 chữ số.'
        })
        .regex(/^[0-9]+$/, {
            message: 'Số điện thoại phải là số.'
        }),
    email: z.string().email({
        message: 'Email là bắt buộc và phải là địa chỉ email hợp lệ.'
    }),
    gender: z.enum(['Nam', 'Nữ', 'Khác'], {
        message: 'Giới tính là bắt buộc.'
    }),
    province: z.string().optional(),
    district: z.string().optional(),
    address: z.string({
        required_error: 'Địa chỉ là bắt buộc.'
    }),
    imageUrl: z.string().optional(),
    roleId: z.number().min(0, {
        message: 'Vai trò là bắt buộc.'
    }),
    avatar: z
        .union([
            z.string().url({
                message: 'Avatar phải là URL hợp lệ.'
            }),
            z.instanceof(File).refine((file) => file instanceof File, {
                message: 'Avatar phải là File.'
            })
        ])
        .optional(),
    clinicId: z.string().min(0, {
        message: 'Phòng khám là bắt buộc.'
    }),
    status: z.boolean(),
    reset: z.boolean()
});

export const JobReturnSchema = z.object({
    userName: z.string(),
    clinicId: z.string()
});

export const JobTranferSchema = z.object({
    userName: z.string(),
    clinicId: z.string(),
    oldClinicId: z.string()
});

export const AppointmentFormSchema = z.object({
    customerId: z.string().refine((value) => value.trim() !== '', {
        message: 'Khách hàng là trường bắt buộc'
    }),
    phoneNumber: z.string().refine((value) => value.trim() !== '', {
        message: 'Số điện thoại là trường bắt buộc'
    }),
    mode: z.string().refine((value) => value.trim() !== '', {
        message: 'Chế độ là trường bắt buộc'
    }),
    examinationProfileId: z.number(),
    dayStart: z.date().refine((value) => !isNaN(value.getTime()), {
        message: 'Ngày bắt đầu không hợp lệ'
    }),
    timeStart: z.string(),
    duration: z.string().refine((value) => value.trim() !== '', {
        message: 'Thời lượng là trường bắt buộc'
    }),
    notes: z.string().optional(),
    status: z.number().refine((value) => !isNaN(value), {
        message: 'Trạng thái không hợp lệ'
    }),
    dentistSlotId: z.number()
});

export const CustomerFormSchema = z.object({
    name: z
        .string({
            required_error: 'Tên là bắt buộc'
        })
        .min(2, {
            message: 'Tên phải có ít nhất 2 ký tự.'
        }),
    dob: z
        .date()
        .max(new Date(), {
            message: 'Ngày sinh nằm ngoài phạm vi hợp lý.'
        })
        .optional(),
    phoneNumber: z
        .string({
            required_error: 'Số điện thoại là bắt buộc'
        })
        .min(10, {
            message: 'Số điện thoại phải có ít nhất 10 chữ số.'
        })
        .regex(/^[0-9]+$/, {
            message: 'Số điện thoại phải là số.'
        }),
    email: z.string().email({
        message: 'Email là bắt buộc và phải là địa chỉ email hợp lệ.'
    }),
    gender: z.enum(['Nam', 'Nữ', 'Khác'], {
        message: 'Giới tính là bắt buộc.'
    }),
    province: z.string().optional(),
    district: z.string().optional(),
    address: z.string({
        required_error: 'Địa chỉ là bắt buộc.'
    }),
    imageUrl: z.string().optional(),
    avatar: z
        .union([
            z.string().url({
                message: 'Avatar phải là URL hợp lệ.'
            }),
            z.instanceof(File).refine((file) => file instanceof File, {
                message: 'Avatar phải là File.'
            })
        ])
        .optional(),
    clinicId: z.string().min(0, {
        message: 'Phòng khám là bắt buộc.'
    }),
    status: z.boolean(),
    anamnesis: z.string().optional()
});

export const DentistSlotFormSchema = z.object({
    dentistId: z.string(),
    timeStart: z.date(),
    timeEnd: z.date(),
    status: z.boolean(),
    roomId: z.number(),
    clinicId: z.string()
});

export const ClinicFormSchema = z.object({
    clinicName: z
        .string({
            required_error: 'Tên là bắt buộc'
        })
        .min(2, {
            message: 'Tên phải có ít nhất 2 ký tự.'
        }),
    phoneNumber: z
        .string({
            required_error: 'Số điện thoại là bắt buộc'
        })
        .min(10, {
            message: 'Số điện thoại phải có ít nhất 10 chữ số.'
        })
        .regex(/^[0-9]+$/, {
            message: 'Số điện thoại phải là số.'
        }),
    email: z.string().email({
        message: 'Email là bắt buộc và phải là địa chỉ email hợp lệ.'
    }),
    province: z.string().optional(),
    district: z.string().optional(),
    address: z.string({
        required_error: 'Địa chỉ là bắt buộc.'
    }),
    status: z.boolean()
});
