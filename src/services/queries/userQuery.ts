/* eslint-disable @typescript-eslint/no-unsafe-call */
import { UseQueryResult, keepPreviousData, useQuery } from '@tanstack/react-query';
import { IUser } from '../../lib/interfaces/user-types/IUser';
import { IUserService } from '../../lib/interfaces/user-types/IUserService';
import { getUsers } from '../users';

export const userService: IUserService = {
    GetUsers: (): UseQueryResult<IUser[]> =>
        useQuery<IUser[], Error>({
            queryKey: ['Users'],
            queryFn: async (): Promise<IUser[]> => {
                return await getUsers().then((res) => res.data);
            },
            staleTime: 20000,
            placeholderData: keepPreviousData,
        })
};
