import { AxiosResponse } from 'axios';
import { ApiResponse } from '../lib/api';
import { ILoginUser } from '../lib/interfaces/user-types/ILoginUser';
import { IPostUser } from '../lib/interfaces/user-types/IPostUser';
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

export const postLogin = async (
    user: ILoginUser
): Promise<AxiosResponse<ApiResponse<IPostUser>>> => {
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

export const postUser = async (user: IPostUser): Promise<AxiosResponse<ApiResponse<IPostUser>>> => {
    return await apiClient({
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
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

export const getUsersByClinic = async (
    clinicId: string,
    pageNumber: number,
    rowsPerPage: number,
    filterField?: string,
    filterValue?: string,
    sortField?: string,
    sortOrder?: string
): Promise<AxiosResponse<ApiResponse<IUser[]>>> => {
    return await apiClient({
        method: 'get',
        url: `/api/users/all-users-by-clinic`,
        params: {
            clinicId,
            pageNumber,
            rowsPerPage,
            filterField,
            filterValue,
            sortField,
            sortOrder
        }
    });
};

export const getDentistsByClinic = async (
    clinicId: string,
    pageNumber: number,
    rowsPerPage: number,
    filterField?: string,
    filterValue?: string,
    sortField?: string,
    sortOrder?: string
): Promise<AxiosResponse<ApiResponse<IUser[]>>> => {
    return await apiClient({
        method: 'get',
        url: `/api/users/all-dentists-by-clinic`,
        params: {
            clinicId,
            pageNumber,
            rowsPerPage,
            filterField,
            filterValue,
            sortField,
            sortOrder
        }
    });
};

export const putUser = async (user: IPostUser): Promise<AxiosResponse<ApiResponse<IPostUser>>> => {
    return await apiClient({
        method: 'put',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        url: '/api/users/user',
        data: user
    });
};
