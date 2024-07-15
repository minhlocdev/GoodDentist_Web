import {
    keepPreviousData,
    useMutation,
    UseMutationResult,
    useQueries,
    useQuery,
    UseQueryResult
} from '@tanstack/react-query';
import { ApiResponse } from '../../lib/api';
import { IExamination } from '../../lib/interfaces/examination-types/IExamination';
import { IExaminationService } from '../../lib/interfaces/examination-types/IExaminationService';
import { IPostExamination } from '../../lib/interfaces/examination-types/IPostExamination';
import { getExamination, getExaminationsByClinic, postExamination } from '../examination';
import { getExaminationProfileByCustomer } from '../examination-profile';

export const examinationService: IExaminationService = {
    GetExaminationByClinic: (
        clinicId,
        pageNumber,
        rowsPerPage,
        filterField,
        filterValue,
        sortField,
        sortOrder
    ): UseQueryResult<IExamination[]> =>
        useQuery<IExamination[], Error>({
            queryKey: [
                'examinations',
                clinicId,
                pageNumber,
                rowsPerPage,
                filterField,
                filterValue,
                sortField,
                sortOrder
            ],
            queryFn: async (): Promise<IExamination[]> => {
                return await getExaminationsByClinic(
                    clinicId,
                    pageNumber,
                    rowsPerPage,
                    filterField,
                    filterValue,
                    sortField,
                    sortOrder
                ).then((res) => res.data.result);
            },
            staleTime: 20000,
            placeholderData: keepPreviousData,
            enabled: clinicId !== ''
        }),

    GetExamination: (examIds): UseQueryResult<IExamination>[] =>
        useQueries({
            queries: examIds.map((examId) => ({
                queryKey: ['examination', examId],
                queryFn: async () => {
                    const response = await getExamination(examId);
                    return response.data.result;
                },
                staleTime: Infinity
            }))
        }),

    GetExaminationProfileByCustomer: (customerId) =>
        useQuery({
            queryKey: ['examination-profile', customerId],
            queryFn: async () => {
                const response = await getExaminationProfileByCustomer(customerId);
                return response.data.result;
            },
            enabled: !!customerId,
            staleTime: Infinity
        }),

    PostExamination: (): UseMutationResult<ApiResponse<IPostExamination>, Error, IPostExamination> =>
        useMutation({
            mutationFn: async (
                examination: IPostExamination
            ): Promise<ApiResponse<IPostExamination>> => {
                const response = await postExamination(examination);
                return response.data;
            }
        })
};
