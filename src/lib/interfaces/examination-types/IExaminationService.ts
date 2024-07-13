import { UseQueryResult } from '@tanstack/react-query';
import { IExamination } from './IExamination';
import { IExaminationProfile } from '../others/IExaminationProfile';

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

    GetExamination: (examIds: number[]) => UseQueryResult<IExamination>[];
    GetExaminationProfileByCustomer: (customerId: string) => UseQueryResult<IExaminationProfile[]>
}
