import { IExaminationProfile } from '../others/IExaminationProfile';
import { IUser } from '../user-types/IUser';

export interface ICustomer extends IUser {
    examinationId?: string;
    frontIdCard?: string;
    backIdCard?: string;
    anamnesis?: string;
    examinationProfiles?: IExaminationProfile[];
    imageUrl?: string | null;
}
export const customers: ICustomer[] = [];
