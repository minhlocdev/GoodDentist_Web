import { AxiosResponse } from 'axios';
import { ApiResponse } from '../lib/api';
import { ICustomer } from '../lib/interfaces/customer-types/ICustomer';
import { IPostCustomer } from '../lib/interfaces/customer-types/IPostCustomer';
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

export const postCustomer = async (
    customer: IPostCustomer
): Promise<AxiosResponse<ApiResponse<IPostCustomer>>> => {
    return await apiClient({
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: customer,
        url: '/customers/customer'
    });
};
export const putCustomer = async (
    customer: IPostCustomer
): Promise<AxiosResponse<ApiResponse<IPostCustomer>>> => {
    return await apiClient({
        method: 'put',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: customer,
        url: '/customers/customer'
    });
};
export const deleteCustomer = async (
    customerId: string
): Promise<AxiosResponse<ApiResponse<string>>> => {
    return await apiClient({
        method: 'delete',
        url: `/customers/customer/${customerId}`
    });
};
