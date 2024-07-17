import { UseQueryResult, keepPreviousData, useQuery } from '@tanstack/react-query';
import { IDashboardService } from '../../lib/interfaces/dashboard-types/IDashboardService';
import IPaymentLineChart from '../../lib/interfaces/dashboard-types/IPaymentLineChart';
import IServiceIncome from '../../lib/interfaces/dashboard-types/IServiceIncome';
import {
    getAmountNewCustomersInDateRange,
    getPaymentLineChart,
    getServiceIncomeInDateRange,
    getTotalIncomeInDateRange
} from '../dashboard';

export const dashBoardService: IDashboardService = {
    GetPaymentLineChart: (year: number): UseQueryResult<IPaymentLineChart[]> => {
        return useQuery<IPaymentLineChart[], Error>({
            queryKey: ['paymentLineChart'],
            queryFn: async (): Promise<IPaymentLineChart[]> => {
                const response = await getPaymentLineChart(year);
                return response.data.result;
            },
            staleTime: 20000,
            placeholderData: keepPreviousData
        });
    },

    GetTotalIncomeInDateRange: (startDate?: Date, endDate?: Date): UseQueryResult<number> => {
        return useQuery<number, Error>({
            queryKey: ['totalIncome'],
            queryFn: async (): Promise<number> => {
                const response = await getTotalIncomeInDateRange(startDate, endDate);
                return response.data.result;
            },
            staleTime: 20000,
            placeholderData: keepPreviousData
        });
    },

    GetServiceIncomeInDateRange: (
        startDate?: Date,
        endDate?: Date
    ): UseQueryResult<IServiceIncome[]> => {
        return useQuery<IServiceIncome[], Error>({
            queryKey: ['serviceIncome'],
            queryFn: async (): Promise<IServiceIncome[]> => {
                const response = await getServiceIncomeInDateRange(startDate, endDate);
                return response.data.result;
            },
            staleTime: 20000,
            placeholderData: keepPreviousData
        });
    },

    GetAmountNewCustomersInDateRange: (
        startDate?: Date,
        endDate?: Date
    ): UseQueryResult<number> => {
        return useQuery<number, Error>({
            queryKey: ['amountNewCustomers'],
            queryFn: async (): Promise<number> => {
                const response = await getAmountNewCustomersInDateRange(startDate, endDate);
                return response.data.result;
            },
            staleTime: 20000,
            placeholderData: keepPreviousData
        });
    }
};
