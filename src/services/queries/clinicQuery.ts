import {
    UseMutationResult,
    UseQueryResult,
    keepPreviousData,
    useMutation,
    useQuery
} from '@tanstack/react-query';
import { ApiResponse } from '../../lib/api';
import { IClinic } from '../../lib/interfaces/clinics-types/IClinic';
import { IClinicService } from '../../lib/interfaces/clinics-types/IClinicService';
import { IPostClinic } from '../../lib/interfaces/clinics-types/IPostClinic';
import {
    deleteClinic,
    getClinics,
    getClinicsPaging,
    getTotalClinic,
    postClinic,
    putClinic
} from '../clinics';

export const clinicService: IClinicService = {
    GetClinics: (): UseQueryResult<IClinic[]> => {
        return useQuery<IClinic[], Error>({
            queryKey: ['clinics'],
            queryFn: async (): Promise<IClinic[]> => {
                const response = await getClinics();
                return response.data.result;
            },
            staleTime: 20000,
            placeholderData: keepPreviousData
        });
    },
    GetClinicsPaging: (
        pageNumber,
        rowsPerPage,
        filterField,
        filterValue,
        sortField,
        sortOrder
    ): UseQueryResult<IClinic[]> =>
        useQuery<IClinic[], Error>({
            queryKey: [
                'clinics-paging',
                pageNumber,
                rowsPerPage,
                filterField,
                filterValue,
                sortField,
                sortOrder
            ],
            queryFn: async (): Promise<IClinic[]> => {
                return await getClinicsPaging(
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
    GetTotalClinic: (): UseQueryResult<number> =>
        useQuery({
            queryKey: ['total-clinics'],
            queryFn: async (): Promise<number> => {
                return await getTotalClinic().then((res) => res.data.result);
            }
        }),

    PostClinic: (): UseMutationResult<ApiResponse<IPostClinic>, Error, IPostClinic> =>
        useMutation<ApiResponse<IPostClinic>, Error, IPostClinic>({
            mutationFn: async (clinic: IPostClinic): Promise<ApiResponse<IPostClinic>> => {
                const response = await postClinic(clinic);
                return response.data;
            }
        }),

    PutClinic: (): UseMutationResult<ApiResponse<IPostClinic>, Error, IPostClinic> =>
        useMutation<ApiResponse<IPostClinic>, Error, IPostClinic>({
            mutationFn: async (clinic: IPostClinic): Promise<ApiResponse<IPostClinic>> => {
                const response = await putClinic(clinic);
                return response.data;
            }
        }),
    DeleteClinic: (): UseMutationResult<ApiResponse<string>, Error, string> =>
        useMutation<ApiResponse<string>, Error, string>({
            mutationFn: async (clinicId: string) => {
                const response = await deleteClinic(clinicId);
                return response.data;
            }
        })
};
