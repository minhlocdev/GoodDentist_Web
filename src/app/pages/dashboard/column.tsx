import { ColumnDef } from '@tanstack/react-table';
import IServiceIncome from '../../../lib/interfaces/dashboard-types/IServiceIncome';

export const columns: ColumnDef<IServiceIncome>[] = [
    {
        accessorKey: 'serviceName',
        header: 'Dịch vụ'
    },
    {
        accessorKey: 'total',
        header: () => <div className="text-right">Doanh thu</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('total'));
            const formatted = new Intl.NumberFormat('vn-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(amount);

            return <div className="text-right font-medium">{formatted}</div>;
        }
    }
];
