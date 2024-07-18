import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { ApiResponse } from '../../api';
import { IMedicine } from '../IMedicine';
import { IPostMedicine } from './IPostMedicine';

export interface IMedicineService {
    GetMedicines: (
        pageNumber: number,
        rowsPerPage: number,
        filterField?: string,
        filterValue?: string,
        sortField?: string,
        sortOrder?: string
    ) => UseQueryResult<IMedicine[]>;
    GetTotalMedicine: () => UseQueryResult<number>;
    PostMedicine: () => UseMutationResult<ApiResponse<IPostMedicine>, Error, IPostMedicine>;
    PutMedicine: () => UseMutationResult<ApiResponse<IPostMedicine>, Error, IPostMedicine>;
    DeleteMedicine: () => UseMutationResult<ApiResponse<number>, Error, number>;
}
