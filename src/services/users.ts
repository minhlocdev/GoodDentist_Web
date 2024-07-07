import { AxiosResponse } from 'axios';
import { ApiResponse } from '../lib/api';
import { ILoginUser } from '../lib/interfaces/user-types/ILoginUser';
import { IUser } from '../lib/interfaces/user-types/IUser';
import apiClient from './api-client';

export const getUsers = async (
    pageNumber: number,
    rowsPerPage: number,
    filterField?: string,
    filterValue?: string,
    sortField?: string,
    sortOrder?: string
): Promise<AxiosResponse<ApiResponse<IUser[]>>> => {
    return await apiClient({
        method: 'get',
        url: `/api/users/all-users`,
        params: {
            pageNumber,
            rowsPerPage,
            filterField,
            filterValue,
            sortField,
            sortOrder
        }
    });
};

export const getTotalUser = async (): Promise<AxiosResponse<ApiResponse<number>>> => {
    return await apiClient({
        method: 'get',
        url: '/api/General?type=User'
    });
};

export const postLogin = async (user: ILoginUser): Promise<AxiosResponse<ApiResponse<string>>> => {
    return await apiClient({
        method: 'post',
        data: user,
        url: '/api/login'
    });
};

export const getLoginUser = async (): Promise<AxiosResponse<ApiResponse<IUser | null>>> => {
    return await apiClient({
        method: 'get',
        url: '/api/login'
    });
};

export const postUser = async (user: IUser): Promise<AxiosResponse<ApiResponse<string>>> => {
    return await apiClient({
        method: 'post',
        data: user,
        url: '/api/users/new-user'
    });
};

export const putUserAvatar = async (
    userId: string,
    file: File
): Promise<AxiosResponse<ApiResponse<string>>> => {
    return await apiClient({
        method: 'put',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        params: userId,
        data: file,
        url: '/api/users/new-user'
    });
};
