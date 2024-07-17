import { UseMutationResult } from '@tanstack/react-query';
import { ApiResponse } from '../../api';
import { IPostClinicService } from './IPostClinicService';

export interface IClinicServiceService {
    PostClinicService: () => UseMutationResult<
        ApiResponse<IPostClinicService>,
        Error,
        IPostClinicService
    >;
    PutClinicService: () => UseMutationResult<
        ApiResponse<IPostClinicService>,
        Error,
        IPostClinicService
    >;
    DeleteClinicService: () => UseMutationResult<ApiResponse<number>, Error, number>;
}
