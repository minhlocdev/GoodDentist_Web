import { ContentLayout } from '../../../components/admin-panel/content-layout';
import { DatePickerWithRange } from '../../../components/ui/date-range-picker';
import IPayment, { payments } from '../../../lib/interfaces/IPayment';
import AppointmentPieChart from './appointment-pie-chart';
import { columns } from './column';
import { DataTable } from './data-table';
import RevenueChart from './revenue-line-chart';
import StatisticalCard from './statistical-card';

function getData(): IPayment[] {
    return payments;
}

export default function DashboardPage() {
    const data = getData();

    return (
        <ContentLayout title="Trang chủ">
            <div className="flex flex-row mb-4 h-12">
                <DatePickerWithRange />
            </div>
            <div className="mb-3 grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                <StatisticalCard
                    title="Tổng doanh thu"
                    statistic={0}
                    unit="VND"
                    desc="Tổng tiền dự kiến phải thu của khách theo tiến trình điều trị"
                />
                <StatisticalCard
                    title="Tổng số khách hàng mới"
                    statistic={0}
                    unit="khách hàng"
                    desc="Khách hàng điều trị lần đầu trong khoảng thời gian lọc"
                />
            </div>
            <div className="my-3">
                <RevenueChart />
            </div>
            <div className="my-3 grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                <AppointmentPieChart />
                <DataTable columns={columns} data={data} />
            </div>
        </ContentLayout>
    );
}
