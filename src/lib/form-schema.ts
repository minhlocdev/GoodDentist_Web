// formSchema.ts
import { z } from 'zod';

export const StaffFormSchema = z
    .object({
        username: z.string().min(2, {
            message: 'Username must be at least 2 characters.'
        }),
        name: z.string().min(2, {
            message: 'Name must be at least 2 characters.'
        }),
        dob: z.date().optional(),
        phone: z.string().min(10, {
            message: 'Phone number must be at least 10 digits.'
        }),
        email: z.string().email({
            message: 'Invalid email address.'
        }),
        gender: z.enum(['Nam', 'Nữ', 'Khác'], {
            message: 'Gender is required.'
        }),
        address: z.string().optional(),
        role: z.number().min(0, {
            message: 'Role is required.'
        }),
        password: z.string().min(6, {
            message: 'Password must be at least 6 characters.'
        }),
        confirmPassword: z.string().min(6, {
            message: 'Confirm Password must be at least 6 characters.'
        }),
        avatar: z
            .union([
                z.string().url({
                    message: 'Avatar must be a valid URL.'
                }),
                z.instanceof(File).refine((file) => file instanceof File, {
                    message: 'Avatar must be a File.'
                })
            ])
            .optional(),
        clinicId: z.string().min(0, {
            message: 'Clinic is required.'
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword']
    });
