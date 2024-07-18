import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { ApiResponse } from '../../api';
import { IPostService } from './IPostService';
import { IService } from './IService';

export interface IServiceService {
    GetServices: (
        pageNumber: number,
        rowsPerPage: number,
        filterField?: string,
        filterValue?: string,
        sortField?: string,
        sortOrder?: string
    ) => UseQueryResult<IService[]>;
    GetTotalService: () => UseQueryResult<number>;
    PostService: () => UseMutationResult<ApiResponse<IPostService>, Error, IPostService>;
    PutService: () => UseMutationResult<ApiResponse<IPostService>, Error, IPostService>;
    DeleteService: () => UseMutationResult<ApiResponse<number>, Error, number>;
    GetAllServices: () => UseQueryResult<IService[]>;
    GetAllServicesByClinicId: (clinicId: string) => UseQueryResult<IService[]>;
}
