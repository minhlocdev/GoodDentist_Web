import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { ApiResponse } from '../../api';
import { IClinic } from './IClinic';
import { IPostClinic } from './IPostClinic';

export interface IClinicService {
    GetClinics: () => UseQueryResult<IClinic[]>;
    GetClinicsPaging: (
        pageNumber: number,
        rowsPerPage: number,
        filterField?: string,
        filterValue?: string,
        sortField?: string,
        sortOrder?: string
    ) => UseQueryResult<IClinic[]>;
    GetTotalClinic: () => UseQueryResult<number>;
    PostClinic: () => UseMutationResult<ApiResponse<IPostClinic>, Error, IPostClinic>;
    PutClinic: () => UseMutationResult<ApiResponse<IPostClinic>, Error, IPostClinic>;
    DeleteClinic: () => UseMutationResult<ApiResponse<string>, Error, string>;
}
