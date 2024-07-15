import { AxiosResponse } from 'axios';
import { ApiResponse } from '../lib/api';
import { IDentistSlot } from '../lib/interfaces/others/IDentistSlot';
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

export const getLoginUser = async (
    jwtToken: string
): Promise<AxiosResponse<ApiResponse<IUser>>> => {
    return await apiClient({
        method: 'get',
        url: '/api/login/users',
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
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

export const getSlotsByDate = async (
    clinicId: string,
    dentistId: string,
    selectedDate: Date
): Promise<AxiosResponse<ApiResponse<IDentistSlot[]>>> => {
    return await apiClient({
        method: 'get',
        url: `/dentist/date`,
        params: {
            clinicId,
            dentistId,
            selectedDate
        }
    });
};

export const getAllDentistSlotsByTime = async (
    clinicId: string,
    timeStart: Date,
    timeEnd: Date
): Promise<AxiosResponse<ApiResponse<IDentistSlot[]>>> => {
    return await apiClient({
        method: 'get',
        url: `/dentist/time-start/time-end`,
        params: {
            clinicId,
            timeStart,
            timeEnd
        }
    });
};

export const getAllDentistSlotsByDentist = async (
    dentistId: string,
    pageNumber: number,
    rowsPerPage: number,
    sortField?: string,
    sortOrder?: string
): Promise<AxiosResponse<ApiResponse<IDentistSlot[]>>> => {
    return await apiClient({
        method: 'get',
        url: `/dentist`,
        params: {
            dentistId,
            pageNumber,
            rowsPerPage,
            sortField,
            sortOrder
        }
    });
};
