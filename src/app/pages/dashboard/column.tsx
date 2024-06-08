import { ColumnDef } from '@tanstack/react-table';
import IPayment from '../../../lib/interfaces/IPayment';

export const columns: ColumnDef<IPayment>[] = [
    {
        accessorKey: 'method',
        header: 'Thủ thuật'
    },
    {
        accessorKey: 'amount',
        header: () => <div className="text-right">Doanh thu</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('amount'));
            const formatted = new Intl.NumberFormat('vn-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(amount);

            return <div className="text-right font-medium">{formatted}</div>;
        }
    }
];
