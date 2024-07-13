import { keepPreviousData, useQuery, UseQueryResult } from '@tanstack/react-query';
import { IExamination } from '../../lib/interfaces/examination-types/IExamination';
import { IExaminationService } from '../../lib/interfaces/examination-types/IExaminationService';
import { getExaminationsByClinic } from '../examination';

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
            enabled: clinicId!==""
        })
};
