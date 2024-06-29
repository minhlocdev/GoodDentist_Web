export interface IExamination {
    examinationId: number;
    examinationProfileId?: number;
    dentistId?: string;
    dentistSlotId?: number;
    diagnosis?: string;
    timeStart?: Date;
    duration?: string;
    notes?: string;
    status?: boolean;
}
