import { IMedicinePrescription } from './others/IMedicinePrescription';

export interface IPrescription {
    prescriptionId: number;
    dateTime?: Date;
    note?: string;
    status?: boolean;
    total?: number;
    examinationId?: number;
    medicinePrescriptions?: IMedicinePrescription[];
}
