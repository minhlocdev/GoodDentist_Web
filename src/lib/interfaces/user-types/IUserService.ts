import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { ApiResponse } from '../../api';
import { ILoginUser } from './ILoginUser';
import { IPostUser } from './IPostUser';
import { IUser } from './IUser';

export interface IUserService {
    GetUsers: (
        pageNumber: number,
        rowsPerPage: number,
        filterField?: string,
        filterValue?: string,
        sortField?: string,
        sortOrder?: string
    ) => UseQueryResult<IUser[]>;
    PostLoginUser: (user: ILoginUser) => Promise<AxiosResponse>;
    GetLoginUser: (jwtToken: string) => Promise<AxiosResponse<ApiResponse<IUser>>>;
    GetTotalUser: () => UseQueryResult<number>;
    PostUser: () => UseMutationResult<ApiResponse<IPostUser>, Error, IPostUser>;
    GetUsersByClinic: (
        clinicId: string,
        pageNumber: number,
        rowsPerPage: number,
        filterField?: string,
        filterValue?: string,
        sortField?: string,
        sortOrder?: string
    ) => UseQueryResult<IUser[]>;
    GetDentistsByClinic: (
        clinicId: string,
        pageNumber: number,
        rowsPerPage: number,
        filterField?: string,
        filterValue?: string,
        sortField?: string,
        sortOrder?: string
    ) => UseQueryResult<IUser[]>;
    PutUser: () => UseMutationResult<ApiResponse<IPostUser>, Error, IPostUser>;
}
