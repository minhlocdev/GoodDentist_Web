import { UseQueryResult, keepPreviousData, useQuery } from '@tanstack/react-query';
import { ILoginUser } from '../../lib/interfaces/user-types/ILoginUser';
import { IUser } from '../../lib/interfaces/user-types/IUser';
import { IUserService } from '../../lib/interfaces/user-types/IUserService';
import { getLoginUser, getTotalUser, getUsers, postLogin } from '../users';

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
        })
};
