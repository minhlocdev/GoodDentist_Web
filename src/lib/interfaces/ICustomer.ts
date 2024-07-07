import { IUser } from './user-types/IUser';

export interface ICustomer extends IUser {
    examination_id?: string;
    clinic_id?: string;
    front_id_card?: string;
    back_id_card?: string;
}
export const customers: ICustomer[] = [];
