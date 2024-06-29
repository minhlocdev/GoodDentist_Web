export interface IMedicalRecord {
    medicalRecordId: number;
    examinationId?: number;
    recordTypeId?: number;
    url?: string;
    notes?: string;
    status?: boolean;
}
