import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
    {
        name: 'Jan',
        Expense: 4000,
        Income: 2400
    },
    {
        name: 'Feb',
        Expense: 3000,
        Income: 1398
    },
    {
        name: 'Mar',
        Expense: 2000,
        Income: 9800
    },
    {
        name: 'Apr',
        Expense: 2780,
        Income: 3908
    },
    {
        name: 'May',
        Expense: 1890,
        Income: 4800
    },
    {
        name: 'Jun',
        Expense: 2390,
        Income: 3800
    },
    {
        name: 'July',
        Expense: 3490,
        Income: 4300
    },
    {
        name: 'Aug',
        Expense: 2000,
        Income: 9800
    },
    {
        name: 'Sep',
        Expense: 2780,
        Income: 3908
    },
    {
        name: 'Oct',
        Expense: 1890,
        Income: 4800
    },
    {
        name: 'Nov',
        Expense: 2390,
        Income: 3800
    },
    {
        name: 'Dec',
        Expense: 3490,
        Income: 4300
    }
];

export default function RevenueChart() {
    return (
        <div className="flex h-[22rem] flex-1 flex-col rounded-sm border border-gray-200 bg-white p-4">
            <strong className="font-medium text-gray-700">Báo cáo Doanh thu / Chi phí</strong>
            <div className=" mt-3 w-full flex-1 text-xs">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />

                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="Expense"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="Income"
                            stroke="#82ca9d"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
