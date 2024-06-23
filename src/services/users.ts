import { AxiosResponse } from 'axios';
import { IUser } from '../lib/interfaces/user-types/IUser';
import apiClient from './api-client'; // Adjust the import according to your project structure

export const getUsers = async (): Promise<AxiosResponse<IUser[]>> => {
    return await apiClient({
        method: 'get',
        url: `/users`
    });
};
