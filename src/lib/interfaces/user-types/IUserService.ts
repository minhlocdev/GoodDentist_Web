import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { ILoginUser } from './ILoginUser';
import { IUser } from './IUser';
import { IPostUser } from './IPostUser';
import { ApiResponse } from '../../api';

export interface IUserService {
    GetUsers: (pageNumber: number, rowsPerPage: number, filterField?: string, filterValue?: string, sortField?: string, sortOrder?: string) => UseQueryResult<IUser[]>;
    PostLoginUser: (user: ILoginUser) => Promise<AxiosResponse>;
    GetLoginUser: () => UseQueryResult<IUser | null>;
    GetTotalUser: () => UseQueryResult<number>;
    PostUser: () => UseMutationResult<ApiResponse<IPostUser>, Error, IPostUser>
}
