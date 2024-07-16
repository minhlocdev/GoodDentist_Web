import { AxiosResponse } from 'axios';
import { ApiResponse } from '../lib/api';
import { IClinic } from '../lib/interfaces/clinics-types/IClinic';
import { IPostClinic } from '../lib/interfaces/clinics-types/IPostClinic';
import apiClient from './api-client';

export const getClinics = async (): Promise<AxiosResponse<ApiResponse<IClinic[]>>> => {
    return await apiClient({
        method: 'get',
        url: '/api/clinics'
    });
};

export const getClinicsPaging = async (
    pageNumber: number,
    rowsPerPage: number,
    filterField?: string,
    filterValue?: string,
    sortField?: string,
    sortOrder?: string
): Promise<AxiosResponse<ApiResponse<IClinic[]>>> => {
    if (sortField === 'clinicName') {
        sortField = 'name';
    }
    return await apiClient({
        method: 'get',
        url: `/api/clinics/paging`,
        params: {
            pageNumber,
            rowsPerPage,
            filterField,
            filterValue,
            sortField,
            sortOrder
        }
    });
};

export const getTotalClinic = async (): Promise<AxiosResponse<ApiResponse<number>>> => {
    return await apiClient({
        method: 'get',
        url: '/api/General?type=Clinic'
    });
};

export const postClinic = async (
    clinic: IPostClinic
): Promise<AxiosResponse<ApiResponse<IPostClinic>>> => {
    return await apiClient({
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: clinic,
        url: '/api/clinics'
    });
};

export const putClinic = async (
    clinic: IPostClinic
): Promise<AxiosResponse<ApiResponse<IPostClinic>>> => {
    return await apiClient({
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        data: clinic,
        url: '/api/clinics'
    });
};
export const deleteClinic = async (
    clinicId: string
): Promise<AxiosResponse<ApiResponse<string>>> => {
    return await apiClient({
        method: 'delete',
        url: `/api/clinics/${clinicId}`
    });
};
