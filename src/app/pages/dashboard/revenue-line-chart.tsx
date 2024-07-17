import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis
} from 'recharts';
import { dashBoardService } from '../../../services/queries/dashboardQuery';

export default function RevenueChart() {
    const currentYear = new Date().getFullYear();
    const { data: paymentLineChart } = dashBoardService.GetPaymentLineChart(currentYear);
    return (
        <div className="flex h-[22rem] flex-1 flex-col rounded-sm border border-gray-200 bg-white p-4">
            <strong className="font-medium text-gray-700">Báo cáo Doanh thu</strong>
            <div className=" mt-3 w-full flex-1 text-xs">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={paymentLineChart}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <Tooltip />
                        <Legend />
                        {/* <Line
                            type="monotone"
                            dataKey="Expense"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                        /> */}
                        <Line type="monotone" dataKey="income" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
