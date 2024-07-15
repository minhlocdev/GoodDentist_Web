import { IClinic } from '../clinics-types/IClinic';
import { IDentistSlot } from '../others/IDentistSlot';

export interface IUser {
    userId: string;
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
    clinics?: IClinic[];
    dentistSlotId?: number;
    dentistSlots?: IDentistSlot[];
    clinicId?: string;
}
const users: IUser[] = [];

export default users;
