import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { ApiResponse } from '../../lib/api';
import { IClinicServiceService } from '../../lib/interfaces/clinic-service-types/IClinicServiceService';
import { IPostClinicService } from '../../lib/interfaces/clinic-service-types/IPostClinicService';
import { deleteClinicService, postClinicService, putClinicService } from '../clinic-service';

export const clinicServiceService: IClinicServiceService = {
    PostClinicService: (): UseMutationResult<
        ApiResponse<IPostClinicService>,
        Error,
        IPostClinicService
    > =>
        useMutation<ApiResponse<IPostClinicService>, Error, IPostClinicService>({
            mutationFn: async (
                clinicService: IPostClinicService
            ): Promise<ApiResponse<IPostClinicService>> => {
                const response = await postClinicService(clinicService);
                return response.data;
            }
        }),

    PutClinicService: (): UseMutationResult<
        ApiResponse<IPostClinicService>,
        Error,
        IPostClinicService
    > =>
        useMutation<ApiResponse<IPostClinicService>, Error, IPostClinicService>({
            mutationFn: async (
                clinicService: IPostClinicService
            ): Promise<ApiResponse<IPostClinicService>> => {
                const response = await putClinicService(clinicService);
                return response.data;
            }
        }),

    DeleteClinicService: (): UseMutationResult<ApiResponse<number>, Error, number> =>
        useMutation<ApiResponse<number>, Error, number>({
            mutationFn: async (clinicServiceId: number) => {
                const response = await deleteClinicService(clinicServiceId);
                return response.data;
            }
        })
};
