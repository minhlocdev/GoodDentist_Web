import { AxiosResponse } from 'axios';
import { ApiResponse } from '../lib/api';
import { ICustomer } from '../lib/interfaces/customer-types/ICustomer';
import apiClient from './api-client';

export const getCustomers = async (
    pageNumber: number,
    rowsPerPage: number,
    filterField?: string,
    filterValue?: string,
    sortField?: string,
    sortOrder?: string
): Promise<AxiosResponse<ApiResponse<ICustomer[]>>> => {
    return await apiClient({
        method: 'get',
        url: `/customers`,
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

export const getTotalCustomer = async (): Promise<AxiosResponse<ApiResponse<number>>> => {
    return await apiClient({
        method: 'get',
        url: '/api/General?type=Customer'
    });
};

export const getCustomersByClinic = async (
    clinicId: string,
    pageNumber: number,
    rowsPerPage: number,
    filterField?: string,
    filterValue?: string,
    sortField?: string,
    sortOrder?: string
): Promise<AxiosResponse<ApiResponse<ICustomer[]>>> => {
    return await apiClient({
        method: 'get',
        url: `/customers/clinic`,
        params: {
            clinicId,
            pageNumber,
            rowsPerPage,
            filterField,
            filterValue,
            sortField,
            sortOrder
        }
    });
};
