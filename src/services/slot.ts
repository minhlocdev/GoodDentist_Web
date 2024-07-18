import { AxiosResponse } from 'axios';
import { ApiResponse } from '../lib/api';
import { IDentistSlot } from '../lib/interfaces/others/IDentistSlot';
import { IPostDentistSlot } from '../lib/interfaces/others/IPostDentistSlot';
import apiClient from './api-client';

export const getSlotsByDentistClinic = async (
    dentistId: string,
    clinicId: string,
    pageNumber: number,
    rowsPerPage: number,
    sortField?: string,
    sortOrder?: string
): Promise<AxiosResponse<ApiResponse<IDentistSlot[]>>> => {
    return await apiClient({
        method: 'get',
        url: `/dentist-slots/clinic/dentist`,
        params: { dentistId, clinicId, pageNumber, rowsPerPage, sortField, sortOrder }
    });
};

export const getSlotsByClinic = async (
    clinicId: string,
    pageNumber: number,
    rowsPerPage: number,
    sortField?: string,
    sortOrder?: string
): Promise<AxiosResponse<ApiResponse<IDentistSlot[]>>> => {
    return await apiClient({
        method: 'get',
        url: `/clinic`,
        params: { clinicId, pageNumber, rowsPerPage, sortField, sortOrder }
    });
};

export const postDentistSlot = async (
    slots: IPostDentistSlot[]
): Promise<AxiosResponse<ApiResponse<IPostDentistSlot[]>>> => {
    return await apiClient({
        method: 'post',
        data: slots,
        url: '/dentist-slot'
    });
};
