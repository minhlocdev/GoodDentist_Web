import { AxiosResponse } from 'axios';
import { ApiResponse } from '../lib/api';
import { IClinic } from '../lib/interfaces/clinics-types/IClinic';
import apiClient from './api-client';

export const getClinics = async (): Promise<AxiosResponse<ApiResponse<IClinic[]>>> => {
    return await apiClient({
        method: 'get',
        url: '/api/clinics',
    });
};
