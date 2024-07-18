export interface IClinic {
    clinicId: string;
    clinicName: string;
    phoneNumber?: string;
    address?: string;
    email?: string;
    status?: boolean;
}

export const clinics: IClinic[] = [];
