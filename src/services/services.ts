import { AxiosResponse } from 'axios';
import { ApiResponse } from '../lib/api';
import { IPostService } from '../lib/interfaces/services-types/IPostService';
import { IService } from '../lib/interfaces/services-types/IService';
import apiClient from './api-client';

export const getServices = async (
    pageNumber: number,
    rowsPerPage: number,
    filterField?: string,
    filterValue?: string,
    sortField?: string,
    sortOrder?: string
): Promise<AxiosResponse<ApiResponse<IService[]>>> => {
    if (sortField == 'serviceName') {
        sortField = 'name';
    }
    if (filterField == 'serviceName') {
        filterField = 'name';
    }
    return await apiClient({
        method: 'get',
        url: `api/services/all-services`,
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

export const getTotalService = async (): Promise<AxiosResponse<ApiResponse<number>>> => {
    return await apiClient({
        method: 'get',
        url: '/api/General?type=Service'
    });
};

export const postService = async (
    service: IPostService
): Promise<AxiosResponse<ApiResponse<IPostService>>> => {
    return await apiClient({
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: service,
        url: '/api/services/new-service'
    });
};

export const putService = async (
    service: IPostService
): Promise<AxiosResponse<ApiResponse<IPostService>>> => {
    return await apiClient({
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        data: service,
        url: 'api/services/service'
    });
};
export const deleteService = async (
    serviceId: number
): Promise<AxiosResponse<ApiResponse<number>>> => {
    return await apiClient({
        method: 'delete',
        url: `/api/services/service/?serviceID=${serviceId}`
    });
};
