export interface IClinic {
    clinic_id: number;
    clinic_name: string;
    phone_number?: string;
    address?: string;
    email?: string;
    status?: number;
}

export const clinics: IClinic[] = [
    {
        clinic_id: 1,
        clinic_name: 'Phòng Khám Đa Khoa Quốc Tế',
        phone_number: '024 3825 5599',
        address: 'Số 12, Đường Nguyễn Chí Thanh, Hà Nội',
        email: 'info@phongkhamquocte.vn',
        status: 1
    },
    {
        clinic_id: 2,
        clinic_name: 'Phòng Khám Đa Khoa Hòa Hảo',
        phone_number: '028 3927 0284',
        address: '254 Hòa Hảo, Phường 4, Quận 10, TP.HCM',
        email: 'contact@hoahao.com',
        status: 1
    },
    {
        clinic_id: 3,
        clinic_name: 'Phòng Khám Nhi Đồng Sài Gòn',
        phone_number: '028 6676 4528',
        address: '32A Cao Thắng, Phường 5, Quận 3, TP.HCM',
        email: 'support@nhidongsaigon.vn',
        status: 1
    },
    {
        clinic_id: 4,
        clinic_name: 'Phòng Khám Đa Khoa Thái Hà',
        phone_number: '024 3537 3353',
        address: '11 Thái Hà, Đống Đa, Hà Nội',
        email: 'info@phongkhamthaiha.vn',
        status: 0
    },
    {
        clinic_id: 5,
        clinic_name: 'Phòng Khám Đa Khoa Hồng Ngọc',
        phone_number: '024 3927 5568',
        address: '55 Yên Ninh, Ba Đình, Hà Nội',
        email: 'contact@hongngoc.com',
        status: 1
    }
];
