import { IMedicine } from '../IMedicine';

export interface IMedicinePrescription {
    medicinePrescriptionId: number;
    medicineId?: number;
    prescriptionId?: number;
    quantity?: number;
    price?: number;
    status?: boolean;
    medicine?: IMedicine;
}
