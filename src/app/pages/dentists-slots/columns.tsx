import { CaretSortIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Button } from '../../../components/ui/button';
import { IDentistSlot } from '../../../lib/interfaces/others/IDentistSlot';

export const columns: ColumnDef<IDentistSlot>[] = [
    {
        header: ({ column }) => {
            return (
                <Button
                    className="px-1"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Giờ vào
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        accessorKey: 'timeStart',
        cell: ({ row }) => (
            <div className="capitalize">
                {format(row.getValue('timeStart'), 'dd-MM-yyyy HH:ss')}
            </div>
        )
    },
    {
        header: ({ column }) => {
            return (
                <Button
                    className="px-1"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Giờ ra
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        accessorKey: 'timeEnd',
        cell: ({ row }) => (
            <div className="capitalize">{format(row.getValue('timeEnd'), 'dd-MM-yyyy HH:ss')}</div>
        )
    },
    {
        header: ({ column }) => {
            return (
                <Button
                    className="px-1"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Phòng
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        accessorKey: 'roomId',
        cell: ({ row }) => <div className="capitalize">{row.getValue('roomId')}</div>
    }
];
