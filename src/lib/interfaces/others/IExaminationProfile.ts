import { ICustomer } from '../customer-types/ICustomer';
import { IExamination } from '../examination-types/IExamination';
import { IUser } from '../user-types/IUser';

export interface IExaminationProfile {
    examinationProfileId: number;
    customerId?: string;
    customer?: ICustomer;
    dentistId?: string;
    dentist?: IUser;
    date?: string; //created-date
    diagnosis?: string;
    status?: boolean;
    examinations?: IExamination[];
}
