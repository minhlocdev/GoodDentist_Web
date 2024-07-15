import { AxiosResponse } from 'axios';
import { ApiResponse } from '../lib/api';
import { IService } from '../lib/interfaces/services-types/IService';
import apiClient from './api-client';

export const getServices = async (
    pageNumber: number,
    rowsPerPage: number
): Promise<AxiosResponse<ApiResponse<IService[]>>> => {
    return await apiClient({
        method: 'get',
        params: {
            pageNumber,
            rowsPerPage
        },
        url: '/api/services/all-services'
    });
};
