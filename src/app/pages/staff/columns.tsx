import { CaretSortIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Button } from '../../../components/ui/button';
import { Checkbox } from '../../../components/ui/checkbox';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '../../../components/ui/tooltip';
import { IClinic } from '../../../lib/interfaces/clinics-types/IClinic';
import { IUser } from '../../../lib/interfaces/user-types/IUser';
import { NewStaffModal } from './new-staff-modal';

export const columns: ColumnDef<IUser>[] = [
    {
        accessorKey: 'status',
        header: () => <div className="w-full text-center">Đang làm việc</div>,
        cell: ({ row }) => (
            <div className="w-full text-center">
                <Checkbox
                    checked={row.getValue('status')}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        )
    },
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
        accessorKey: 'userName',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Tài khoản
                    <CaretSortIcon className="h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue('userName')}</div>
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
        accessorKey: 'roleId',
        cell: ({ row }) => (
            <div>
                {row.getValue('roleId') === 1
                    ? 'Admin'
                    : row.getValue('roleId') === 2
                      ? 'Bác sỹ'
                      : 'Nhân viên'}
            </div>
        )
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
        cell: ({ row }) => <div className="capitalize">{row.getValue('address')}</div>
    },
    {
        header: 'Cơ sở',
        accessorKey: 'clinics',
        cell: ({ row }) => {
            const clinics = row.getValue<IClinic[]>('clinics');
            return (
                <div className="capitalize">
                    {clinics && clinics.length > 0 ? clinics[0].clinicName : 'N/A'}
                </div>
            );
        }
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
