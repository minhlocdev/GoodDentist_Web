import { AxiosResponse } from 'axios';
import { ApiResponse } from '../lib/api';
import { IPostClinicService } from '../lib/interfaces/clinic-service-types/IPostClinicService';
import apiClient from './api-client';

export const postClinicService = async (
    clinicService: IPostClinicService
): Promise<AxiosResponse<ApiResponse<IPostClinicService>>> => {
    return await apiClient({
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: clinicService,
        url: '/api/ClinicService'
    });
};

export const putClinicService = async (
    clinicService: IPostClinicService
): Promise<AxiosResponse<ApiResponse<IPostClinicService>>> => {
    return await apiClient({
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        data: clinicService,
        url: '/api/ClinicService'
    });
};
export const deleteClinicService = async (
    clinicServiceId: number
): Promise<AxiosResponse<ApiResponse<number>>> => {
    return await apiClient({
        method: 'delete',
        url: `/api/ClinicService/clinicServiceId=${clinicServiceId}`
    });
};
