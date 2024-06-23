import { CaretSortIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Button } from '../../../components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '../../../components/ui/tooltip';
import { IUser } from '../../../lib/interfaces/user-types/IUser';
import { NewStaffModal } from './new-staff-modal';

export const columns: ColumnDef<IUser>[] = [
    {
        accessorKey: 'user_name',
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
        cell: ({ row }) => <div className="lowercase">{row.getValue('user_name')}</div>
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
        header: 'Vai trò',
        accessorFn: (user) => user.role?.name
    },
    {
        header: 'Giới tính',
        accessorKey: 'gender',
        cell: ({ row }) => <div className="capitalize">{row.getValue('gender')}</div>
    },
    {
        header: 'Số điện thoại',
        accessorKey: 'phone_number',
        cell: ({ row }) => <div className="capitalize">{row.getValue('phone_number')}</div>
    },
    {
        header: 'Địa chỉ',
        accessorKey: 'address',
        cell: ({ row }) => <div className="capitalize">{row.getValue('address')}</div>
    },
    {
        accessorKey: 'status',
        header: 'Tình trạng',
        cell: ({ row }) => <div className="capitalize">{row.getValue('status')}</div>
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const user = row.original;
            return (
                <TooltipProvider>
                    <Tooltip delayDuration={100}>
                        <TooltipTrigger className="w-full">
                            <NewStaffModal staff={user} />
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                            <p>Chỉnh sửa</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        }
    }
];
