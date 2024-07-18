import {
    keepPreviousData,
    useMutation,
    UseMutationResult,
    useQuery,
    UseQueryResult
} from '@tanstack/react-query';
import { ApiResponse } from '../../lib/api';
import { IMedicine } from '../../lib/interfaces/IMedicine';
import { IMedicineService } from '../../lib/interfaces/medicine-types/IMedicineService';
import { IPostMedicine } from '../../lib/interfaces/medicine-types/IPostMedicine';
import {
    deleteMedicine,
    getMedicines,
    getTotalMedicine,
    postMedicine,
    putMedicine
} from '../medicine';

export const medicineService: IMedicineService = {
    GetMedicines: (
        pageNumber,
        rowsPerPage,
        filterField,
        filterValue,
        sortField,
        sortOrder
    ): UseQueryResult<IMedicine[]> =>
        useQuery<IMedicine[], Error>({
            queryKey: [
                'medicines',
                pageNumber,
                rowsPerPage,
                filterField,
                filterValue,
                sortField,
                sortOrder
            ],
            queryFn: async (): Promise<IMedicine[]> => {
                return await getMedicines(
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

    GetTotalMedicine: (): UseQueryResult<number> =>
        useQuery({
            queryKey: ['total-medicines'],
            queryFn: async (): Promise<number> => {
                return await getTotalMedicine().then((res) => res.data.result);
            }
        }),

    PostMedicine: (): UseMutationResult<ApiResponse<IPostMedicine>, Error, IPostMedicine> =>
        useMutation<ApiResponse<IPostMedicine>, Error, IPostMedicine>({
            mutationFn: async (medicine: IPostMedicine): Promise<ApiResponse<IPostMedicine>> => {
                const response = await postMedicine(medicine);
                return response.data;
            }
        }),

    PutMedicine: (): UseMutationResult<ApiResponse<IPostMedicine>, Error, IPostMedicine> =>
        useMutation<ApiResponse<IPostMedicine>, Error, IPostMedicine>({
            mutationFn: async (medicine: IPostMedicine): Promise<ApiResponse<IPostMedicine>> => {
                const response = await putMedicine(medicine);
                return response.data;
            }
        }),
    DeleteMedicine: (): UseMutationResult<ApiResponse<number>, Error, number> =>
        useMutation<ApiResponse<number>, Error, number>({
            mutationFn: async (medicineId: number) => {
                const response = await deleteMedicine(medicineId);
                return response.data;
            }
        })
};
