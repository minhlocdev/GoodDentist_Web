export interface IMedicine {
    medicineId: string;
    medicineName: string;
    type?: string;
    quantity?: number;
    unit?: string;
    description?: string;
    price?: number;
    status?: boolean;
}

export const medicines: IMedicine[] = [];
