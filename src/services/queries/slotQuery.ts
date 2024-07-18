import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { ApiResponse } from '../../lib/api';
import { IPostDentistSlot } from '../../lib/interfaces/others/IPostDentistSlot';
import { postDentistSlot } from '../slot';

export const slotService = {
    PostDentistSlot: (): UseMutationResult<
        ApiResponse<IPostDentistSlot[]>,
        Error,
        IPostDentistSlot[]
    > =>
        useMutation<ApiResponse<IPostDentistSlot[]>, Error, IPostDentistSlot[]>({
            mutationFn: async (
                slots: IPostDentistSlot[]
            ): Promise<ApiResponse<IPostDentistSlot[]>> => {
                const response = await postDentistSlot(slots);
                return response.data;
            }
        })
};
