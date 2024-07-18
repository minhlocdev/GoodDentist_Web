import { IExamination } from '../examination-types/IExamination';
import { IRoom } from '../IRoom';
import { IUser } from '../user-types/IUser';

export interface IDentistSlot {
    dentistSlotId: number;
    dentistId?: string;
    clinicId?: string;
    timeStart?: Date;
    timeEnd?: Date;
    roomId?: number;
    status?: boolean;
    dentist?: IUser;
    examinations?: IExamination[];
    room?: IRoom;
}
