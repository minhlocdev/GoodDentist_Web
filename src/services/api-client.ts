import axios, { AxiosError, AxiosResponse } from 'axios';
import { BASE_URL } from '../lib/api';
import { ACCESS_TOKEN_KEY } from '../lib/token';

const apiClient = axios.create({
    baseURL: BASE_URL
});

const logOnDev = (message: string, log: string) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(message, log);
    }
};

apiClient.interceptors.request.use((request) => {
    const jwtToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);
    const { method, url } = request;
    if (jwtToken) {
        request.headers.Authorization = `Bearer ${jwtToken}`;
    }
    logOnDev(`🚀 [${method?.toUpperCase()}] ${url} | Request`, JSON.stringify(request, null, 2));

    return request;
});

apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        const { method, url } = response.config;
        const { status } = response;
        logOnDev(
            `✨ [${method?.toUpperCase()}] ${url} | Response ${status}`,
            JSON.stringify(response, null, 2)
        );
        return response;
    },
    (error: AxiosError) => {
        const { message } = error;
        const { status, data } = error.response ?? {};
        const { method, url } = error.config ?? {};

        if (error.code === 'ECONNABORTED') {
            // Timeout error handling
        } else {
            logOnDev(
                `🚨 [${method?.toUpperCase()}] ${url} | Error ${status} ${JSON.stringify(data, null, 2)} | ${message}`,
                JSON.stringify(error, null, 2)
            );
        }

        return Promise.reject(error);
    }
);

export default apiClient;
