import { UseQueryResult } from '@tanstack/react-query';
import IPaymentLineChart from './IPaymentLineChart';
import IServiceIncome from './IServiceIncome';

export interface IDashboardService {
    GetPaymentLineChart: (year: number) => UseQueryResult<IPaymentLineChart[]>;
    GetTotalIncomeInDateRange: (startDate?: Date, endDate?: Date) => UseQueryResult<number>;
    GetServiceIncomeInDateRange: (
        startDate?: Date,
        endDate?: Date
    ) => UseQueryResult<IServiceIncome[]>;
    GetAmountNewCustomersInDateRange: (startDate?: Date, endDate?: Date) => UseQueryResult<number>;
}
