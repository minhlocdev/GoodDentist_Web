import { AxiosResponse } from 'axios';
import { ApiResponse } from '../lib/api';
import { IOrder } from '../lib/interfaces/order-types/IOrder';
import { IPostOrder } from '../lib/interfaces/order-types/IPostOrder';
import { IPutOrder } from '../lib/interfaces/order-types/IPutOrder';
import apiClient from './api-client';

export const getOrderById = async (
    orderId: number
): Promise<AxiosResponse<ApiResponse<IOrder>>> => {
    return await apiClient({
        method: 'get',
        url: `/order/detail`,
        params: {
            orderId
        }
    });
};

export const postOrder = async (
    order: IPostOrder
): Promise<AxiosResponse<ApiResponse<IPostOrder>>> => {
    return await apiClient({
        method: 'post',
        url: '/orders/new-order',
        data: order
    });
};

export const putOrder = async (
    order: IPutOrder
): Promise<AxiosResponse<ApiResponse<IPutOrder>>> => {
    return await apiClient({
        method: 'put',
        url: '/orders/update-order',
        data: order
    });
};
