import { keepPreviousData, useQuery, UseQueryResult } from '@tanstack/react-query';
import { IService } from '../../lib/interfaces/services-types/IService';
import { getServices, getTotalService } from '../services';

export const servicesService = {
    GetServices: (pageNumber: number, rowsPerPage: number): UseQueryResult<IService[]> =>
        useQuery<IService[], Error>({
            queryKey: ['services', pageNumber, rowsPerPage],
            queryFn: async (): Promise<IService[]> => {
                return await getServices(pageNumber, rowsPerPage).then((res) => res.data.result);
            },
            staleTime: 20000,
            placeholderData: keepPreviousData
        }),
    GetTotalService: (): UseQueryResult<number> =>
        useQuery({
            queryKey: ['total-services'],
            queryFn: async (): Promise<number> => {
                return await getTotalService().then((res) => res.data.result);
            }
        })
};
