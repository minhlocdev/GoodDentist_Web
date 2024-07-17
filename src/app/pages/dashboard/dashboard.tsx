import { endOfMonth, startOfMonth } from 'date-fns';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { DatePickerWithRange } from '../../../components/ui/date-range-picker';
import { ContentLayout } from '../../../components/ui/local/layouts/content-layout';
import { dashBoardService } from '../../../services/queries/dashboardQuery';
import AppointmentPieChart from './appointment-pie-chart';
import { columns } from './column';
import { DataTable } from './data-table';
import RevenueChart from './revenue-line-chart';
import StatisticalCard from './statistical-card';

export default function DashboardPage() {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: startOfMonth(new Date()),
        to: endOfMonth(new Date())
    });

    const amountNewCustomerQuery = dashBoardService.GetAmountNewCustomersInDateRange(
        dateRange?.from,
        dateRange?.to
    );
    const { data: totalNewCustomer } = amountNewCustomerQuery;

    const totalIncomeQuery = dashBoardService.GetTotalIncomeInDateRange(
        dateRange?.from,
        dateRange?.to
    );
    const { data: totalIncome } = totalIncomeQuery;

    const serviceIncomeQuery = dashBoardService.GetServiceIncomeInDateRange(
        dateRange?.from,
        dateRange?.to
    );
    const { data: serviceIncome } = serviceIncomeQuery;

    useEffect(() => {
        amountNewCustomerQuery.refetch();
        totalIncomeQuery.refetch();
        serviceIncomeQuery.refetch();
    }, [dateRange]);

    return (
        <ContentLayout title="Trang chủ">
            <div className="mb-4 flex h-12 flex-row">
                <DatePickerWithRange onDateChange={setDateRange} />
            </div>
            <div className="mb-3 grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                <StatisticalCard
                    title="Tổng doanh thu"
                    statistic={totalIncome ?? 0}
                    unit="VND"
                    desc="Tổng tiền dự kiến phải thu của khách theo tiến trình điều trị"
                />
                <StatisticalCard
                    title="Tổng số khách hàng mới"
                    statistic={totalNewCustomer ?? 0}
                    unit="khách hàng"
                    desc="Khách hàng điều trị lần đầu trong khoảng thời gian lọc"
                />
            </div>
            <div className="my-3">
                <RevenueChart />
            </div>
            <div className="my-3 grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                <AppointmentPieChart />
                <DataTable columns={columns} data={serviceIncome ?? []} />
            </div>
        </ContentLayout>
    );
}
