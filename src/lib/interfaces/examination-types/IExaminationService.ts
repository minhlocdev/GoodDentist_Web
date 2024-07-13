import { UseQueryResult } from '@tanstack/react-query';
import { IExamination } from './IExamination';

export interface IExaminationService {
    GetExaminationByClinic: (
        clinicId: string,
        pageNumber: number,
        rowsPerPage: number,
        filterField?: string,
        filterValue?: string,
        sortField?: string,
        sortOrder?: string
    ) => UseQueryResult<IExamination[]>;
}
