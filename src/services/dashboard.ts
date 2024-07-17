import { AxiosResponse } from 'axios';
import { ApiResponse } from '../lib/api';
import IPaymentLineChart from '../lib/interfaces/dashboard-types/IPaymentLineChart';
import IServiceIncome from '../lib/interfaces/dashboard-types/IServiceIncome';
import apiClient from './api-client';

export const getPaymentLineChart = async (
    year: number
): Promise<AxiosResponse<ApiResponse<IPaymentLineChart[]>>> => {
    return await apiClient({
        method: 'get',
        url: `/api/Payment/year`,
        params: {
            year
        }
    });
};

export const getTotalIncomeInDateRange = async (
    startDate?: Date,
    endDate?: Date
): Promise<AxiosResponse<ApiResponse<number>>> => {
    return await apiClient({
        method: 'get',
        url: `/api/Payment/date-start/date-end`,
        params: {
            DateStart: startDate,
            DateEnd: endDate
        }
    });
};

export const getServiceIncomeInDateRange = async (
    startDate?: Date,
    endDate?: Date
): Promise<AxiosResponse<ApiResponse<IServiceIncome[]>>> => {
    return await apiClient({
        method: 'get',
        url: `/api/Payment/date-start/date-end/service`,
        params: {
            DateStart: startDate,
            DateEnd: endDate
        }
    });
};

export const getAmountNewCustomersInDateRange = async (
    startDate?: Date,
    endDate?: Date
): Promise<AxiosResponse<ApiResponse<number>>> => {
    return await apiClient({
        method: 'get',
        url: `/customers/new-customers`,
        params: {
            DateStart: startDate,
            DateEnd: endDate
        }
    });
};
