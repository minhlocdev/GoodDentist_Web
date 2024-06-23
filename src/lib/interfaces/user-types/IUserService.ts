import { UseQueryResult } from '@tanstack/react-query';
import { IUser } from './IUser';

export interface IUserService {
    GetUsers: () => UseQueryResult<IUser[]>;
}
