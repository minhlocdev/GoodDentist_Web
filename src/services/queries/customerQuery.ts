import { keepPreviousData, useQuery, UseQueryResult } from '@tanstack/react-query';
import { ICustomer } from '../../lib/interfaces/customer-types/ICustomer';
import { ICustomerService } from '../../lib/interfaces/customer-types/ICustomerService';
import { getCustomers, getCustomersByClinic, getTotalCustomer } from '../customer';

export const customerService: ICustomerService = {
    GetCustomers: (
        pageNumber,
        rowsPerPage,
        filterField,
        filterValue,
        sortField,
        sortOrder
    ): UseQueryResult<ICustomer[]> =>
        useQuery<ICustomer[], Error>({
            queryKey: [
                'customers',
                pageNumber,
                rowsPerPage,
                filterField,
                filterValue,
                sortField,
                sortOrder
            ],
            queryFn: async (): Promise<ICustomer[]> => {
                return await getCustomers(
                    pageNumber,
                    rowsPerPage,
                    filterField,
                    filterValue,
                    sortField,
                    sortOrder
                ).then((res) => res.data.result);
            },
            staleTime: 20000,
            placeholderData: keepPreviousData
        }),

    GetTotalCustomer: (): UseQueryResult<number> =>
        useQuery({
            queryKey: ['total-customers'],
            queryFn: async (): Promise<number> => {
                return await getTotalCustomer().then((res) => res.data.result);
            }
        }),

    GetCustomersByClinic: (
        clinicId,
        pageNumber,
        rowsPerPage,
        filterField,
        filterValue,
        sortField,
        sortOrder
    ): UseQueryResult<ICustomer[]> =>
        useQuery<ICustomer[], Error>({
            queryKey: [
                'customers-by-clinics',
                clinicId,
                pageNumber,
                rowsPerPage,
                filterField,
                filterValue,
                sortField,
                sortOrder
            ],
            queryFn: async (): Promise<ICustomer[]> => {
                return await getCustomersByClinic(
                    clinicId,
                    pageNumber,
                    rowsPerPage,
                    filterField,
                    filterValue,
                    sortField,
                    sortOrder
                ).then((res) => res.data.result);
            },
            enabled: clinicId !== '',
            staleTime: 20000,
            placeholderData: keepPreviousData
        })
};
