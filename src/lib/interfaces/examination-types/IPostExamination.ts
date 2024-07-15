export interface IPostExamination {
    examinationId: number;
    examinationProfileId?: number;
    dentistId?: string;
    dentistSlotId?: number;
    diagnosis?: string;
    timeStart: Date;
    timeEnd: Date;
    notes?: string;
    status?: number;
    customerId?: string;
    mode?: string;
}
