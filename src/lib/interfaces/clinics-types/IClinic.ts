export interface IClinic {
    clinicId: string;
    clinicName: string;
    phoneNumber?: string;
    address?: string;
    email?: string;
    status?: number;
}

export const clinics: IClinic[] = [
];
