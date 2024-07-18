import {
    keepPreviousData,
    useMutation,
    UseMutationResult,
    useQuery,
    UseQueryResult
} from '@tanstack/react-query';
import { ApiResponse } from '../../lib/api';
import { IOrder } from '../../lib/interfaces/order-types/IOrder';
import { IPostOrder } from '../../lib/interfaces/order-types/IPostOrder';
import { IPutOrder } from '../../lib/interfaces/order-types/IPutOrder';
import { getOrderById, postOrder, putOrder } from '../order';

export const orderService = {
    GetOrders: (orderId: number): UseQueryResult<IOrder> => {
        return useQuery<IOrder, Error>({
            queryKey: ['order', orderId],
            queryFn: async (): Promise<IOrder> => {
                const response = await getOrderById(orderId);
                return response.data.result;
            },
            staleTime: 20000,
            placeholderData: keepPreviousData
        });
    },

    PostOrder: (): UseMutationResult<ApiResponse<IPostOrder>, Error, IPostOrder> =>
        useMutation<ApiResponse<IPostOrder>, Error, IPostOrder>({
            mutationFn: async (order: IPostOrder): Promise<ApiResponse<IPostOrder>> => {
                const response = await postOrder(order);
                return response.data;
            }
        }),

    PutOrder: (): UseMutationResult<ApiResponse<IPutOrder>, Error, IPutOrder> =>
        useMutation<ApiResponse<IPutOrder>, Error, IPutOrder>({
            mutationFn: async (order: IPutOrder): Promise<ApiResponse<IPutOrder>> => {
                const response = await putOrder(order);
                return response.data;
            }
        })
};
