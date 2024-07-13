import { IMedicalRecord } from "../IMedicalRecord";
import { IOrder } from "../IOrder";
import { IPrescription } from "../IPrescription";
import { IDentistSlot } from "../others/IDentistSlot";
import { IExaminationProfile } from "../others/IExaminationProfile";
import { IUser } from "../user-types/IUser";


export interface IExamination {
    examinationId: number;
    examinationProfileId?: number;
    dentistId?: string;
    dentistSlotId?: number;
    diagnosis?: string;
    timeStart: Date;
    timeEnd: Date;
    notes?: string;
    status?: boolean;
    dentist?: IUser;
    dentistSlot?: IDentistSlot;
    examinationProfile?: IExaminationProfile[];
    medicalRecords?: IMedicalRecord[];
    orders?: IOrder[];
    prescriptions?: IPrescription[];
}
