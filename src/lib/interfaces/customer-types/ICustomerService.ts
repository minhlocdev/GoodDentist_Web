import { UseQueryResult } from '@tanstack/react-query';
import { ICustomer } from './ICustomer';

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
}
