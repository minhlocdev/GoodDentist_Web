import {
    keepPreviousData,
    useMutation,
    UseMutationResult,
    useQuery,
    UseQueryResult
} from '@tanstack/react-query';
import { ApiResponse } from '../../lib/api';
import { IPostService } from '../../lib/interfaces/services-types/IPostService';
import { IService } from '../../lib/interfaces/services-types/IService';
import { IServiceService } from '../../lib/interfaces/services-types/IServiceService';
import { deleteService, getServices, getTotalService, postService, putService } from '../services';

export const serviceService: IServiceService = {
    GetServices: (
        pageNumber,
        rowsPerPage,
        filterField,
        filterValue,
        sortField,
        sortOrder
    ): UseQueryResult<IService[]> =>
        useQuery<IService[], Error>({
            queryKey: [
                'services',
                pageNumber,
                rowsPerPage,
                filterField,
                filterValue,
                sortField,
                sortOrder
            ],
            queryFn: async (): Promise<IService[]> => {
                return await getServices(
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

    GetTotalService: (): UseQueryResult<number> =>
        useQuery({
            queryKey: ['total-customers'],
            queryFn: async (): Promise<number> => {
                return await getTotalService().then((res) => res.data.result);
            }
        }),

    PostService: (): UseMutationResult<ApiResponse<IPostService>, Error, IPostService> =>
        useMutation<ApiResponse<IPostService>, Error, IPostService>({
            mutationFn: async (service: IPostService): Promise<ApiResponse<IPostService>> => {
                const response = await postService(service);
                return response.data;
            }
        }),

    PutService: (): UseMutationResult<ApiResponse<IPostService>, Error, IPostService> =>
        useMutation<ApiResponse<IPostService>, Error, IPostService>({
            mutationFn: async (service: IPostService): Promise<ApiResponse<IPostService>> => {
                const response = await putService(service);
                return response.data;
            }
        }),
    DeleteService: (): UseMutationResult<ApiResponse<number>, Error, number> =>
        useMutation<ApiResponse<number>, Error, number>({
            mutationFn: async (serviceId: number) => {
                const response = await deleteService(serviceId);
                return response.data;
            }
        })
};
