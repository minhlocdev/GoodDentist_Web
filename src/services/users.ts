import { AxiosResponse } from 'axios';
import { ILoginUser } from '../lib/interfaces/user-types/ILoginUser';
import { IUser } from '../lib/interfaces/user-types/IUser';
import apiClient from './api-client';

export const getUsers = async (): Promise<AxiosResponse<IUser[]>> => {
    return await apiClient({
        method: 'get',
        url: `/users`
    });
};

export const postLogin = async (user: ILoginUser): Promise<AxiosResponse> => {
    return await apiClient({
        method: 'post',
        data: user,
        url: '/api/login'
    });
};
