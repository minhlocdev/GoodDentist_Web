import {
    UseMutationResult,
    UseQueryResult,
    keepPreviousData,
    useMutation,
    useQuery
} from '@tanstack/react-query';
import { ApiResponse } from '../../lib/api';
import { ILoginUser } from '../../lib/interfaces/user-types/ILoginUser';
import { IPostUser } from '../../lib/interfaces/user-types/IPostUser';
import { IUser } from '../../lib/interfaces/user-types/IUser';
import { IUserService } from '../../lib/interfaces/user-types/IUserService';
import {
    getLoginUser,
    getTotalUser,
    getUsers,
    getUsersByClinic,
    postLogin,
    postUser,
    putUser
} from '../users';

export const userService: IUserService = {
    GetUsers: (
        pageNumber,
        rowsPerPage,
        filterField,
        filterValue,
        sortField,
        sortOrder
    ): UseQueryResult<IUser[]> =>
        useQuery<IUser[], Error>({
            queryKey: [
                'users',
                pageNumber,
                rowsPerPage,
                filterField,
                filterValue,
                sortField,
                sortOrder
            ],
            queryFn: async (): Promise<IUser[]> => {
                return await getUsers(
                    pageNumber,
                    rowsPerPage,
                    filterField,
                    filterValue,
                    sortField,
                    sortOrder
                ).then((res) => res.data.result);
            },
            staleTime: 20000,
            placeholderData: keepPreviousData
        }),

    GetTotalUser: (): UseQueryResult<number> =>
        useQuery({
            queryKey: ['total-users'],
            queryFn: async (): Promise<number> => {
                return await getTotalUser().then((res) => res.data.result);
            }
        }),

    PostLoginUser: (user: ILoginUser) => {
        return postLogin(user);
    },

    GetLoginUser: (): UseQueryResult<IUser | null> =>
        useQuery<IUser | null, Error>({
            queryKey: ['loginUser'],
            queryFn: async (): Promise<IUser | null> => {
                return await getLoginUser().then((res) => res.data.result);
            },
            staleTime: 20000
        }),

    PostUser: (): UseMutationResult<ApiResponse<IPostUser>, Error, IPostUser> =>
        useMutation<ApiResponse<IPostUser>, Error, IPostUser>({
            mutationFn: async (user: IPostUser): Promise<ApiResponse<IPostUser>> => {
                const response = await postUser(user);
                return response.data;
            }
        }),
    GetUsersByClinic: (
        clinicId,
        pageNumber,
        rowsPerPage,
        filterField,
        filterValue,
        sortField,
        sortOrder
    ): UseQueryResult<IUser[]> =>
        useQuery<IUser[], Error>({
            queryKey: [
                'users-by-clinic',
                clinicId,
                pageNumber,
                rowsPerPage,
                filterField,
                filterValue,
                sortField,
                sortOrder
            ],
            queryFn: async (): Promise<IUser[]> => {
                return await getUsersByClinic(
                    clinicId,
                    pageNumber,
                    rowsPerPage,
                    filterField,
                    filterValue,
                    sortField,
                    sortOrder
                ).then((res) => res.data.result);
            },
            staleTime: 20000,
            placeholderData: keepPreviousData
        }),
        
    PutUser: (): UseMutationResult<ApiResponse<IPostUser>, Error, IPostUser> =>
        useMutation<ApiResponse<IPostUser>, Error, IPostUser>({
            mutationFn: async (user: IPostUser): Promise<ApiResponse<IPostUser>> => {
                const response = await putUser(user);
                return response.data;
            }
        })
};
