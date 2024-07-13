import { IUser } from '../user-types/IUser';

export interface ICustomer extends IUser {
    examinationId?: string;
    frontIdCard?: string;
    backIdCard?: string;
    anamnesis?: string;
}
export const customers: ICustomer[] = [];
