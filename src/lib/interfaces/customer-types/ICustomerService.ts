import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { ApiResponse } from '../../api';
import { ICustomer } from './ICustomer';
import { IPostCustomer } from './IPostCustomer';

export interface ICustomerService {
    GetCustomers: (
        pageNumber: number,
        rowsPerPage: number,
        filterField?: string,
        filterValue?: string,
        sortField?: string,
        sortOrder?: string
    ) => UseQueryResult<ICustomer[]>;
    GetTotalCustomer: () => UseQueryResult<number>;
    GetCustomersByClinic: (
        clinicId: string,
        pageNumber: number,
        rowsPerPage: number,
        filterField?: string,
        filterValue?: string,
        sortField?: string,
        sortOrder?: string
    ) => UseQueryResult<ICustomer[]>;
    PostCustomer: () => UseMutationResult<ApiResponse<IPostCustomer>, Error, IPostCustomer>;
    PutCustomer: () => UseMutationResult<ApiResponse<IPostCustomer>, Error, IPostCustomer>;
    DeleteCustomer: () => UseMutationResult<ApiResponse<string>, Error, string>;
}
