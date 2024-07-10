import { z } from 'zod';

export const StaffFormSchema = z
    .object({
        userName: z.string().min(2, {
            message: 'Tên đăng nhập là bắt buộc và phải có ít nhất 2 ký tự.'
        }),
        name: z.string().min(2, {
            message: 'Tên là bắt buộc và phải có ít nhất 2 ký tự.'
        }),
        dob: z
            .date()
            .max(new Date(), {
                message: 'Ngày sinh nằm ngoài phạm vi hợp lý.'
            })
            .optional(),
        phoneNumber: z
            .string()
            .min(10, {
                message: 'Số điện thoại là bắt buộc và phải có ít nhất 10 chữ số.'
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
        address: z.string(),
        roleId: z.number().min(0, {
            message: 'Vai trò là bắt buộc.'
        }),
        password: z
            .string()
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
        confirmPassword: z.string().min(8, {
            message: 'Xác nhận mật khẩu là bắt buộc và phải có ít nhất 8 ký tự.'
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
        status: z.boolean()
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Mật khẩu không khớp',
        path: ['confirmPassword']
    });

export const AppointmentFormSchema = z.object({
    customerId: z.string(),
    phoneNumber: z.string(),
    dentistId: z.string(),
    clinicId: z.string(),
    mode: z.string(),
    examinationProfileId: z.string().optional(),
    dayStart: z.date(),
    timeStart: z.string().time(),
    duration: z.string(),
    notes: z.string().optional(),
    status: z.number()
});

export const CustomerFormSchema = z.object({
    customerId: z.string(),
    dentistId: z.string(),
    examinationProfileId: z.string(),
    timeStart: z.date(),
    timeEnd: z.date(),
    notes: z.string().optional(),
    status: z.number()
});
