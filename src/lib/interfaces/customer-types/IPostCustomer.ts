import { IExaminationProfile } from '../others/IExaminationProfile';

export interface IPostCustomer {
    userId?: string;
    name: string;
    dob?: Date;
    gender?: 'Nam' | 'Nữ' | 'Khác';
    phoneNumber?: string;
    email?: string;
    address?: string;
    status?: boolean;
    avatar?: string | File;
    reset?: boolean;
    imageUrl?: string | null;
    clinicId: string;
    examinationId?: string;
    frontIdCard?: string;
    backIdCard?: string;
    anamnesis?: string;
    examinationProfiles?: IExaminationProfile[];
}
