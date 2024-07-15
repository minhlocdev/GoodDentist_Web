import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { ApiResponse } from '../../api';
import { IExaminationProfile } from '../others/IExaminationProfile';
import { IExamination } from './IExamination';
import { IPostExamination } from './IPostExamination';

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
    GetExaminationProfileByCustomer: (customerId: string) => UseQueryResult<IExaminationProfile[]>;
    PostExamination: () => UseMutationResult<
        ApiResponse<IPostExamination>,
        Error,
        IPostExamination
    >;
    PutExamination: () => UseMutationResult<ApiResponse<string>, Error, IPostExamination>;
}
