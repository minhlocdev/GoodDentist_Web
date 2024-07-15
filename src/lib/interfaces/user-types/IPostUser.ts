export interface IPostUser {
    name: string;
    userName: string;
    password?: string;
    dob?: Date;
    gender?: 'Nam' | 'Nữ' | 'Khác';
    phoneNumber?: string;
    email?: string;
    address?: string;
    status?: boolean;
    roleId?: number;
    avatar?: string | File;
    reset?: boolean;
    imageUrl?: string | null;
    clinicId: string;
}
