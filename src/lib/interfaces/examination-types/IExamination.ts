import { ICustomer } from '../customer-types/ICustomer';
import { IMedicalRecord } from '../IMedicalRecord';
import { IPrescription } from '../IPrescription';
import { IOrder } from '../order-types/IOrder';
import { IDentistSlot } from '../others/IDentistSlot';
import { IExaminationProfile } from '../others/IExaminationProfile';
import { IUser } from '../user-types/IUser';

export interface IExamination {
    examinationId: number;
    examinationProfileId?: number;
    dentistId?: string;
    dentistName?: string;
    dentistSlotId?: number;
    diagnosis?: string;
    timeStart: Date;
    timeEnd: Date;
    notes?: string;
    status?: number;
    customer?: ICustomer;
    customerId?: string;
    customerName?: string;
    dentist?: IUser;
    dentistSlot?: IDentistSlot;
    examinationProfile?: IExaminationProfile;
    medicalRecords?: IMedicalRecord[];
    orders?: IOrder[];
    prescriptions?: IPrescription[];
}
