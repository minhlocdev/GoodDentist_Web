import {
    keepPreviousData,
    useMutation,
    UseMutationResult,
    useQuery,
    UseQueryResult
} from '@tanstack/react-query';
import { ApiResponse } from '../../lib/api';
import { ICustomer } from '../../lib/interfaces/customer-types/ICustomer';
import { ICustomerService } from '../../lib/interfaces/customer-types/ICustomerService';
import { IPostCustomer } from '../../lib/interfaces/customer-types/IPostCustomer';
import {
    deleteCustomer,
    getCustomers,
    getCustomersByClinic,
    getTotalCustomer,
    postCustomer,
    putCustomer
} from '../customer';

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
        }),

    PostCustomer: (): UseMutationResult<ApiResponse<IPostCustomer>, Error, IPostCustomer> =>
        useMutation<ApiResponse<IPostCustomer>, Error, IPostCustomer>({
            mutationFn: async (customer: IPostCustomer): Promise<ApiResponse<IPostCustomer>> => {
                const response = await postCustomer(customer);
                return response.data;
            }
        }),
    PutCustomer: (): UseMutationResult<ApiResponse<IPostCustomer>, Error, IPostCustomer> =>
        useMutation<ApiResponse<IPostCustomer>, Error, IPostCustomer>({
            mutationFn: async (customer: IPostCustomer): Promise<ApiResponse<IPostCustomer>> => {
                const response = await putCustomer(customer);
                return response.data;
            }
        }),
    DeleteCustomer: (): UseMutationResult<ApiResponse<string>, Error, string> =>
        useMutation<ApiResponse<string>, Error, string>({
            mutationFn: async (customId: string) => {
                const response = await deleteCustomer(customId);
                return response.data;
            }
        })
};
