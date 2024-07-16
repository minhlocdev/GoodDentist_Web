// export const BASE_URL = 'https://localhost:7078/';
export const BASE_URL = 'http://localhost:5194';

export interface ApiResponse<T> {
    message: string;
    statusCode: number;
    isSuccess: boolean;
    result: T;
}
