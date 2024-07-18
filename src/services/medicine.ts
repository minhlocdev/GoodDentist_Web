import { AxiosResponse } from 'axios';
import { ApiResponse } from '../lib/api';
import { IMedicine } from '../lib/interfaces/IMedicine';
import { IPostMedicine } from '../lib/interfaces/medicine-types/IPostMedicine';
import apiClient from './api-client';

export const getMedicines = async (
    pageNumber: number,
    rowsPerPage: number,
    filterField?: string,
    filterValue?: string,
    sortField?: string,
    sortOrder?: string
): Promise<AxiosResponse<ApiResponse<IMedicine[]>>> => {
    if (sortField == 'medicineName') {
        sortField = 'name';
    }
    if (filterField == 'medicineName') {
        filterField = 'name';
    }
    return await apiClient({
        method: 'get',
        url: `/api/medicines/all-medicine`,
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

export const getTotalMedicine = async (): Promise<AxiosResponse<ApiResponse<number>>> => {
    return await apiClient({
        method: 'get',
        url: '/api/General?type=Medicine'
    });
};

export const postMedicine = async (
    medicine: IPostMedicine
): Promise<AxiosResponse<ApiResponse<IPostMedicine>>> => {
    return await apiClient({
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: medicine,
        url: '/api/medicines/new-medicine'
    });
};

export const putMedicine = async (
    medicine: IPostMedicine
): Promise<AxiosResponse<ApiResponse<IPostMedicine>>> => {
    return await apiClient({
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        data: medicine,
        url: '/api/medicines/medicine'
    });
};
export const deleteMedicine = async (
    medicineId: number
): Promise<AxiosResponse<ApiResponse<number>>> => {
    return await apiClient({
        method: 'delete',
        url: `/api/medicines/medicine?medicineId=${medicineId}`
    });
};
