import { IUser } from '../user-types/IUser';

export interface ICustomer extends IUser {
    examinationId?: string;
    frontIdCard?: string;
    backIdCard?: string;
    anamnesis?: string;
    examinationProfiles?: any[];
}
export const customers: ICustomer[] = [];
