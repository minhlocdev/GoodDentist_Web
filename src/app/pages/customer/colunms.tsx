import { CaretSortIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Trash } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '../../../components/ui/tooltip';
import { ICustomer } from '../../../lib/interfaces/customer-types/ICustomer';

export const columns: ColumnDef<ICustomer>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Họ tên
                    <CaretSortIcon className="h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue('name')}</div>
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Email
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>
    },
    {
        header: 'Ngày sinh',
        accessorFn: (user) => (user.dob ? format(user.dob, 'dd/MM/y') : '')
    },
    {
        header: 'Giới tính',
        accessorKey: 'gender',
        cell: ({ row }) => <div className="capitalize">{row.getValue('gender')}</div>
    },
    {
        header: 'Số điện thoại',
        accessorKey: 'phoneNumber',
        cell: ({ row }) => <div className="capitalize">{row.getValue('phoneNumber')}</div>
    },
    {
        header: 'Địa chỉ',
        accessorKey: 'address',
        cell: ({ row }) => (
            <div className="max-w-[200px] truncate capitalize" title={row.getValue('address')}>
                {row.getValue('address')}
            </div>
        )
    },
    {
        header: 'Thao tác',
        id: 'actions',
        enableHiding: false,
        cell: () => {
            // const user: IUser = row.original;
            return (
                <div className="flex items-center gap-3">
                    <TooltipProvider>
                        <Tooltip delayDuration={100}>
                            <TooltipTrigger className="w-full">
                                <div className="flex flex-row items-center gap-x-4"></div>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                <p>Chỉnh sửa</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip delayDuration={100}>
                            <TooltipTrigger className="w-full">
                                <div className="flex flex-row items-center gap-x-4">
                                    <Trash className="h-5 w-5 text-destructive" />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="!bg-destructive">
                                <p>Xóa</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            );
        }
    }
];
